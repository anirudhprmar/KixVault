import AnalyticChart from "./AnalyticChart"


function AnalyticCards({logo,what,number}) {
  const data = [
    { value: 20},
    { value: 50},
    {value: 10},
    {value: 100},
    {value: 30},
    {value: 80},
    {value: 70},
  ];
  return (
    <div className="bg-gray-100 rounded-2xl w-full p-2 h-fit ">
      <div className="flex items-center gap-2">
        <div className={`bg-green-300 text-gray-50 p-3 rounded-full`}>{logo}</div>
        <div className="flex flex-col gap-1">
          <span className="text-lg font-light">Total {what}</span>
          <span className="font-bold text-xl">{number}</span>
        </div>
      </div>

      <div >
      <AnalyticChart data={data} XAxis={null} YAxis={null} CartesianGrid={null}/>
      </div>

    </div>
  )
}

export default AnalyticCards
