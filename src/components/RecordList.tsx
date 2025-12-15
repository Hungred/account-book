import type { RecordType } from './RecordForm';

export type Category = '食物' | '交通' | '娛樂' | '其他';
export interface RecordItem {
  id: number;
  title: string;
  amount: number;
  type: RecordType;
  category: Category;
}

export interface RecordListProps {
  list: RecordItem[];
  onRemove: (id: number) => void;
  onEdit: (item: RecordItem) => void;
}

export default function RecordList({
  list,
  onRemove,
  onEdit,
}: RecordListProps) {
  return (
    <ul>
      {list.map((item) => (
        <li
          className='flex justify-between items-center p-2 border-b'
          key={item.id}
          style={{ color: item.type === 'income' ? 'green' : 'red' }}
        >
          <span
            className={
              item.type === 'income' ? 'text-green-600' : 'text-red-600'
            }
          >
            [{item.type === 'income' ? '收入' : '支出'}][
            {item.category}]{item.title} - ${item.amount}
          </span>
          <div className='flex-gap-2'>
            <button
              className='px-2 py-1 bg-blue-500 text-white rounded'
              onClick={() => onEdit(item)}
            >
              編輯
            </button>
            <button
              className='px-2 py-1 bg-blue-500 text-white rounded'
              onClick={() => onRemove(item.id)}
            >
              刪除
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
