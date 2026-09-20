import { PieChart, Pie, Label, Legend, ResponsiveContainer } from 'recharts';

export default function Chartpie2({gameCount}) {
  const colors = [
    '#FFE8B9',
    '#FFC800',
    '#FF8F00',
    '#FF6B6B',
    '#8B5CF6'
  ];

  const data = gameCount.map((game, index) => ({
    name: game._id,
    value: game.count,
    fill: colors[index % colors.length]
  }));

  const MyPie = () => (
    <Pie data={data} dataKey="value" nameKey="name" outerRadius="90%" innerRadius="50%" isAnimationActive={false} />
  );
  return (
    <div>
      <div className='text-center font-bold'>Matches by game</div>
      <PieChart responsive style={{
        maxWidth: '420px',
        maxHeight: '30vh',
        width: '95%',
        margin: 'auto',
        minHeight: '250px',
        fontSize: '18px', flex: '1 1 200px', aspectRatio: 1.15
      }}>
        <MyPie />
        <Legend layout="horizontal"
          align="center"
          verticalAlign="bottom" />
      </PieChart>

    </div>
  )
}