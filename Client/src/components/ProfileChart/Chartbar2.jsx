import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

export default function Chartbar2() {
    const data = [
        {
            name: 'Unravel',
            Win: 24,
            Lost: 11

        },
        {
            name: 'Drop the handkercheif',
            Win: 13,
            Lost: 11

        },
        {
            name: 'Higher Lower',
            Win: 9,
            Lost: 11
   
        },
        {
            name: 'Bloody Dotty',
            Win: 3,
            Lost: 11
  
        },
        {
            name: 'Game of contradiction',
            Win: 4,
            Lost: 11
     
        },
        {
            name: 'Goofspeil',
            Win: 30,
            Lost: 11

        }
    ];
    return (
        <BarChart
            style={{padding:'20px', width: '100%', maxWidth: '1200px', maxHeight: '37vh', aspectRatio: 1.618 }}
            responsive
            data={data}
            margin={{
                top: 15,
                right: 0,
                left: 0,
                bottom: 5,
            }}
        >
            <XAxis dataKey="name" stroke='white' />
            <YAxis width="auto" stroke='white'/>
            <Bar dataKey="Win" fill="#303030" barSize={40} stroke="#C2C2C2" activeBar={{ fill: '#2D3E2A', stroke: '#FFC800' }} radius={[10, 10, 0, 0]} >
                <LabelList content='pv' position='insideTop' />
            </Bar>
            <Bar dataKey="Lost" fill="#303030" barSize={40} stroke="#C2C2C2" activeBar={{ fill: '#3E2A2A', stroke: '#FFC800' }} radius={[10, 10, 0, 0]} >
                <LabelList content='pv' position='insideTop' />
            </Bar>
        </BarChart>
    )
}