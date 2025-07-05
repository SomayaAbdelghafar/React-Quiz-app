import { Link } from "react-router-dom";
// interface Result {
//   title: string;
//   type: string;
//   closed_at: string;
// }
interface CompletedQuizzes {
  completedQuizzes: object[];
}
export default function CompletedQuizzes({
  completedQuizzes,
}: CompletedQuizzes) {
  

  return (
    <div className="completed-quizzes px-3 w-full">
      {!completedQuizzes ? (
        <>No Data</>
      ) : (
        <div className="border rounded-xl">
          <div className="header flex justify-between pt-2">
            <h5 className="text-lg font-semibold mx-2">Completed Quizzes</h5>
            <Link
              to="/dashboard/results"
              className="border-1 hover:text-gray-50 hover:bg-zinc-900 duration-500 px-2 py-1 rounded-xl font-medium text-sm mx-3"
            >
              reuslts{" "}
              <i className="fa-solid fa-arrow-right font-bold text-secondry"></i>
            </Link>
          </div>
          <div className="result">
            <div className="overflow-x-auto p-3">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                  <tr className="bg-black ">
                    <th className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-50">
                      Title
                    </th>
                    <th className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-50">
                      Category type
                    </th>
                    <th className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-50">
                      No. of persons in group
                    </th>
                    <th className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-50">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {completedQuizzes &&
                    completedQuizzes
                      .slice(0, 3)
                      .map((result:any, idx: number) =>{ return <tr key={idx}>
                          <td className="whitespace-nowrap px-4 text-center py-2 font-medium text-gray-900">
                            {result.title}
                          </td>
                          <td className="whitespace-nowrap px-4 text-center py-2 text-gray-700">
                            {result.type}
                          </td>
                          <td className="whitespace-nowrap px-4 text-center py-2 text-gray-700">
                            17
                          </td>
                          <td className="whitespace-nowrap px-4 text-center py-2 text-gray-700">
                            {result.closed_at?.split("T")[0]}
                          </td>
                        </tr>
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
