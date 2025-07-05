interface LabelInterface{
    word:string;
    value:string;
    class_Name?:string;
    textClassName?:string
}
export default function Label({word,value,class_Name,textClassName}:LabelInterface) {
  return <>
  <div className={`w-full border rounded-lg font-semibold grid grid-cols-2 ${class_Name} my-3`}>
    <div className="word bg-authImage py-1 ps-1">
        {word}
    </div>
    <div className={`value p-1 ms-1 ${textClassName}`}>
        {value}
    </div>
  </div>
  </>
}
