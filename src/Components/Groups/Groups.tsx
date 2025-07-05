import DeleteGroup from "./DeleteGroup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../ApiUtls/ApiUtls";
import Loading from "../../Shared/Loading/Loading";
import NoData from "../../Shared/NoData/NoData";
import AddGroup from "./AddGroup";
import UpdateGroup from "./UpdateGroup";

export default function Groups() {
  const [groupsList, setGroupsList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const { headers } = useSelector((state: any) => state.userData);

  const [modalState, setModalState] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const [group, setGroup] = useState(null);

  const handleAddModal = () => {
    setModalState("add");
    setIsOpen(true);
  };
  const handleUpdateModal = (group: any) => {
    setModalState("update");
    setGroup(group);
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

  const getGroups = () => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/group`, headers)
      .then((response) => {
        setGroupsList(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <>
      <div className="Display-group-ui">
        <div className=" flex justify-end  pt-3 ">

          <button onClick={handleAddModal} className="rounded-3xl hover:bg-zinc-800 hover:text-gray-100 duration-500 border border-black text-center  w-40 mt-2 mr-4 ">
            <i className="fa-solid mx-2 fa-circle-plus"></i>
            <span className="" >
              Add Group
            </span>
          </button>

        </div>

        <div className="p-3">
          <div className="border rounded-2xl ">
            <h3 className="ml-12 py-2 text-xl font-bold">groups List</h3>
            {isloading ? (
              <div className="flex items-center justify-center h-[30vh] w-full text-5xl">
                <Loading />
              </div>
            ) : groupsList.length > 0 ? (
              <div className="grid md:grid-cols-2  p-2">
              {groupsList.map((group: any) => (
                <div key={group?._id} className="p-2">
                  <div className="flex justify-between align-middle border rounded py-2 px-3">
                    <div>
                      <h3 className="font-semibold">Group :{group?.name}</h3>
                      <h5 className="text-zinc-700 text-sm pt-2">
                        No.of students : {group?.students.length}{" "}
                      </h5>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          handleUpdateModal(group);
                        }}
                        className="px-1"
                      >
                        <i className="fa-regular text-warning fa-pen-to-square"></i>
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteModal(group._id);
                        }}
                        className="px-1"
                      >
                        <i className="fa-regular text-red-500 fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
              ) : (
              <div className="flex items-center justify-center">
                <div className="w-3/4 "><NoData /></div>
              </div>

            )}
          </div>
        </div>
      </div>



      {modalState === "add" ? (
        <AddGroup
          getGroups={getGroups}
          isOpen={isOpen}
          onClose={handleCloseModal}
        />
      ) : (
        <></>
      )}

      {modalState === "update" ? (
        <UpdateGroup
          getGroups={getGroups}
          isOpen={isOpen}
          onClose={handleCloseModal}
          group={group}
        />
      ) : (
        ""
      )}

      {modalState === "delete" ? (
        <DeleteGroup
          getGroups={getGroups}
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
