import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from '../../ApiUtls/ApiUtls';
import Loading from "../../Shared/Loading/Loading";
import SharedModal from "../../Shared/Modal/Modal";

interface DeleteGroupProps {
  getGroups: () => void; 
  isOpen: boolean;
  onClose: () => void;
  id: any;
}

export default function DeleteGroup({getGroups,isOpen,onClose,id}:DeleteGroupProps) {
    const { headers } = useSelector((state: any) => state.userData)
  const [isloading, setIsLoading] = useState(false);

const deleteGroup =()=>{

  setIsLoading(true);
  axios
  .delete(`${baseUrl}/group/${id} `, headers)
  .then((response) => {
   
    toast.success(response?.data.message || " deleted Successfully");
  })
  .catch((error)=>{
    toast.error(error?.data.message || " error deleting item");
  })
 
  .finally(() => {
    setIsLoading(false);
      onClose()
      getGroups()
  });
}


  return (
    <>
<SharedModal
show={isOpen}
onClose={onClose}
onSave={deleteGroup}
title="Delete Group"
body={<>
          {isloading?<div className="text-center p-3 my-4 text-5xl"><Loading /></div> : <p className="py-5 px-8 text-lg font-bold">
            Are you sure you want to delete this group?
    </p>}</>}
/>
    </>
  );
}