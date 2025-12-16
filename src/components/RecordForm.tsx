import { useState, useEffect } from 'react';
import type { RecordItem, Category } from './RecordList';

export type RecordType = 'income' | 'expense';

export interface RecordFormProps {
  onAdd: (
    title: string,
    amount: number,
    type: RecordType,
    category: Category,
    date: string
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
  const [date, setDate] = useState(
    () => new Date().toISOString().split('T')[0]
  ); // 預設今天

  const handleAddOrUpdate = () => {
    if (!title || !amount) return;

    if (editingItem && onUpdate) {
      onUpdate({
        ...editingItem,
        title,
        amount: Number(amount),
        type,
        category,
        date,
      });
    } else {
      onAdd(title, Number(amount), type, category, date);
    }
    setTitle('');
    setAmount('');
    setType('expense');
    setDate(new Date().toISOString().split('T')[0]);
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
      <div className='flex gap-2 mb-4'>
        <button
          type='button'
          className={`flex-1 py-2 rounded-lg text-white transition
      ${type === 'income' ? 'bg-income' : 'bg-gray-300 text-gray-700'}`}
          onClick={() => setType('income')}
        >
          收入
        </button>

        <button
          type='button'
          className={`flex-1 py-2 rounded-lg text-white transition
      ${type === 'expense' ? 'bg-expense' : 'bg-gray-300 text-gray-700'}`}
          onClick={() => setType('expense')}
        >
          支出
        </button>
      </div>
      <input
        className='text-black border-black w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        className='text-black border-black w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='項目'
      />
      <select
        className='text-black border-black w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
      >
        <option value='食物'>食物</option>
        <option value='交通'>交通</option>
        <option value='娛樂'>娛樂</option>
        <option value='其他'>其他</option>
      </select>
      <input
        className='text-black border-black w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder='金額'
      />
      <button
        className='w-full bg-primary hover:bg-secondary text-white py-2 rounded-lg font-semibold transition'
        onClick={handleAddOrUpdate}
      >
        {editingItem ? '更新記錄' : '新增記錄'}
      </button>
    </div>
  );
}
