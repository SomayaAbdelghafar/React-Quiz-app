import Label from '../../../Shared/Label/Label'

export interface StudentDataModalProp{
  studentInfo:{
    email:string,
    last_name:string,
    first_name:string,
    group:{
      name:string
    },
    _id?:string;
avg_score?:string;

  }
}


export default function StudentDataModal({studentInfo}:StudentDataModalProp) {
  return (
   <>

        <div className="px-4">
          <Label
            word="FirstName"
            class_Name="w-[70%] m-auto"
            value={studentInfo.first_name}
          />
          <Label
            word="lastName"
            class_Name="w-[70%] m-auto"
            value={studentInfo.last_name}
          />
          <Label
            word="Email"
            class_Name="w-[70%] m-auto"
            value={studentInfo.email}
          />
          <Label
            word="Group-Name"
            class_Name="w-[70%] m-auto"
            value={studentInfo.group?.name||"Student is without group"}
          />
        </div>
      
   </>
  )
}
