import { useState, useEffect } from 'react';
import type { RecordItem, Category } from './RecordList';

export type RecordType = 'income' | 'expense';

export interface RecordFormProps {
  onAdd: (
    title: string,
    amount: number,
    type: RecordType,
    category: Category
  ) => void;
  editingItem?: RecordItem | null;
  onUpdate?: (updated: RecordItem) => void;
}

export default function RecordForm({
  onAdd,
  editingItem,
  onUpdate,
}: RecordFormProps) {
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<RecordType>('expense');
  const [category, setCategory] = useState<Category>('其他');

  const handleAddOrUpdate = () => {
    if (!title || !amount) return;

    if (editingItem && onUpdate) {
      onUpdate({
        ...editingItem,
        title,
        amount: Number(amount),
        type,
        category,
      });
    } else {
      onAdd(title, Number(amount), type, category);
    }
    setTitle('');
    setAmount('');
    setType('expense');
  };

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setAmount(editingItem.amount.toString());
      setType(editingItem.type);
    }
  }, [editingItem]);

  return (
    <div className='flex flex-col gap-2'>
      <input
        className='border p-2 rounded'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='項目'
      />
      <select
        className='border p-2 rounded'
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
      >
        <option value='食物'>食物</option>
        <option value='交通'>交通</option>
        <option value='娛樂'>娛樂</option>
        <option value='其他'>其他</option>
      </select>
      <input
        className='border p-2 rounded'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder='金額'
      />
      <div className='flex gap-4'>
        <label>
          <input
            type='radio'
            value='expense'
            checked={type === 'expense'}
            onChange={() => setType('expense')}
          />{' '}
          支出
        </label>
        <label>
          <input
            type='radio'
            value='income'
            checked={type === 'income'}
            onChange={() => setType('income')}
          />{' '}
          收入
        </label>
      </div>
      <button
        className='bg-green-500 text-white p-2 rounded mt-2'
        onClick={handleAddOrUpdate}
      >
        {editingItem ? '更新' : '新增'}
      </button>
    </div>
  );
}
