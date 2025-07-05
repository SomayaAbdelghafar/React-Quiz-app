import { useLocation } from "react-router-dom";
import psyology from "../../../assets/443de449f9295558ab8120f068b0b58b.png";
import QuizCard from "../QuizCard/QuizCard";
interface UpcomingQuizes{
  upcomingQuizzes:object[]
}

export default function UpcomingQuizes({upcomingQuizzes}:UpcomingQuizes) {
  const location =useLocation();
  
  return (
    <div className="upcoming-quizzes p-3 w-full">
      {upcomingQuizzes &&<div className="border rounded-xl">
        <h5 className="text-lg font-semibold my-2 mx-2">Upcoming quizzes</h5>
        {location.pathname=="/dashboard/quizzes"||location.pathname=="/student"?
          upcomingQuizzes
            .slice(0, 2)
            .map((quiz:any,idx:number) => (
              <QuizCard
              key={idx}
                studentsEnrolled={10}
                time={quiz.schadule.split("T")[1].split(".")[0]}
                id={quiz._id}
                imageSrc={psyology}
                date={quiz.schadule.split("T")[0]}
                name={quiz.title}
              />
            )):upcomingQuizzes.map((quiz:any,idx:number) => (
              <QuizCard
              key={idx}
                studentsEnrolled={10}
                time={quiz.schadule.split("T")[1].split(".")[0]}
                id={quiz._id}
                imageSrc={psyology}
                date={quiz.schadule.split("T")[0]}
                name={quiz.title}
              />
            ))
            }
      </div>}

    </div>
  );
}


