import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "../../ApiUtls/ApiUtls";
import ErrorMessage from "../../Shared/ErrorMessage/ErrorMessage";
import Loading from "../../Shared/Loading/Loading";
import SharedModal from "../../Shared/Modal/Modal";
interface UpdateGroupProps {
  getGroups: () => void; 
  isOpen: boolean;
  onClose: () => void;
  id: any;
  group:GroupType,
}
interface GroupType {
  _id: string;
  name: string;
  // Add other properties of group if needed
}

export default function UpdateGroup({
  getGroups,
  isOpen,
  onClose,
  group
}: UpdateGroupProps) {
  const [isloading, setIsLoading] = useState(false);
  const [studentsList, setStudentsList] = useState<any>();
  const { headers } = useSelector((state: any) => state.userData);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setIsLoading(true);
    updateGroup(data)
    console.log(data);
    
  };
  const updateGroup=(data:any)=>{
    axios
    .put(`${baseUrl}/group/${group._id}`, data, headers)
    .then((response) => {
      toast.success(response?.data.message || "Successfully updated");
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message || "Error updated");
    })
    .finally(() => {
      setIsLoading(false);
      onClose();
      getGroups();
      setValue("name", "");
    });
  }
  useEffect(() => {
    setValue("name", group.name);
  }, [group]);
  return (
    <>
      <SharedModal
      
        title="Update Group Name"
        body={
          <form id="quizModal">
            {isloading ? (
              <div className="text-center m-4 p-3 text-5xl">
                <Loading />
              </div>
            ) : (
              <div className="py-2">
                <div className="w-[90%] m-auto mb-4">
                  <div className="my-1">
                    <div className="relative mt-2 rounded-md shadow-sm text-center flex">
                      <div className=" flex items-center pl-3 bg-authImage font-semibold w-[30%] text-center rounded-md">
                        <span className="text-black sm:text-sm px-2">
                          Group Name
                        </span>
                      </div>
                      <input
                        {...register("name", {
                          required: "required",
                        })}
                        type="text"
                        className="ps-2 py-2 block w-full rounded-md border-0 rounded-tl-none rounded-bl-none  text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.name && errors.name.type === "required" && (
                        <ErrorMessage>
                          {" "}
                          {String(errors?.name.message)}
                        </ErrorMessage>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        }
        onClose={onClose}
        show={isOpen}
        onSave={handleSubmit(onSubmit)}
      />
    </>
  );
}
