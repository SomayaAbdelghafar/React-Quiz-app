import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function ViewResult() {
  const { viewResults:name } = useParams();

  const DataTable=[{
    studentName:"Ahmd",
    Score:'17',
    Avg:'20',
    TimeSubmitted:"09:00",
   
  },{
    studentName:"Mahmoud",
    Score:'19',
    Avg:'20',
    TimeSubmitted:"09:00",
   
  },
  {
    studentName:"Mona",
    Score:'20',
    Avg:'20',
    TimeSubmitted:"09:00",
   
  },
  {
    studentName:"Hossam",
    Score:'18',
    Avg:'20',
    TimeSubmitted:"09:00",
   
  },
  {
    studentName:"Mustafa",
    Score:'17',
    Avg:'20',
    TimeSubmitted:"09:00",
   
  },
]
  return (
    <>

      <div className="resultsView px-3 w-full">
        <div className='mt-3 ml-1'>
          <Link to="/dashboard/results" className="m-2 font-semibold">
            Results <i className="fa-solid fa-angle-right text-secondry"></i>
            <i className="fa-solid fa-angle-right text-secondry"></i>
          </Link>
          <span>{name}</span>
        </div>
        <div className="border rounded-xl mt-4">
          <div className="header flex justify-between ml-4">
            <h5 className="text-lg font-semibold my-2 mx-2">
              Results
            </h5>
          </div>
          <div className="result ">
            <div className="overflow-x-auto p-3 ">
              <table className="divide-y-2 divide-x-2 divide-gray-200 bg-white text-sm w-full border-r-2 border-b-2">
                <thead className="ltr:text-left rtl:text-right">
                  <tr className="bg-black ">
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-50">
                      StudentName
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-50">
                      Score
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-50">
                      Average
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-50">
                      Time submitted
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {DataTable.map((data,index)=>
                   <tr key={index}>
                   <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                     {data.studentName}
                   </td>
                   <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {data.Score}
                   </td>
                   <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {data.Avg}
                   </td>
                   <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {data.TimeSubmitted}
                   </td>
                 </tr>)}
                 

                
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

