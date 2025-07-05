import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../Shared/Loading/Loading";
import AddQuestionModal from "./AddQuestionModal";
import DeleteQuestionModal from "./DeleteQuestionModal";
import UpdateQuestionModal from "./UpdateQuestionModal";
export default function Questions() {
  const [questionsList, setQuestionsList] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  //******** const modals add,update,delete*******//
  const [modalState, setModalState] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const [question, setQuestion] = useState(null);

  const handleAddModal = () => {
    setModalState("add");
    setIsOpen(true);
  };
  const handleUpdateModal = (question: any) => {
    setModalState("update");
    setQuestion(question);
    setIsOpen(true);
  };
  const handleDeleteModal = (id: any) => {
    setModalState("delete");
    setId(id);
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const { userData } = useSelector((state: any) => state.userData);
  let reqHeaders = `Bearer ${userData?.accessToken}`;

  const getAllQuestions = () => {
    axios
      .get(`https://upskilling-egypt.com:3005/api/question`, {
        headers: { Authorization: reqHeaders },
      })
      .then((response) => {
        setIsLoading(true);
        setQuestionsList(response?.data);
      })

      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getAllQuestions();
  }, []);

  return (
    <>
      <div className="m-3 p-2 border rounded-md">
        <div className=" mb-3 flex justify-between">
          <h3 className="font-bold mt-3 ">Bank Of Questions</h3>
          <button
            onClick={handleAddModal}
            className="border rounded-2xl hover:text-gray-50 hover:bg-zinc-900 duration-500 border-black mt-3 mr-3 px-4 "
          >
            <i className="fa-solid fa-clock  "></i>
            <span>Add Question</span>
          </button>
        </div>

        <div>
          {isloading ? (
            <div className=" text-6xl flex items-center h-[70vh] justify-center">
              <Loading />
            </div>
          ) : (
            <div>
              {" "}
              <div className="table-responsive">
                {!questionsList ? (
                  <div className=" text-6xl flex items-center h-[70vh] justify-center">
                    <Loading />
                  </div>
                ) : (
                  <table className="text-sm font-bold table">
                    <thead>
                      <tr>
                        <th className="bg-black text-white">Question Title</th>
                        <th className="bg-black text-white">Difficulty</th>
                        <th className="bg-black text-white">Category</th>
                        <th className="bg-black text-white">Right Answer</th>
                        <th className="bg-black text-white">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {questionsList.map((question:any, idx:number) => (
                        <tr
                          key={idx}
                          className=" border rounded-2xl divide-x my-4 dark:border-neutral-500"
                        >
                          <td className=" py-3 font-medium">
                            {question?.title.substring(0, 35) +
                              (question?.title.length > 35 ? "..." : "")}
                          </td>
                          <td className="py-3">{question?.difficulty}</td>
                          <td className="py-3">{question?.type}</td>
                          <td className="py-3">{question?.answer}</td>
                          <td className="py-3">
                            <div className=" text-orange-600">
                              <button
                                onClick={() => {
                                  handleUpdateModal(question);
                                }}
                                className="fa-solid mr-4 fa-pen-to-square"
                              ></button>
                              <button
                                onClick={() => {
                                  handleDeleteModal(question?._id);
                                }}
                                className="fa-solid fa-trash-can"
                              ></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>{" "}
            </div>
          )}
        </div>
      </div>

      {modalState === "add" ? (
        <AddQuestionModal
          getAllQuestions={getAllQuestions}
          isOpen={isOpen}
          onClose={handleCloseModal}
        />
      ) : (
        ""
      )}
      {modalState === "update" ? (
        <UpdateQuestionModal
          getAllQuestions={getAllQuestions}
          isOpen={isOpen}
          onClose={handleCloseModal}
          question={question}
        />
      ) : (
        ""
      )}
      {modalState === "delete" ? (
        <DeleteQuestionModal
          getAllQuestions={getAllQuestions}
          isOpen={isOpen}
          onClose={handleCloseModal}
          id={id}
        />
      ) : (
        ""
      )}
    </>
  );
}
