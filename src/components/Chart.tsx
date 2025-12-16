import { PieChart, Pie, Cell, Legend } from 'recharts';
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

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  if (chartData.length === 0)
    return (
      <p className='text-black'>
        沒有 {type === 'income' ? '收入' : '支出'} 資料
      </p>
    );

  return (
    <div className='relative flex flex-col items-center'>
      <PieChart width={350} height={350}>
        <Pie
          data={chartData}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          innerRadius={50}
          outerRadius={80}
          label={({ name, value }) => `${name}: $${value}`}
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <text
          x='50%'
          y='50%'
          textAnchor='middle'
          dominantBaseline='central'
          className='fill-gray-800'
        >
          <tspan x='50%' dy='-1.6em' fontSize='12'>
            總{type === 'income' ? '收入' : '支出'}
          </tspan>
          <tspan x='50%' dy='1.2em' fontSize='18' fontWeight='bold'>
            ${total}
          </tspan>
        </text>
        <Legend
          formatter={(value, entry) =>
            `${value} $${entry?.payload?.value ?? 0}`
          }
        />
      </PieChart>
      <span
        className={`font-bold text-lg ${
          type === 'income' ? 'text-income' : 'text-expense'
        }`}
      >
        總{type === 'income' ? '收入' : '支出'}-${total}
      </span>
    </div>
  );
}
