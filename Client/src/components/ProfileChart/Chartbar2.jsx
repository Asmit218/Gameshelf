import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

export default function Chartbar2({gameWin}) {
    const data = gameWin.map((game)=>({
        name:game._id,
        Win:game.win,
        Loss:game.loss
    }));
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
            <XAxis dataKey="name" stroke='gray' />
            <YAxis width="auto" stroke='gray'/>
            <Bar dataKey="Win"className='fill-base-100 stroke-secondary-content hover:stroke-success stroke-2  ' barSize={40} radius={[10, 10, 0, 0]} >
                <LabelList content='pv' position='insideTop' />
            </Bar>
            <Bar dataKey="Lost" className='fill-base-100 stroke-secondary-content hover:stroke-error stroke-2' barSize={40} radius={[10, 10, 0, 0]} >
                <LabelList content='pv' position='insideTop' />
            </Bar>
        </BarChart>
    )
}