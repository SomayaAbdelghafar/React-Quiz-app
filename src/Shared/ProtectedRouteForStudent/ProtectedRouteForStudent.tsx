import { Navigate } from 'react-router-dom'
import { ProtectedProp } from '../ProtectedRoute/ProtectedRoute'
import { useEffect } from 'react'
import { setCompletedQuizzes } from '../../Redux/Slices/CompletedQuizzes/CompletedQuizzes'
import { fetchDataForSlice } from '../../ApiUtls/ApiUtls'
import { useDispatch } from 'react-redux'
import { setUpcomingQuizzes } from '../../Redux/Slices/UpcomingQuizzessSlice/UpcomingQuizzessSlice'

export default function ProtectedRouteForStudent({userData,children}:ProtectedProp) {

    const checkRole :boolean=userData?.profile?.role=="Student"
    const dispatch =useDispatch();
    if (userData?.accessToken&&checkRole) {
        const fetchUpcomingQuizzes=(response:any)=>{dispatch(setUpcomingQuizzes(response))}
        const fetchCompletedQuizzes=(response:any)=>{dispatch(setCompletedQuizzes(response))}
        useEffect(() => {
          fetchDataForSlice("quiz/incomming",fetchUpcomingQuizzes);
          fetchDataForSlice('quiz/completed',fetchCompletedQuizzes);
        }, [dispatch]);
      }

    if (userData?.accessToken ||checkRole) {
        return children
    }else{
        return <Navigate to="/login"/>
    }
}
