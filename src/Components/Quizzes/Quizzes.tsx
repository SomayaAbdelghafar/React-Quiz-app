import { useState } from "react";
import SharedModal from "../../Shared/Modal/Modal";
import UpcomingQuizes from "./UpcomingQuizes/UpcomingQuizes";
import CodeModal from "./CodeModal/CodeModal";
import CompletedQuizzes from "./CompletedQuizzes/CompletedQuizzes";
import QuizModal from "./QuizModal/QuizModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../Shared/Loading/Loading";

export default function Quizzes() {
  const {upcomingQuizzes}=useSelector((state:any)=>state.upcomingQuizzes);
  const {completedQuizzes}=useSelector((state:any)=>state.CompletedQuizzes);

  const [modalState, setModalState] = useState("close");
  const [code, setCode] = useState<string>("");
  const handleClose = () => {
    setModalState("close");
  };
  const showAddModal = () => {
    setModalState("add");
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div className="newQuiz-Bank sm:p-3 ">
          <div className="flex">
            <button
              onClick={showAddModal}
              className="new-quiz text-center border rounded-xl py-4 px-5 mx-3"
            >
              <i className="fa-solid text-zinc-600 text-6xl fa-file-circle-plus my-2"></i>
              <p className="text-lg font-semibold ">Set up a new quiz</p>
            </button>
            <Link to={"/dashboard/questions"} className="new-quiz text-center border rounded-xl py-4 px-5 mx-3">
              <i className="fa-solid text-zinc-600 text-6xl fa-building-columns my-2"></i>
              <p className="text-lg font-semibold ">Question Bank</p>
            </Link>
          </div>
        </div>

        <div className="upComingQuiz-Completed">
          {completedQuizzes?<>          <UpcomingQuizes upcomingQuizzes={upcomingQuizzes} />
          <CompletedQuizzes completedQuizzes={completedQuizzes}/></>:<div className="h-[80vh] w-full flex items-center justify-center text-5xl"><Loading/></div>}
        </div>
      </div>


      <SharedModal
        show={modalState === "add"}
        title="Set up a new quiz"
        onSave={() => {
         ()=>{}
        }}
        onClose={handleClose}
        body={
          modalState =="add"?<QuizModal setCode={setCode} setModalState={setModalState} handleClose={handleClose}/>:""
        }
      />
      <SharedModal
        show={modalState === "quiz-code"}
        title=""
        onSave={() => {
          console.log("hello");
        }}
        omitHeader={true}
        onClose={handleClose}
        body={
          <CodeModal handleClose={handleClose} code={code}/>

        }
      />
    </>
  );
}
