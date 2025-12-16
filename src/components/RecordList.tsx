import type { RecordType } from './RecordForm';
import editIcon from '../assets/icons/edit.svg';
import removeIcon from '../assets/icons/remove.svg';

export type Category = '食物' | '交通' | '娛樂' | '其他';
export interface RecordItem {
  id: number;
  title: string;
  amount: number;
  type: RecordType;
  category: Category;
  date: string; // ISO 字串格式，例如 '2025-12-15'
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
    <ul className='flex flex-col gap-y-3'>
      {list.map((item) => (
        <li
          key={item.id}
          className='flex items-center justify-between bg-card rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition'
        >
          <div>
            <p className='font-medium text-black'>{item.date}</p>
          </div>
          <div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full text-white
            ${item.type === 'income' ? 'bg-income' : 'bg-expense'}`}
            >
              {item.type === 'income' ? '收入' : '支出'}
            </span>
            <p className='font-medium text-black'>{item.category}</p>
          </div>
          <div className='flex items-center gap-3'>
            <p
              className={`font-bold
          ${item.type === 'income' ? 'text-income' : 'text-expense'}`}
            >
              ${item.amount}
            </p>
            <button
              className={`w-10 h-10 flex items-center justify-center text-white rounded-full ${
                item.type === 'income'
                  ? 'bg-income hover:opacity-60'
                  : 'bg-expense hover:opacity-60'
              }`}
              onClick={() => onEdit(item)}
            >
              <img src={editIcon} alt='edit' className='w-4 h-4 max-w-none' />
            </button>
            <button
              className={`w-10 h-10 flex items-center justify-center  text-white rounded ${
                item.type === 'income'
                  ? 'bg-income hover:opacity-60'
                  : 'bg-expense hover:opacity-60'
              }`}
              onClick={() => onRemove(item.id)}
            >
              <img
                src={removeIcon}
                alt='remove'
                className='w-4 h-4 max-w-none'
              />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
