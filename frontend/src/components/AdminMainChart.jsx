import AnalyticChart from "./AnalyticChart"
import { XAxis, CartesianGrid, } from 'recharts';


function AdminMainChart() {
    const data = [
        {name:"Jan",value:45},
        {name:"Fab",value:52},
        {name:"Mar",value:38},
        {name:"Apr",value:67},
        {name:"May",value:29},
    ]
  return (
    <div className="bg-gray-200 p-2 rounded-2xl w-150 h-50 flex flex-col gap-10">
      <div>
        <p className="font-bold text-2xl">Recent Order</p>
      </div>

      <div>
    <AnalyticChart data={data} XAxis={<XAxis dataKey="name" /> } YAxis={null } CartesianGrid={<CartesianGrid strokeDasharray="3 3" /> }/>
      </div>
    </div>
  )
}

export default AdminMainChart
