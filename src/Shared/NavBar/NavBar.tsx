import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CodeModal from "../../Components/Quizzes/CodeModal/CodeModal";
import QuizModal from "../../Components/Quizzes/QuizModal/QuizModal";
import { logOut } from "../../Redux/Slices/AuthSlice/AuthSlice";
import SharedModal from "../Modal/Modal";

export default function NavBar() {

  const dispatch = useDispatch();
  const [dropDownMenuState, setdropDownMenuState] = useState(false);
  const { userData } = useSelector((state: any) => state.userData);
  const Name = userData.profile.first_name + userData.profile.last_name;
  const role = userData.profile.role;
  const handleDropDownState = () => {
    setdropDownMenuState(!dropDownMenuState);
  };

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
      <div className="flex">
        <div className="w-full flex justify-between items-center border-b-2">
          <div>
            <h3 className="font-bold mx-2">Dashboard</h3>
          </div>

          <div className="flex items-center ">
            <div className="px-1">
              <div className="">
                {role!=="Student"?                <button onClick={showAddModal} className="border rounded-2xl duration-500 hover:bg-zinc-950 hover:text-gray-50 border-black px-1 ">
                  <i className="fa-solid mx-2 fa-clock"></i>
                  <span className="mx-1">New Quiz</span>
                </button>:""}

              </div>
            </div>

            <div className="mt-1 border-l-2 border-zinc-300 px-1 flex">
              <div className="data">
                <h3>{Name}</h3>
                <span className="text-[#C5D86D]">{role}</span>
              </div>

              <div className="relative dropDownList inline-block text-left">
                <div>
                  <button
                    type="button"
                    onClick={handleDropDownState}
                    className=" bg-white px-2 py-1 text-sm font-bold text-gray-900 "
                    id="menu-button"
                  >
                    <i className="fa-solid fa-caret-down"></i>
                  </button>
                </div>

                <div
                  className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                    dropDownMenuState ? "block" : "hidden"
                  }`}
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        dispatch(logOut());
                      }}
                      className="text-gray-700 block w-full px-4 py-2 text-left text-sm font-semibold"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
