import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailTask from "../task/DetailTask";

const DepartmentAssignmentItem=({congviec})=>{
    const [expanded, setExpanded] = useState(false);
    const dispatch=useDispatch()
    return(
        <h1>Hello</h1>
    )
    //const congviecs=useSelector((state)=>)
//     return(
//         <div className="w-full flex items-center  px-4">
//         <div className="w-full flex py-2 border-b text-sm" >
//         <div className="flex-1 w-2/12 px-4 truncate text-left cursor-pointer" onClick={handleToggleDetail}>
//   <span className="line-clamp-2">{phancong.tenCongViec || "N/A"}</span>
// </div>            <div className="flex-1 w-2/12 px-4 text-left">
//             <span>{phancong.moTa}</span>
//           </div>
//           <div className="flex-1 w-1/12 px-4 text-center">
//             <span>{phancong.mucDoUuTien}</span>
//           </div>
//           <div className="flex-1 w-1/12 px-4 text-center">
//           {phancong.thoiGianBatDau ? (
//                 formatDate(new Date(phancong.thoiGianBatDau))
//               ) : (
//                 <div className="p-1 w-fit border-2 border-dashed rounded-full border-gray-400">
//                   <BiCalendar size={20} />
//                 </div>
//               )}
//           </div>
//           <div className="flex-1 w-1/12 px-4 text-center">
//           {phancong.thoiGianKetThuc ? (
//                 formatDate(new Date(phancong.thoiGianKetThuc))
//               ) : (
//                 <div className="p-1 w-fit border-2 border-dashed rounded-full border-gray-400">
//                   <BiCalendar size={20} />
//                 </div>
//               )}
//           </div>
//           <div className="flex-1 w-2/12 px-4 flex items-center justify-center">
//             {chiuTrachNhiem?.map((m, index) => (
              
//               <div
//                 key={index}
//                 className={clsx(
//                   "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
//                   BGS[index % BGS?.length]
//                 )}
//               >
//               {/* <UserInfo user={m} /> */}
//               <EmployeeInfo employee={m}/>
//               </div>
//             ))}
//           </div>
//           <div className="flex-1 w-2/12 px-4 flex items-center justify-center">
//             {thucHien?.map((m, index) => (
//               <div
//                 key={index}
//                 className={clsx(
//                   "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
//                   BGS[index % BGS?.length]
//                 )}
//               >
//               {/* <UserInfo user={m} /> */}
//               <EmployeeInfo employee={m}/>
//               </div>
//             ))}
//           </div>
          
//           <div className="flex-1 w-1/12 px-4 text-center">
//                   <input
//                       type="checkbox"
//                       checked={completed}
//                       onChange={handleCheckboxChange}
//                       className="w-6 h-6"
//                   />
//               </div>
//         </div>
//         {expanded && (
//           <DetailTask
//             expanded={expanded} 
//             setExpanded={setExpanded} 
//             task={phancong} 
//             titleTask={phancong.tenCongViec}
//             date={formatDate(new Date(phancong.thoiGianKetThuc))}
//             roleTeam={chiuTrachNhiem}
//             userTeam={thucHien}
//           />
//         )}
//       </div>
//     )
};

export default DepartmentAssignmentItem;