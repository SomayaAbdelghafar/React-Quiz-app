import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUrl } from "../../ApiUtls/ApiUtls";
import { logOut } from "../../Redux/Slices/AuthSlice/AuthSlice";
import AuthButton from "../AuthButton/AuthButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";
import SharedModal from "../Modal/Modal";
export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { userData, headers } = useSelector((state: any) => state.userData);
  const { role } = userData.profile;
  const [modalState, setModalState] = useState("close");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const disptch = useDispatch();
  function handleToggle() {
    setIsCollapsed(!isCollapsed);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  function onSubmit(data: any) {
    setIsLoading(true);
    delete data.confirmNewPassword;
    changePassword(data);
  }
  const changePassword = (data: any) => {
    axios
      .post(`${baseUrl}/auth/change-password`, data, headers)
      .then((res) => {
        toast.success(res.data.message);
        disptch(logOut());
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="w-full">
        <Sidebar className="vh-100" collapsed={isCollapsed}>
          <Menu>
            <div className=" ">
              <div className="w-full text-center  py-3" onClick={handleToggle}>
                <i className="fa-solid fa-circle-check">
                  <i className="fa-solid fa-circle-xmark "></i>
                </i>
              </div>
              {role !== "Student" && (
                <MenuItem
                  className="border-b-2 my-2 py-2 hover:border-r-2 hover:border-r-black"
                  icon={<i className="fa-regular fa-envelope-open fa-xl text-black"></i>}
                  component={<Link to={"/dashboard"}></Link>}
                >
                  Dashboard
                </MenuItem>
              )}

              {role !== "Student" && (
                <MenuItem
                  className="border-b-2 my-2 py-2 hover:border-r-2 hover:border-r-black"
                  icon={<i className=" fa-solid fa-users fa-xl text-black"></i>}
                  component={<Link to="/dashboard/groups"></Link>}
                >
                  Groups
                </MenuItem>
              )}

              {role !== "Student" && (
                <MenuItem
                  className="border-b-2 my-2 py-2 hover:border-r-2 hover:border-r-black"
                  icon={<i className="fa-solid fa-graduation-cap text-black fa-xl"></i>}
                  component={<Link to="/dashboard/student"></Link>}
                >
                  Students
                </MenuItem>
              )}

              <MenuItem
                className="border-b-2 my-2 py-2 hover:border-r-2 hover:border-r-black"
                icon={<i className="fa-solid fa-chalkboard-user fa-xl text-black"></i>}
                component={
                  <Link
                    to={role == "Student" ? "/student" : "/dashboard/quizzes"}
                  ></Link>
                }
              >
                Quizzes
              </MenuItem>

              <MenuItem
                className="border-b-2 my-2 py-2 hover:border-r-2 hover:border-r-black"
                icon={<i className="fa-solid fa-file-circle-check fa-xl text-black"></i>}
                component={
                  <Link
                    to={
                      role == "Student"
                        ? "/student/results"
                        : "/dashboard/results"
                    }
                  ></Link>
                }
              >
                Results
              </MenuItem>

              <MenuItem
                className="border-b-2 my-2 py-2 hover:border-r-2 hover:border-r-black"
                icon={<i className="fa-solid fa-lock text-black"></i>}
                onClick={() => {
                  setModalState("change-password");
                }}
              >
                Change Password
              </MenuItem>
            </div>
            <MenuItem className="border-b-2 my-2 py-1 hover:border-r-2 hover:border-r-black ml-auto">
              <i className="fa-solid fa-circle-question fa-xl pr-2 "></i>
              Help
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>

      <SharedModal
        show={modalState == "change-password"}
        onClose={() => {
          setModalState("close");
        }}
        title="Change password"
        omitHeader={false}
        body={
          !isLoading ? (
            <form onSubmit={handleSubmit(onSubmit)} className="bg- px-3">
              <div className="password">
                <div
                  className={`flex rounded-md border-2 ${
                    !errors.password ? "border-dark" : "border-red-500"
                  }`}
                >
                  <span className="flex select-none items-center me-3 pl-3 text-dark ">
                    <i className="fa-solid fa-key"></i>
                  </span>
                  <input
                    {...register("password", {
                      required: "field is required",
                      minLength: {
                        value: 8,
                        message: "Password should be at least 8 characters",
                      },
                    })}
                    type="password"
                    id="password"
                    className="block px-2  flex-1 border-0  bg-transparent py-1.5 pl-1 text-dark placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Type your password"
                  />
                  {errors.password && (
                    <ErrorMessage>
                      {String(errors.password.message)}
                    </ErrorMessage>
                  )}
                </div>
              </div>

              <div className="new-Password mt-2">
                <div
                  className={`flex rounded-md border-2 ${
                    !errors.password_new ? "border-dark" : "border-red-500"
                  }`}
                >
                  <span className="flex select-none items-center me-3 pl-3 text-dark ">
                    <i className="fa-solid fa-key"></i>
                  </span>
                  <input
                    {...register("password_new", {
                      required: "new password is required",
                      minLength: {
                        value: 8,
                        message: "new password should be greater than 8 digits",
                      },
                    })}
                    type="password"
                    id="Confirm-Password"
                    className="block px-2  flex-1 border-0  bg-transparent py-1.5 pl-1 text-dark placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter new password"
                  />
                  {errors.password_new && (
                    <ErrorMessage>
                      {String(errors.password_new.message)}
                    </ErrorMessage>
                  )}
                </div>
              </div>

              <div className="Confirm-Password mt-2">
                <div
                  className={`flex rounded-md border-2 ${
                    !errors.confirmNewPassword
                      ? "border-dark"
                      : "border-red-500"
                  }`}
                >
                  <span className="flex select-none items-center me-3 pl-3 text-dark ">
                    <i className="fa-solid fa-key"></i>
                  </span>
                  <input
                    {...register("confirmNewPassword", {
                      validate: (value: any) =>
                        value === getValues("password_new") ||
                        "passwords is mismatch",
                    })}
                    type="password"
                    id="Confirm-Password"
                    className="block px-2  flex-1 border-0  bg-transparent py-1.5 pl-1 text-dark placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Type your confirm password"
                  />
                  {errors.confirmNewPassword && (
                    <ErrorMessage>
                      {String(errors.confirmNewPassword.message)}
                    </ErrorMessage>
                  )}
                </div>
              </div>

              <div className="text-end mt-2">
                <AuthButton>Change</AuthButton>
              </div>
            </form>
          ) : (
            <div className="text-5xl flex items-center justify-center py-5">
              <Loading />
            </div>
          )
        }
      />
    </>
  );
}
