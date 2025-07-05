import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserData } from "../../Redux/Slices/AuthSlice/Interfaces";
import { useDispatch } from "react-redux";
import { setUpcomingQuizzes } from "../../Redux/Slices/UpcomingQuizzessSlice/UpcomingQuizzessSlice";
import { setCompletedQuizzes } from "../../Redux/Slices/CompletedQuizzes/CompletedQuizzes";
import { setGroup } from "../../Redux/Slices/GroupSlice/GroupSlice";
import { fetchDataForSlice } from "../../ApiUtls/ApiUtls";
import { setStudents } from "../../Redux/Slices/StudentsSlice/StudentsSlice";

export interface ProtectedProp{
    children:ReactNode;
    userData:UserData
  }

export default function ProtectedRoute({userData,children}:ProtectedProp) {
  const checkRole :boolean = userData?.profile?.role =="Student"

    const dispatch =useDispatch();

    if (userData?.accessToken&&!checkRole) {
      const fetchUpcomingQuizzes=(response:any)=>{dispatch(setUpcomingQuizzes(response))}
      const fetchCompletedQuizzes=(response:any)=>{dispatch(setCompletedQuizzes(response))}
      const fetchGroups=(response:any)=>{dispatch(setGroup(response))}
      const fetchStudents=(response:any)=>{dispatch(setStudents(response))}
      
      useEffect(() => {
        fetchDataForSlice("quiz/incomming",fetchUpcomingQuizzes);
        fetchDataForSlice('quiz/completed',fetchCompletedQuizzes);
        fetchDataForSlice('group',fetchGroups);
        fetchDataForSlice('student/top-five',fetchStudents);
      }, [dispatch]);
    }

    if (!userData?.accessToken || checkRole ) {
        return <Navigate to="/login"/>
    }else{
        return children
    }
}
