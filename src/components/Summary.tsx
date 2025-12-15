import type { RecordItem } from './RecordList';

export interface SummaryProps {
  list: RecordItem[];
}

export default function summary({ list }: SummaryProps) {
  const totalIncome = list
    .filter((i) => i.type === 'income')
    .reduce((sum, i) => {
      return sum + i.amount;
    }, 0);

  const totalExpense = list
    .filter((i) => i.type === 'expense')
    .reduce((sum, i) => sum + i.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div>
      <p>總收入：${totalIncome}</p>
      <p>總支出：${totalExpense}</p>
      <p style={{ color: balance >= 0 ? 'green' : 'red' }}>結餘：${balance}</p>
    </div>
  );
}
