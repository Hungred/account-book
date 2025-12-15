import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import type { RecordItem } from './RecordList';

interface ChartProps {
  list: RecordItem[];
  type: 'income' | 'expense';
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Chart({ list, type }: ChartProps) {
  const data = list
    .filter((item) => item.type === type)
    .reduce<Record<string, number>>((acc, cur) => {
      acc[cur.category] = (acc[cur.category] || 0) + cur.amount;
      return acc;
    }, {});

  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  if (chartData.length === 0)
    return <p>沒有 {type === 'income' ? '收入' : '支出'} 資料</p>;

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={chartData}
        dataKey='value'
        nameKey='name'
        cx='50%'
        cy='50%'
        outerRadius={80}
        label
      >
        {chartData.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
