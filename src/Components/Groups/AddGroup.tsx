// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { baseUrl } from "../../ApiUtls/ApiUtls";
import ErrorMessage from "../../Shared/ErrorMessage/ErrorMessage";
import Loading from "../../Shared/Loading/Loading";
import SharedModal from "../../Shared/Modal/Modal";
interface AddGroupProps {
  getGroups: () => void; 
  isOpen: boolean;
  onClose: () => void; 
}
export default function AddGroup({ getGroups, isOpen, onClose }: AddGroupProps) {
  const { headers } = useSelector((state: any) => state.userData);
  const [studentsList, setStudentsList] =useState<{_id:string,first_name:string,last_name:string}[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [getStudentsLoading, setGetStudentsLoading] = useState(false)
  const [students, setStudents] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const getStudents = () => {
    setGetStudentsLoading(true);
    axios
      .get(`${baseUrl}/student/without-group`, headers)
      .then((response) => {
        setStudentsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setGetStudentsLoading(false)
      })
  };
  const onSubmit = (data: any) => {
    data.students = students.map((i: any) => i.value);
    setIsLoading(true);
    addGroup(data);
  };
  const addGroup = (data: any) => {
    axios
      .post(`${baseUrl}/group`, data, headers)
      .then((response) => {
        toast.success(response?.data.message || "Successfully added");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Error adding");
      })
      .finally(() => {
        setIsLoading(false);
        getStudents();
        getGroups();
        onClose();
        setValue("name", "");
      });
  };
  const options = studentsList?.map((student: {_id:string,first_name:string,last_name:string}) => ({
    value: student._id,
    label: `${student.first_name} ${student.last_name}`,
  }));
  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <SharedModal
        show={isOpen}
        onSave={handleSubmit(onSubmit)}
        onClose={onClose}
        title="Set up a new Group"
        body={
          studentsList.length > 0 ? (
            <div className="bg-white  h-auto  rounded-lg">
            <form id="quizModal">
              {isloading ? (
                <div className="text-center p-3 my-4 text-5xl">
                  <Loading />
                </div>
              ) : (
                <div className="">
                  <div className="w-[90%] m-auto mb-4">
                    <div className="my-1">
                      <div className="relative mt-2 rounded-md shadow-sm text-center flex">
                        <div className=" flex items-center pl-3 bg-authImage font-semibold w-[30%] text-center rounded-md">
                          <span className="text-black sm:text-sm  pl-4">
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
                  <div className="w-[90%] m-auto my-1 pb-8">
                    <div className="relative mt-2 rounded-md shadow-sm text-center flex">
                      <div className="flex items-center pl-3 bg-authImage font-semibold w-[30%] text-center rounded-md">
                        <span className="text-black sm:text-sm px-2">
                          List Students
                        </span>
                      </div>
        
                      <Select
                        isMulti={true}
                        onChange={(selected: any) => {
                          setStudents(selected);
                        }}
                        name="students"
                        classNamePrefix="select"
                        options={options}
                        className="basic-multi-select form-select p-0 block w-full rounded-md border-0 rounded-tl-none rounded-bl-none text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        
          ) : !getStudentsLoading? (
            <div className="text-center p-3 my-4 text-2xl">
            <span className="text-gray-500">
              not found students without groups
            </span>
          </div>
          ) : (
            <div className="text-center p-3 my-4 text-5xl">
              <Loading />
            </div>
        
          )
        }
      />
    </>
  );
}











