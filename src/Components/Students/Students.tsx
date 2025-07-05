import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "../../ApiUtls/ApiUtls";
import Loading from "../../Shared/Loading/Loading";
import SharedModal from "../../Shared/Modal/Modal";
import NoData from "../../Shared/NoData/NoData";
import AddStudentToGroup from "./AddStudentToGroup/AddStudentToGroup";
import StudentCard from "../StudentCard/StudentCard";
import { useNavigate } from "react-router-dom";

export interface studentInfo {
  email: string;
  last_name: string;
  first_name: string;
  group: {
    name: string;
  };
  _id: string;
  avg_score?: string;
}
export default function Students() {
  const { headers } = useSelector((state: any) => state.userData);
  const [modalAction, setModalAction] = useState("close");
  const [userId, setUserId] = useState("");
  const [groups, setGroup] = useState(new Array());
  const [groupId, setGroupId] = useState<string>();
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?._id);
  const navigate=useNavigate();
  const handleOpenModal = (action: string) => {
    setModalAction(action);
  };
  const closeModal = () => setModalAction("close");

  const getGroups = () => {
    axios
      .get(`${baseUrl}/group`, headers)
      .then((response) => {
        setGroup(response.data);
        if (!groupId) {
          setGroupId(response.data[0]?._id);
          getGroupById(response.data[0]?._id);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message || "Invalid Data");
      });
  };

  const [students, setStudents] = useState(new Array());
  const [isLoading, setIsLoading] = useState(false);
  const getGroupById = (id: string) => {
    setActiveGroupId(id);
    setIsLoading(true);
    getStudentsFromGroup(id);
  };
  const getStudentsFromGroup = (id: string) => {
    if (!id) {
      toast.info("Create the first group.");
      navigate("/dashboard/groups")
    }
    axios
      .get(`${baseUrl}/group/${id}`, headers)
      .then((res) => {
        setStudents(res.data.students);
      })
      .catch((err) => {
        // toast.error(err.response.data.message)
        console.log(err);
        
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [addModalLoading, setaddModalLoading] = useState(false);

  const addStudentToGroup = () => {
    setaddModalLoading(true);
    if (userId) {
      return handleAddStudent();
    } else {
      toast.error("in-valid name or this student is already in group");
      setaddModalLoading(false);
    }
  };

  const handleAddStudent = () => {
    axios
      .get(`${baseUrl}/student/${userId}/${groupId}`, headers)
      .then((response) => {
        toast.success(response.data.message);
        closeModal();
        getGroupById(activeGroupId);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setaddModalLoading(false);
      });
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <>
      <div>
        {groups.length == 0 ? (
          <div className="h-[50vh] w-full flex items-center justify-center text-7xl">
            <Loading />
          </div>
        ) : (
          <>
            <div className=" flex justify-end ">
              <div className="rounded-3xl border duration-500 border-black text-center  w-60 mt-2 mr-4 hover:bg-black hover:text-white ">
                <i className="fa-solid fa-circle-plus mr-1"></i>
                <button onClick={() => handleOpenModal("add")}>
                  Add Student to current group
                </button>
              </div>
            </div>
            <div className="p-3">
              <div className="border rounded-2xl py-3">
                <h3 className="ml-12 pt-2 font-semibold">Students List</h3>
                <div className="ml-12  ">
                  {groups.map((group, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setGroupId(group._id);
                        getGroupById(group._id);
                      }}
                      className={` w-36 px-1 hover:text-gray-50 hover:bg-zinc-900 duration-500 mr-3 rounded-3xl border ${
                        group._id === activeGroupId ? "bg-black text-white" : ""
                      } border-black w-32 mt-4`}
                    >
                      {group.name}
                    </button>
                  ))}
                </div>

                {/* display students */}
                {isLoading ? (
                  <div className=" text-6xl h-[50%] w-full  flex items-center justify-center py-5">
                    <Loading />
                  </div>
                ) : students.length > 0 ? (
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4  mx-5  pr-4 ">
                    {students.map((student: studentInfo, index) => (
                      <div key={index} className="flex flex-col ml-4 mt-4">
                        <StudentCard
                          activeGroupId={activeGroupId}
                          getGroupById={getGroupById}
                          student={student}
                          groups={groups}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-center">
                    <div className=" text-3xl w-[70%]">
                      <NoData />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <SharedModal
        show={modalAction === "add"}
        title="Add New Student"
        onSave={() => {
          addStudentToGroup();
        }}
        onClose={closeModal}
        body={
          <>
            {modalAction == "add" ? (
              <AddStudentToGroup
                activeGroupId={activeGroupId}
                getGroupById={getGroupById}
                isLoading={addModalLoading}
                selectedStudentId={setUserId}
              />
            ) : (
              ""
            )}
          </>
        }
      />
    </>
  );
}
