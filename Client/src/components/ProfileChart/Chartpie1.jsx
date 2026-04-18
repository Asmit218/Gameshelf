import { PieChart, Pie, Label, Legend, ResponsiveContainer } from 'recharts';

export default function Chartpie1() {
  const data = [
    { name: 'UR', value: 400, fill: '#FFFFFF' },
    { name: 'DTH', value: 300, fill: '#FFE8B9' },
    { name: 'HL', value: 300, fill: '#FFC800' },
    { name: 'BD', value: 200, fill: '#FF8F00' },
    { name: 'GOC', value: 300, fill: '#FFC800' },
    { name: 'GS', value: 200, fill: '#FF8F00' }
  ];

  const MyPie = () => (
    <Pie data={data} dataKey="value" nameKey="name" outerRadius="90%" innerRadius="50%" isAnimationActive={false} />
  );
  return (
    <div>
      <PieChart responsive style={{maxWidth:'320px',
        maxHeight:'37vh',
        width: '95%',
        margin: 'auto',
        minHeight: '100px',
        fontSize:'16px', flex: '1 1 200px' , aspectRatio: 1.15}}>
        <MyPie />
        <Legend layout="vertical"
  align="right"
  verticalAlign="middle"/>
      </PieChart>

    </div>
  )
}