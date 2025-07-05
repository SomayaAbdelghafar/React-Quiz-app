import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { baseUrl } from '../../../ApiUtls/ApiUtls';
import Input from '../../../Shared/Input/Input';
import Loading from '../../../Shared/Loading/Loading';
interface AddStudentInterface{
    selectedStudentId:React.Dispatch<React.SetStateAction<any>>;
    isLoading:boolean
}

export default function AddStudentToGroup({selectedStudentId,isLoading}:AddStudentInterface) {

    
    const [studentswithOutGroup, setStudentswithOutGroup] = useState(new Array());
    const [filteredNames, setFilteredNames] = useState<string[]>([]);
    const [nameInput, setNameInput] = useState('');
    const { headers } = useSelector((state: any) => state.userData);

    const getStudentsWithoutGroup=()=>{
        axios.get(`${baseUrl}/student/without-group`,headers).then((response)=>{
          setStudentswithOutGroup(response.data);
          toast.success(response.data.message)
        }).catch((error)=>{
          toast.error(error.response.data)
        })
       
      };
      
      const handleInputChange = (e:any) => {
        const inputValue = e.target.value;
        setNameInput(inputValue);
        const filtered = studentswithOutGroup.filter(student => {
            const fullName =` ${student.first_name} ${student.last_name}`;
            return fullName.toLowerCase().includes(inputValue.toLowerCase());
        })[0]?._id
        selectedStudentId(filtered);
        console.log({filtered,studentswithOutGroup});
    };

      useEffect(() => {
        getStudentsWithoutGroup();
        console.log(filteredNames);
      }, [filteredNames]);
     
  return (
    <div className="w-[90%] m-auto">

    {isLoading?<div className='flex items-center justify-center text-5xl w-full h-14'>
      <Loading/> 
    </div>:    <div className="my-1">
      <div className="relative mt-2 rounded-md shadow-sm text-center">
         <Input title='name'
         handleChange={handleInputChange}
         value={nameInput} />
      </div>
    </div>}


  </div>
  )
}