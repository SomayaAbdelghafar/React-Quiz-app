import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "../../../ApiUtls/ApiUtls";
import ErrorMessage from "../../../Shared/ErrorMessage/ErrorMessage";
import Loading from "../../../Shared/Loading/Loading";
import { quiz } from "../SpacificQuiz/SpacificQuiz";
interface Group {
  students: [string];
  status: string;
  name: string;
  max_students: string;
  instructor: string;
  _id: string;
}
interface QuizModalProp {
  quiz?:quiz;
  handleClose?: () => void;
  setModalState: React.Dispatch<React.SetStateAction<string>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}
interface formData {
  title?: string;
  description?: string;
  group?: string;
  questions_number?: number;
  difficulty?: string;
  type?: string;
  date?: string;
  time?: string;
  duration?: string;
  schadule?: string;
  score_per_question?: string;
  __v?:string,
  updatedAt?:string,
  status?:string,
  questions?:string,
  instructor?:string,
  createdAt?:string,
  code?:string,
  _id?:string,
}
export default function QuizModal({ setModalState ,setCode,quiz}: QuizModalProp) {
  let {groups} = useSelector((state: any) => state.groups);
  const { headers } = useSelector((state: any) => state.userData);
  const [isLoading, setIsLoading] = useState(false);

  const durationAndQuestionNumber: number[] = [
    1,5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
  ];
  const difficulty: string[] = ["easy", "medium", "hard"];
  const score_per_question: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const category: string[] = [
    "FE",
    "BE",
    "Mobile application",
    "Flutter",
    "AI",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },setValue
  } = useForm();
  
  useEffect(() => {
    if (quiz) {
      for (const key in quiz) {
        if (quiz.hasOwnProperty(key)) {
          setValue(key, quiz[key]);
        }
      }
    }
  }, []);

  const addQuiz = (data: formData) => {
    data.schadule = `${data.date}T${data.time}`;
    delete data.time;
    delete data.date;
    postData(data);
  };
  const postData = (data: formData) => {
    setIsLoading(true);
    axios
      .post(`${baseUrl}/quiz`, data, headers)
      .then((res) => {
        toast.success(res.data.message);
        setCode(res.data.data.code);
        setModalState("quiz-code");
      })
      .catch((err) => {
        toast.error(String(err.response.data.message));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  const updateQuiz=(data:formData)=>{
    setIsLoading(true);
    delete data._id
    delete data.__v
    delete data.updatedAt
    delete data.time
    delete data.status
    delete data.questions
    delete data.instructor
    delete data.date
    delete data.createdAt
    delete data.code
    delete data.questions_number
    delete data.score_per_question
    delete data.difficulty
    delete data.type

    updateData(data)
    // console.log(data);
  }
  const updateData = (data: formData) => {
    axios
      .put(`${baseUrl}/quiz/${quiz?._id}`, data, headers)
      .then((res) => {
        console.log(res);
        
        toast.success(res.data.message);
        setCode(res.data.data.code);
        setModalState("quiz-code");
      })
      .catch((err) => {
        toast.error(String(err.response.data.message));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {!isLoading ? (
        groups ? (
          <form
            onSubmit={!quiz?handleSubmit(addQuiz):handleSubmit(updateQuiz)}
            id="quizModal"
            className="px-6"
          >
            <h3 className="font-semibold text-lg">Details</h3>
            <div className="title mt-2 flex rounded-xl">
              <label
                htmlFor="title"
                className="bg-authImage px-4 py-1 font-semibold rounded-l-xl"
              >
                Title:
              </label>
              <input
                {...register("title", { required: "title is required" })}
                id="title"
                className="w-full border-2 px-1 rounded-r-xl"
                type="text"
              />
              {errors.title ? (
                <ErrorMessage>{String(errors.title?.message)}</ErrorMessage>
              ) : (
                ""
              )}
            </div>

            <div className="details grid grid-cols-2 lg:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 justify-between">
              <div className="mt-3 mr-2 flex rounded-xl">
                <label
                  htmlFor="durationAndQuestionNumber"
                  className="bg-authImage px-4 py-1 font-semibold rounded-l-xl"
                >
                  Duration
                  <span className="font-normal text-sm">(in minutes)</span>
                </label>
                <select
                  {...register("duration", {
                    required: "duration is required",
                  })}
                  className="border-2 font-bold px-3 rounded-r-xl focus:border-gray-300"
                  id="durationAndQuestionNumber"
                >
                  {durationAndQuestionNumber.map((i, idx) => (
                    <option key={idx} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
                {errors.duration ? (
                  <ErrorMessage>
                    {String(errors.duration?.message)}
                  </ErrorMessage>
                ) : (
                  ""
                )}
              </div>

              <div className="mt-3 mr-2 flex rounded-xl">
                <label
                  htmlFor="durationAndQuestionNumber"
                  className="bg-authImage px-4 py-1 font-semibold rounded-l-xl"
                >
                  No. of questions
                </label>
                <select
                  {...register("questions_number", {
                    required: "questions_number is required",valueAsNumber:true
                  })}
                  className="border-2 font-bold px-3 rounded-r-xl focus:border-gray-300"
                  id="questions_numberAndQuestionNumber"
                >
                  {durationAndQuestionNumber.map((i, idx) => (
                    <option key={idx} value={Number(i)}>
                      {i}
                    </option>
                  ))}
                </select>
                {errors.questions_number ? (
                  <ErrorMessage>
                    {String(errors.questions_number?.message)}
                  </ErrorMessage>
                ) : (
                  ""
                )}
              </div>

              <div className="mt-3  flex rounded-xl">
                <label
                  htmlFor="score_per_question"
                  className="bg-authImage px-4 py-1 font-semibold rounded-l-xl"
                >
                  Score per question
                </label>
                <select
                  {...register("score_per_question", {
                    required: "score_per_question is required",
                  })}
                  className="border-2 font-bold px-3 rounded-r-xl focus:border-gray-300"
                  id="score_per_question"
                >
                  {score_per_question.map((i, idx) => (
                    <option key={idx} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
                {errors.score_per_question ? (
                  <ErrorMessage>
                    {String(errors.score_per_question?.message)}
                  </ErrorMessage>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="description mt-3 flex items-center rounded-xl">
              <label
                htmlFor="description"
                className="bg-authImage px-4 py-3 font-semibold rounded-l-xl"
              >
                Description:
              </label>
              <textarea
                {...register("description", {
                  required: "description is required",
                })}
                aria-colspan={30}
                aria-rowspan={2}
                className="w-full resize-none border-2 px-1 rounded-r-xl"
                id="description"
              />
              {errors.description ? (
                <ErrorMessage>
                  {String(errors.description?.message)}
                </ErrorMessage>
              ) : (
                ""
              )}
            </div>

            <div className="schedule mt-3 flex rounded-xl">
              <label
                htmlFor="schedule"
                className="bg-authImage px-4 py-1 font-semibold rounded-l-xl"
              >
                Schedule:
              </label>
              <input
                {...register("date", { required: "schadule is required" })}
                id="schedule"
                type="Date"
                placeholder="DD/MM/YY"
                className="border-y-2 px-1 border-gray-300 font-semibold"
              />
              <input
                {...register("time", { required: "schadule is required" })}
                id="schedule"
                type="time"
                className="border-y-2 border-gray-300 border-r-2 rounded-r-xl px-1 font-semibold"
              />
              {errors.time || errors.date ? (
                <ErrorMessage>
                  {String(errors.date?.message || errors.time?.message)}
                </ErrorMessage>
              ) : (
                ""
              )}
            </div>

            <div className="selects pb-12 pt-2">
              <div className="details grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 xl:grid-cols-3 ">
                <div className="mt-3 mr-2 flex rounded-xl">
                  <label
                    htmlFor="difficulty"
                    className="bg-authImage px-4 py-1 font-semibold rounded-l-xl"
                  >
                    Difficulty level
                  </label>
                  <select
                    {...register("difficulty", {
                      required: "difficulty is required",
                    })}
                    className="border-2 font-bold px-3 rounded-r-xl focus:border-gray-300"
                    id="difficulty"
                  >
                    {difficulty.map((i, idx) => (
                      <option key={idx} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                  {errors.difficulty ? (
                    <ErrorMessage>
                      {String(errors.difficulty?.message)}
                    </ErrorMessage>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-3  mr-2 flex rounded-xl">
                  <label
                    htmlFor="category"
                    className="bg-authImage px-4 py-1 font-semibold rounded-l-xl"
                  >
                    Category type
                  </label>
                  <select
                    {...register("type", { required: "category is required" })}
                    className="border-2 font-bold px-3 rounded-r-xl focus:border-gray-300"
                    id="category"
                  >
                    {category.map((i, idx) => (
                      <option key={idx} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                  {errors.type ? (
                    <ErrorMessage>{String(errors.type?.message)}</ErrorMessage>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-3  flex rounded-xl">
                  <label
                    htmlFor="group"
                    className="bg-authImage px-4 py-1 font-semibold rounded-l-xl"
                  >
                    Group name
                  </label>
                  <select
                    {...register("group", { required: "group is required" })}
                    className="border-2 font-bold px-3 rounded-r-xl focus:border-gray-300"
                    id="group"
                  >
                    {groups
                      ? groups.map((group:Group, idx:number) => (
                          <option key={idx} value={String(group?._id)}>
                            {group?.name}
                          </option>
                        ))
                      : ""}
                  </select>
                  {errors.group ? (
                    <ErrorMessage>{String(errors.group?.message)}</ErrorMessage>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-6xl text-gray-500 flex items-center justify-center h-[40vh]">
            <Loading />
          </div>
        )
      ) : (
        <div className="text-6xl text-gray-500 flex items-center justify-center h-[40vh]">
          <Loading />
        </div>
      )}
    </>
  );
}
