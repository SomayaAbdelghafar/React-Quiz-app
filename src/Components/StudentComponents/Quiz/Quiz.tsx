import React, { useState } from "react";

import UpcomingQuizes from "../../Quizzes/UpcomingQuizes/UpcomingQuizes";
import CompletedQuizzes from "../../Quizzes/CompletedQuizzes/CompletedQuizzes";
import axios from "axios";
import { baseUrl } from "../../../ApiUtls/ApiUtls";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../Shared/ErrorMessage/ErrorMessage";
import SharedModal from "../../../Shared/Modal/Modal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Loading from "../../../Shared/Loading/Loading";
import NoData from "../../../Shared/NoData/NoData";

export default function Quiz() {
  const [modalState, setModalState] = useState("close");
  const { headers } = useSelector((state: any) => state.userData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { upcomingQuizzes } = useSelector(
    (state: any) => state.upcomingQuizzes
  );
  const { completedQuizzes } = useSelector(
    (state: any) => state.CompletedQuizzes
  );
  const showAddModal = () => {
    setModalState("add1");
  };
  const showSuccessJoinModal = () => {
    setModalState("success");
  };
  const handleClose = () => {
    setModalState("close");
  };
const [isLoading, setisLoading] = useState(false)
  const joinQuiz = (data:string) => {
    setisLoading(true)
    axios
      .post(`${baseUrl}/quiz/join`, data, headers)
      .then((response) => {
        showSuccessJoinModal();
        setTimeout(() => {
          navigate(`/student/questions/${response.data.data.quiz}`);
        }, 2000);

        //  toast.success(response.data.message)
      })
      .catch((error) => {
        console.log(error);

        toast.error(error?.response?.data?.message);
      }).finally(()=>{
        setisLoading(false)
      })
  };
  return (
    <>
      <div className="grid lg:grid-cols-1 grid-cols-1">
        <div className="newQuiz-Bank sm:p-3 ">
          <div className="flex">
            <button
              onClick={showAddModal}
              className="new-quiz text-center border rounded-xl py-4 px-5 mx-3"
            >
              <i className="fa-solid fa-clock text-zinc-600 text-6xl my-2 "></i>

              <p className="text-lg font-semibold ">Join Quiz</p>
            </button>
          </div>
        </div>

        {!completedQuizzes && !upcomingQuizzes ? (
          <div className="h-[30vh] w-full flex items-center justify-center text-5xl">
            <Loading />
          </div>
        ) : completedQuizzes || upcomingQuizzes ? (
          <div className="upComingQuiz-Completed grid grid-cols-1 lg:grid-cols-2">
            {!upcomingQuizzes ? (
              <div className="h-[30vh] w-full flex items-center justify-center text-5xl">
                <Loading />
              </div>
            ) : upcomingQuizzes ? (
              <div className="my-2">
                <UpcomingQuizes upcomingQuizzes={upcomingQuizzes} />
              </div>
            ) : (
              <NoData />
            )}


            {completedQuizzes?.length == 0 ? (
              <div className="h-[30vh] w-full flex items-center justify-center text-5xl">
              <Loading />
            </div>
            ) : completedQuizzes > 0 ? (
              <div className="my-3">
                <CompletedQuizzes completedQuizzes={completedQuizzes} />
              </div>
            ) : (

                            <div className="md:my-4 ">
                            <h2 className="text-1xl font-semibold">Completed Quizzes</h2>
                            <NoData />
                          </div>
            )}

          </div>
        ) : (
          <NoData />
        )}
      </div>
      <SharedModal
        show={modalState === "add1"}
        title="Join Quiz"
        onSave={() => {}}
        omitHeader={true}
        onClose={handleClose}
        body={
          <div className="px-8 ">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <h2 className="font-bold text-xl my-2">Join Quiz</h2>
                <span>Input the code received for the quiz below to join</span>
                {isLoading?<div className="flex items-center justify-center h-14 text-center text-3xl">
                <Loading/>
                </div>:
                
                <form onSubmit={handleSubmit(joinQuiz)}>
                  <div className="code mt-2 flex rounded-xl">
                    <label
                      htmlFor="code"
                      className="bg-authImage px-4 py-2 font-semibold rounded-l-xl text-center"
                    >
                      Code
                    </label>
                    <input
                      id="code"
                      {...register("code", { required: true })}
                      className="w-full border-2 px-1 rounded-r-xl py-2"
                      type="text"
                    />
                    {errors.code ? (
                      <ErrorMessage>
                        {String(errors.code?.message)}
                      </ErrorMessage>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="   flex justify-center items-center mt-2">
                    <div className="border w-[25%] py-2 ">
                      <button type="submit">
                        <i className="fa-solid fa-check"></i>
                      </button>
                    </div>
                    <div className="border w-[25%] py-2 ">
                      <button type="button">
                        <i onClick={handleClose} className="fa-solid fa-x"></i>
                      </button>
                    </div>
                  </div>
                </form>
                }
              </div>
            </div>
          </div>
        }
      />
      <SharedModal
        show={modalState === "success"}
        title="Join Quiz"
        onSave={() => {}}
        omitHeader={true}
        onClose={handleClose}
        body={
          <>
            <div className="text-center mb-3">
              <i className="fa-solid fa-circle-check fa-3x"></i>
            </div>
            <div className="text-center ">
              <h3 className="pb-2 font-semibold">Quiz joined successfully</h3>
              <p className=" font-semibold">Python for noobs Quiz one</p>
            </div>
            <div className="text-center">
              <button
                onClick={handleClose}
                className="bg-secondry px-8 rounded-2xl mt-8 font-semibold"
              >
                close
              </button>
            </div>
          </>
        }
      />
    </>
  );
}
