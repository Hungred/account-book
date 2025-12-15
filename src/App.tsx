import { useState, useEffect } from 'react';
import RecordForm from './components/RecordForm';
import type { RecordType } from './components/RecordForm';
import RecordList from './components/RecordList';
import type { Category, RecordItem } from './components/RecordList';
import Summary from './components/Summary';
import Chart from './components/Chart';

export default function App() {
  const [list, setList] = useState<RecordItem[]>([]);
  const [editingItem, setEditingItem] = useState<RecordItem | null>(null);

  const handleAdd = (
    title: string,
    amount: number,
    type: RecordType,
    category: Category
  ) => {
    const newItem: RecordItem = {
      id: Date.now(),
      title,
      amount,
      type,
      category,
    };
    setList((prev) => [...prev, newItem]);
  };

  const handleRemove = (id: number) => {
    setList((prev) => prev.filter((i) => i.id !== id));
  };

  const handleEdit = (item: RecordItem) => {
    setEditingItem(item);
  };

  const handleUpdate = (updated: RecordItem) => {
    setList((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    setEditingItem(null);
  };

  useEffect(() => {
    const data = localStorage.getItem('records');
    if (!data) return;

    try {
      const parsed: RecordItem[] = JSON.parse(data);
      setList(parsed);
    } catch (err) {
      console.error('Failed to parse localStorage data', err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(list));
  }, [list]);

  return (
    <div className='max-w-3xl mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4 text-center'>記帳程式</h1>
      <div className='mb-6'>
        <RecordForm
          onAdd={handleAdd}
          editingItem={editingItem}
          onUpdate={handleUpdate}
        ></RecordForm>
      </div>
      <div className='mb-6'>
        <Summary list={list}></Summary>
      </div>
      <div className='mb-6'>
        <RecordList
          list={list}
          onRemove={handleRemove}
          onEdit={handleEdit}
        ></RecordList>
      </div>
      <div className='flex justify-around flex-wrap gap-4'>
        <Chart list={list} type='income' />
        <Chart list={list} type='expense' />
      </div>
    </div>
  );
}
