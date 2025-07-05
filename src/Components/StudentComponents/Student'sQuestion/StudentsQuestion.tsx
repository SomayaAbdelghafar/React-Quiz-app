import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { baseUrl } from "../../../ApiUtls/ApiUtls";
import Loading from "../../../Shared/Loading/Loading";
import { Link } from "react-router-dom";
interface Question {
  _id: string;
  title: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}
interface Submission {
  question: string;
  answer: string;
}
export default function StudentsQuestion() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizName, setQuizName] = useState<string>("");
  const { headers } = useSelector((state: any) => state.userData);
  const { register } = useForm();
  const [answers, setAnswers] = useState<Submission[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<any>()
  const [score, setScore] = useState(0)
  const [finalGrade, setFinalGrade] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

  const getQuestions = () => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/quiz/without-answers/${quizId}`, headers)
      .then((response) => {
        setQuestions(response.data.data.questions);
        setFinalGrade(response.data.data.score_per_question * response.data.data.questions_number)
        setQuizName(response.data.data.title);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const submitAnswers = () => {
    axios
      .post(`${baseUrl}/quiz/submit/${quizId}`, { answers }, headers)
      .then((response) => {
        setCorrectAnswers(response.data.data.questions);
        setScore(response.data.data.score);
        console.log(response);
        
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        
        toast.error(error.response.data.message);
      });
  };
  const handleSubmit = (questionId: string, selectedAnswer: string) => {
    const newSubmission: Submission = {
      question: questionId,
      answer: selectedAnswer,
    };
    const existingSubmissionIndex = answers.findIndex(
      (submission) => submission.question === questionId
    );

    if (existingSubmissionIndex !== -1) {
      setAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingSubmissionIndex] = newSubmission;
        return updatedAnswers;
      });
    } else {
      setAnswers((prevAnswers) => [...prevAnswers, newSubmission]);
    }
  };
  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <>
    {correctAnswers? <div className="flex my-10 p-4 w-full">
<div>
<h3 className="font-semibold text-4xl bg-authImage hover:bg-red-200 duration-500 px-3 py-1 rounded-e-3xl mb-2 text-center">score : {`${score}/${finalGrade}`}</h3>
{correctAnswers?.map((el:any,idx:number)=><div className="title flex mt-3">
       <span className="px-2 py-1 rounded-l-xl font-semibold border-l-2 border-y-2">{idx}- {el.title} </span><span className="bg-dark text-white py-1 px-2 rounded-r-xl border">{el.options[el.answer]}</span>
      </div>)}
      <div className="text-right my-4">
      <Link to='/student' className="text-black p-2 rounded-lg hover:bg-red-200 duration-500 bg-authImage">Go Back Home</Link>
      </div>
</div>
    </div>:<div className="questions pt-3 mt-5 border rounded-xl">
        <div className="m-3 font-bold">QUIZ Name: {quizName || ""}</div>

        {!isLoading ? (
          questions.map((question, index) => (
            <div
              key={index}
              className="questionCard m-3   p-2  shadow-md rounded-lg  "
            >
              <div
                className="questionHeader w-auto bg-authImage  rounded-md mt-1 py-1 px-2 "
                {...register("question")}
              >
                {question.title}
              </div>
              <div className="answers mx-3  ">
                <div className="subAnswer bg-white  rounded-md shadow-md my-2">
                  <input
                    type="radio"
                    className="mr-3"
                    {...register("answer")}
                    name={`question_${question._id}`}
                    onChange={() =>
                      handleSubmit(question._id, "A")
                    }
                  />
                  <span>{question.options.A}</span>
                </div>
                <div className="subAnswer bg-white  rounded-md shadow-md my-2">
                  <input
                    type="radio"
                    className="mr-3"
                    {...register("answer")}
                    name={`question_${question._id}`}
                    onChange={() =>
                      handleSubmit(question._id, "B")
                    }
                  />
                  <span>{question.options.B}</span>
                </div>
                <div className="subAnswer bg-white  rounded-md shadow-md my-2">
                  <input
                    type="radio"
                    className="mr-3"
                    {...register("answer")}
                    name={`question_${question._id}`}
                    onChange={() =>
                      handleSubmit(question._id, "C")
                    }
                  />
                  <span>{question.options.C}</span>
                </div>
                <div className="subAnswer bg-white  rounded-md shadow-md my-2">
                  <input
                    type="radio"
                    className="mr-3"
                    {...register("answer")}
                    name={`question_${question._id}`}
                    onChange={() =>
                      handleSubmit(question._id,"D")
                    }
                  />
                  <span>{question.options.D}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-[70vh] text-5xl">
            <Loading />
          </div>
        )}

        <div className="text-center">
          <button
            className="bg-authImage font-semibold hover:bg-red-200 rounded-3xl duration-500 mb-5 px-12 py-1 mr-8"
            onClick={submitAnswers}
          >
            Submit
          </button>
        </div>
      </div>}

    </>
  );
}
