import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

export default function Chartbar1() {
    const data = [
        {
            name: 'Unravel',
            pv: 2400,

        },
        {
            name: 'Drop the handkercheif',
            pv: 1398,

        },
        {
            name: 'Higher Lower',
            pv: 9800,

        },
        {
            name: 'Bloody Dotty',
            pv: 3908,

        },
        {
            name: 'Game of contradiction',
            pv: 4800,

        },
        {
            name: 'Goofspeil',
            pv: 3800,

        }
    ];
    return (
        <div className=''>
            <BarChart
                style={{ padding: '20px', width: '100%', maxWidth: '1200px', maxHeight: '37vh', aspectRatio: 1.618 }}
                responsive
                data={data}
                margin={{
                    top: 15,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis width="auto"/>
                <Bar dataKey="pv" className='fill-base-100 stroke-secondary-content hover:stroke-secondary stroke-2' barSize={70} radius={[10, 10, 0, 0]} >
                    <LabelList content='pv' position='top' />
                </Bar>
            </BarChart>
        </div>
    )
}