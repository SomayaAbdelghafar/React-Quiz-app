import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ErrorMessage from "../../Shared/ErrorMessage/ErrorMessage";
import Loading from "../../Shared/Loading/Loading";
import SharedModal from "../../Shared/Modal/Modal";

export default function AddQuestionModal({
  isOpen,
  onClose,
  getAllQuestions,
}: any) {
  const [isloading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { headers } = useSelector((state: any) => state.userData);

  const onSubmit = (data: any) => {
    setIsLoading(true);
    axios
      .post(`https://upskilling-egypt.com:3005/api/question`, data,headers)
      .then((response) => {
        toast.success(response?.data.message || "Successfully added");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Error adding");
      })
      .finally(() => {
        setIsLoading(false);
        onClose();
        getAllQuestions();
        setValue("title", "");
        setValue("description", "");
        setValue("options.A", "");
        setValue("options.B", "");
        setValue("options.C", "");
        setValue("options.D", "");
        setValue("answer", "");
        setValue("difficulty", "");
        setValue("type", "");
      });
  };

  return (
    <>
<SharedModal onClose={onClose}
show={isOpen}
omitHeader={true}

body={
            isloading? <div className=" text-5xl flex items-center justify-center"><Loading/></div>:          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="divide-x-2 px-4 flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100  dark:border-opacity-50">
              <h3
                className="text-md font-bold py-3 leading-normal text-black dark:text-neutral-200"
                id="exampleModalCenterTitle"
              >
                Set up a new question
              </h3>
              <div className="text-end font-bold text-xl  h-full divide-x-2">
                <button className="h-full border-r-2 py-3" type="submit">
                  <i className="fa-solid fa-check px-3 "></i>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-black py-3 h-full border-2 font-bold box-content pr-2 pl-4 rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                >
                  <i className="fa-solid fa-xmark font-bold"></i>
                </button>
              </div>
            </div>

            <div className="px-4">
              <div className="relative mt-3 flex  ">
                <label className=" left-0 flex  px-3 bg-authImage text-center rounded-l-3xl">
                  <span className="text-black text-md font-semibold pt-2 ">
                    Title
                  </span>
                </label>
                <input
                  {...register("title", {
                    required: "title is required",
                  })}
                  type="text"
                  className=" py-2 block w-full rounded-md px-1 border-1 border-zinc-400 rounded-r-3xl focus:border-zinc-500"
                />
                {errors.title && errors.title.type === "required" && (
                  <ErrorMessage> {String(errors?.title.message)}</ErrorMessage>
                )}
                <div className="absolute inset-y-0 right-0 flex items-center"></div>
              </div>

              <div className="relative mt-3 flex  ">
                <label className=" left-0 flex  px-3 bg-authImage text-center rounded-l-3xl">
                  <span className="text-black text-md font-semibold pt-2 ">
                    Description
                  </span>
                </label>
                <input
                  {...register("description", {required:"description us required"})}
                  type="text"
                  className=" py-2 block w-full rounded-md px-1 border-1 border-zinc-400 rounded-r-3xl focus:border-zinc-500"
                />
                {errors.description && errors.description.type === "required" && (
                  <ErrorMessage> {String(errors?.description.message)}</ErrorMessage>
                )}
                <div className="absolute inset-y-0 right-0 flex items-center"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <div className="relative mt-3 flex  ">
                  <label className=" left-0 flex  px-3 bg-authImage text-center rounded-l-3xl">
                    <span className="text-black text-md font-semibold pt-2 ">A</span>
                  </label>
                  <input
                    {...register("options[A]", {
                      required: "option is required",
                    })}
                    type="text"
                    className=" py-2 block w-full rounded-md px-1 border-1 border-zinc-400 rounded-r-3xl focus:border-zinc-500"
                  />
                  {/* {errors?.A && (
                    <ErrorMessage>
                      {String(errors?.A.message)}
                    </ErrorMessage>
                  )} */}
                  <div className="absolute inset-y-0 right-0 flex items-center"></div>
                </div>
                <div className="relative mt-3 flex  ">
                  <label  className=" left-0 flex  px-3 bg-authImage text-center rounded-l-3xl">
                    <span className="text-black text-md font-semibold pt-2 ">B</span>
                  </label>
                  <input
                    {...register("options.B", {
                      required: "option is required",
                    })}
                    type="text"
                    className=" py-2 block w-full rounded-md px-1 border-1 border-zinc-400 rounded-r-3xl focus:border-zinc-500"
                  />
                  {errors?.options && errors.options.type === "required" && (
                    <ErrorMessage>
                      {" "}
                      {String(errors?.options.message)}
                    </ErrorMessage>
                  )}
                  <div className="absolute inset-y-0 right-0 flex items-center"></div>
                </div>
                <div className="relative mt-3 flex  ">
                  <label className=" left-0 flex  px-3 bg-authImage text-center rounded-l-3xl">
                    <span className="text-black text-md font-semibold pt-2 ">C</span>
                  </label>
                  <input
                    {...register("options.C", {
                      required: "option is required",
                    })}
                    type="text"
                    className=" py-2 block w-full rounded-md px-1 border-1 border-zinc-400 rounded-r-3xl focus:border-zinc-500"
                  />
                  {errors?.options && errors.options.type === "required" && (
                    <ErrorMessage>
                      {" "}
                      {String(errors?.options.message)}
                    </ErrorMessage>
                  )}
                  <div className="absolute inset-y-0 right-0 flex items-center"></div>
                </div>
                <div className="relative mt-3 flex  ">
                  <label className=" left-0 flex  px-3 bg-authImage text-center rounded-l-3xl">
                    <span  className="text-black text-md font-semibold pt-2 ">D</span>
                  </label>
                  <input
                    {...register("options.D", {
                      required: "option is required",
                    })}
                    type="text"
                    className=" py-2 block w-full rounded-md px-1 border-1 border-zinc-400 rounded-r-3xl focus:border-zinc-500"
                  />
                  {errors?.options && errors.options.type === "required" && (
                    <ErrorMessage>
                      {" "}
                      {String(errors?.options.message)}
                    </ErrorMessage>
                  )}
                  <div className="absolute inset-y-0 right-0 flex items-center"></div>
                </div>
                <div className="relative mt-3 flex  ">
                  <label className=" left-0 flex  px-3 bg-authImage text-center rounded-l-3xl">
                    <span  className="text-black text-md font-semibold py-1 ">
                      Right Answer
                    </span>
                  </label>

                  <select
                    {...register("answer", {
                      required: "answer isrequired",
                    })}
                     className=" py-2 block w-full rounded-md px-1 border-1 border-zinc-400 rounded-r-3xl focus:border-zinc-500"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                  {errors?.answer &&  (
                    <ErrorMessage>
                      {String(errors?.answer.message)}
                    </ErrorMessage>
                  )}
                </div>
                <div className="relative mt-3 flex  ">
                  <div className=" left-0 flex  px-3 bg-authImage text-center rounded-l-3xl">
                    <span className="text-black my-2 text-md font-semibold pt-2 ">
                      difficulty
                    </span>
                  </div>

                  <select
                    {...register("difficulty", {
                      required: "difficulty is required",
                    })}
                    className=" py-2 block w-full rounded-md px-1 border-1 border-zinc-400 rounded-r-3xl focus:border-zinc-500"
                  >
                    <option value="easy">easy </option>
                    <option value="medium">medium </option>
                    <option value="hard">hard</option>
                  </select>

                  {errors?.difficulty &&
                    <ErrorMessage>
                        {String(errors?.difficulty.message)}
                      </ErrorMessage>
                    }
                  <div className="absolute inset-y-0 right-0 flex items-center"></div>
                </div>
                <div className="relative my-3 flex  ">
                  <div className=" left-0 flex  px-3 bg-authImage text-center rounded-l-3xl">
                    <span className="text-black sm:text-sm p-2 ">type</span>
                  </div>

                  <select
                    {...register("type", {
                      required: "required",
                    })}
                    className=" py-2 block w-full rounded-md px-1 border-1 border-zinc-400 rounded-r-3xl focus:border-zinc-500"
                  >
                    <option value="FE">FE </option>
                    <option value="BE ">BE </option>
                    <option value="FS">FS</option>
                  </select>
                  {errors?.type && errors.type.type === "required" && (
                    <ErrorMessage> {String(errors?.type.message)}</ErrorMessage>
                  )}
                  <div className="absolute inset-y-0 right-0 flex items-center"></div>
                </div>
              </div>
            </div>
          </form>
}/>
    </>
  );
}
