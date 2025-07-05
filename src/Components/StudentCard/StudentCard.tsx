import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "../../ApiUtls/ApiUtls";
import useFetchData from "../../ApiUtls/useFetchData";
import Label from "../../Shared/Label/Label";
import Loading from "../../Shared/Loading/Loading";
import SharedModal from "../../Shared/Modal/Modal";
import trash from "../../assets/Email (1).png";
import userImg from "../../assets/user img.png";
import { studentInfo } from "../Students/Students";
interface StudentCard {
  student: studentInfo;
  getGroups: () => void;
  activeGroupId: string
  getGroupById: () => void;
   groups: group[];
}
interface group{
    _id?: string;
    name?: string;
    students?:object[],
    status?:string,
    max_students?:string,
    instructor?:string,
}
export default function StudentCard({
  student,
  getGroups,
  groups,activeGroupId,getGroupById
}: StudentCard) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { headers } = useSelector((state: any) => state.userData);
  const [studentId, setStudentId] = useState<string>("close");
  const [modalState, setModalState] = useState<string>("close");
  const { fetchedData: studentData, getData, isLoading } = useFetchData();
  const [groupId, setGroupId] = useState();
  const [updateLoading, setupdateLoading] = useState(false)
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const closeModal = () => {
    setModalState("close");
  };

  const handleView = (id: string) => {
    getUserInfo(id);
    setModalState("view");
  };
  const getUserInfo = (id: string) => {
    getData(`student/${id}`);


  };
  const handleEdit = (id: string) => {
    setStudentId(id);
    setModalState("Edit");
  };

  const handleUpdate = () => {
    setupdateLoading(true);
    axios
      .put(
        `https://upskilling-egypt.com:3005/api/student/${studentId}/${groupId}`,{},headers
      )
      .then((res) => {
        getGroupById(activeGroupId);
        toast.success(res.data.message)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      }).finally(()=>{
        setupdateLoading(false)
      })
  };


const [loadingOfDeleteModal, setLoadingOfDeleteModal] = useState(false);
  const handleDelete = (id: string) => {
    setModalState("Delete");
    setStudentId(id);
  };

  const deleteStudent = () => {
    setLoadingOfDeleteModal(true)
    if (!studentId) return;
    axios
      .delete(`${baseUrl}/student/${studentId}`, headers)
      .then((response) => {
        toast.success(response?.data?.message);
        getGroupById(activeGroupId)
        closeModal();
        getGroups();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      }).finally(()=>{
        setLoadingOfDeleteModal(false)
      })
  };
  return (
    <>
      <div className="flex flex-col ml-1 mt-4">
        <div className="border rounded-2xl flex justify-between align-items-center relative">
          <div className="flex">
            <img src={userImg} alt="userImage" className="w-16 h-16 mr-4" />
            <div className="mt-2">
              <p className="font-semibold mx-2">
                {student.first_name} {student.last_name}
              </p>
              <div className="flex">
                <p className="border-r mx-1 px-1">Role :Student</p>
                <p>Status :Active</p>
              </div>
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={toggleDropdown}
              className="bg-white px-2 py-1 text-sm font-bold text-gray-900"
              id="menu-button"
            >
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            {dropdownOpen && (
              <div className="absolute z-30 right-0 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div
                  className="py-1"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <button
                    onClick={() => {
                      handleView(student._id);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    <i className="fa-solid fa-eye"></i> View
                  </button>
                  <button
                    onClick={() => {
                      handleEdit(student._id);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    <i className="fa-solid fa-edit"></i> Update
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(student._id);
                    }}
                    className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 hover:text-red-900"
                    role="menuitem"
                  >
                    <i className="fa-solid fa-trash-alt"></i> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <SharedModal
        show={modalState === "view"}
        omitHeader={true}
        onClose={closeModal}
        body={
          !isLoading ? (
            <div className="px-3">
              <Label
                word="FirstName"
                class_Name="w-[80%] m-auto"
                value={studentData.first_name}
              />
              <Label
                word="lastName"
                class_Name="w-[80%] m-auto"
                value={studentData.last_name}
              />
              <Label
                word="Email"
                class_Name="w-[80%] m-auto"
                value={studentData.email}
              />
              <Label
                word="Group-Name"
                class_Name="w-[80%] m-auto"
                value={studentData?.group?.name}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-52 w-full text-5xl ">
              <Loading />
            </div>
          )
        }
      />

      <SharedModal
        show={modalState === "Delete"}
        title="Delete Student"
        onSave={deleteStudent}
        onClose={closeModal}
        body={!loadingOfDeleteModal?
          <div className="text-center">
            <img src={trash} alt="trash" className="w-1/6 m-auto" />
            <p className="text-lg">
              Are you sure you want to{" "}
              <button onClick={deleteStudent} className="text-red-500 boreder-0">delete</button> this student?
            </p>
          </div>:<div className="flex items-center justify-center h-16 text-5xl">
            <Loading/>
          </div>
        }
      />
      <SharedModal
        show={modalState === "Edit"}
        title="update Student"
        onSave={handleUpdate}
        onClose={closeModal}
        body={
updateLoading?<div className="p-2 flex text-5xl items-center justify-center">
  <Loading/>
</div>:          <div className="text-center">
            <select
              className="w-[90%] bg-authImage rounded-2xl px-2 py-1 border"
              onChange={(eventInfo) => {
                setGroupId(eventInfo.target.value);
              }}
            >
              <option className="bg-white">Select Group</option>
              {groups.map((group, idx) => (
                <option className="bg-white" key={idx} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
        }
      />
    </>
  );
}
