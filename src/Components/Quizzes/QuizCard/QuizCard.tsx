import { Link ,useLocation} from "react-router-dom";

interface Quiz {
  imageSrc: string;
  name: string;
  date: string;
  time: string;
  studentsEnrolled: number;
  id: string;
}
export default function QuizCard({
  imageSrc,
  name,
  date,
  time,
  studentsEnrolled,
  id,
}: Quiz) {
  const location =useLocation();
  return (
    <div className="quizez m-3 my-4">
      <div className="first-quiz border flex rounded-xl">
        <div className="image w-[25%] flex items-center bg-authImage">
          <img className="w-full p-3" src={imageSrc} alt="#" />
        </div>
        <div className="info border-l-2 grid grid-rows-1 w-full">
          <div className="name-date m-2">
            <h5 className="font-semibold text-lg">{name}</h5>
            <p className="my-1 ">
              <span className="border-r-2 pr-1 border-black">{date}</span>
              <span className="mx-1">{time}</span>
            </p>
          </div>
          <div className="about m-2 w-full sm:flex sm:justify-between">
            <h6 className="font-medium text-sm">
              No. of student’s enrolled: {studentsEnrolled}
            </h6>
            {location.pathname!=="/student"?            <div className="open text-end">
              <Link
                to={`/dashboard/${id}`}
                className="border-1 hover:text-gray-50 hover:bg-zinc-900 duration-500 px-2 py-1 rounded-xl font-medium text-sm mx-3"
              >
                Open
                <i className="fa-solid mx-1 fa-circle-arrow-right text-secondry"></i>
              </Link>
            </div>:<></>}

          </div>
        </div>
      </div>
    </div>
  );
}
