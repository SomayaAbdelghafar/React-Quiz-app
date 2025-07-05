import { useState } from "react";
import { useSelector } from "react-redux";
import useFetchData from "../../ApiUtls/useFetchData";
import SharedModal from "../../Shared/Modal/Modal";
import Loading from "../../Shared/Loading/Loading";
import NoData from "../../Shared/NoData/NoData";
import userImg from "../../assets/user img.png";
import UpcomingQuizes from "../Quizzes/UpcomingQuizes/UpcomingQuizes";
import StudentDataModal from "../Students/StudentDataModal/StudentDataModal";
interface student {
  email: string;
  last_name: string;
  first_name: string;
  group: {
    name: string;
  };
  _id: string;
  avg_score: string;
}

export default function Home() {
  const [modalAction, setModalAction] = useState("close");
  const { upcomingQuizzes } = useSelector(
    (state: any) => state.upcomingQuizzes
  );
  let { students: topStudents } = useSelector((state: any) => state.students);
  const { fetchedData: studentInfo, getData, isLoading } = useFetchData();

  const getStudentById = (studentId: string) => {
    setModalAction("view");
    getData(`student/${studentId}`);
  };
  const closeModal = () => setModalAction("close");

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-x-4 grid-cols-1 m-3 border  rounded-2xl pt-3">
        <div className="exams mx-2">
          {!upcomingQuizzes ? (
            <div className="flex items-center justify-center h-[80vh] w-full text-5xl ">
              <Loading />
            </div>
          ) : upcomingQuizzes ? (
            <UpcomingQuizes upcomingQuizzes={upcomingQuizzes} />
          ) : (
            <div className="h-[50vh] flex items-center justify-center">
              <NoData />
            </div>
          )}
        </div>

        <div className="px-3">
          <div className="border students mt-2 rounded-xl w-[100%] px-2 ">
            <h3 className="pl-3 mt-2 font-bold"> Top 5 Students </h3>
            {!topStudents ? (
              <div className="flex items-center justify-center h-[50%] w-full text-5xl ">
                <Loading />
              </div>
            ) : topStudents ? (
              topStudents?.map((student: student, id: number) => (
                <div key={id}>
                  <div className=" my-4 ml-1 ">
                    <div className="border rounded-xl ">
                      <div className="flex ">
                        <div className="image w-[15%]">
                          <img src={userImg} className="w-[100%]" alt="" />
                        </div>
                        <div className=" ml-2 mt-2 w-5/6">
                          <div className="flex justify-between">
                            <h3 className="font-bold">
                              {student.first_name}
                              {student.last_name}
                            </h3>
                            <button
                              onClick={() => getStudentById(student?._id)}
                              className="hover:bg-zing-950 duration-500 hover:text-gray-400"
                            >
                              <i className="fa-solid fa-circle-arrow-right mt-[5px]  pr-2 mr-3   "></i>
                            </button>
                          </div>
                          <div className="flex">
                            <h5 className="border-r pr-1 ">
                              Group:<span> {student.group?.name} </span>
                            </h5>
                            <h5 className="pl-1">
                              Average score :
                              <span>
                                {student && student.avg_score
                                  ? `${Number(student?.avg_score).toFixed(2)}`
                                  : "0"}
                                %
                              </span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-[50vh] flex items-center justify-center">
                <NoData />
              </div>
            )}
          </div>
        </div>

        <SharedModal
          show={modalAction === "view"}
          onClose={closeModal}
          omitHeader={true}
          body={
            !isLoading ? (
              <StudentDataModal studentInfo={studentInfo} />
            ) : (
              <div className="flex items-center justify-center h-52 w-full text-5xl ">
                <Loading />
              </div>
            )
          }
        />
      </div>
    </>
  );
}
