import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



function AnalyticChart({data,XAxis,YAxis,CartesianGrid}) {



  return (
    <div className='h-30 w-full'>
   <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {CartesianGrid}
          {/* <XAxis dataKey="name" /> */}
          {XAxis}
          {/* <YAxis /> */}
          {YAxis}
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#3743c0" fill="#c7c9f0" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AnalyticChart



  