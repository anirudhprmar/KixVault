import { DollarSign, File, ShoppingBag } from "lucide-react"
import AnalyticCards from "../../components/AnalyticCards"
import AdminMainChart from "../../components/AdminMainChart"


function AdminDashboard() {

  return (
    <div>
      
      <div className=" grid grid-cols-1 gap-10 w-full ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
            <AnalyticCards logo={<ShoppingBag/>} what={'Sales'} number={'34,500'}/>
            <AnalyticCards logo={<DollarSign/>} what={'Sales'} number={'34,500'}/>
            <AnalyticCards logo={<File/>} what={'Sales'} number={'34,500'}/>
          </div>

          <div className="hidden md:block">
            <AdminMainChart/>
          </div>
      </div>
      
    </div>
  )
}

export default AdminDashboard
