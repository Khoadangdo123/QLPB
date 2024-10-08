import { useEffect, useState } from "react";
import { BiCalendar, BiCheck, BiPlus } from "react-icons/bi";
import clsx from "clsx";
import EmployeeInfo from "../EmployeeInfo";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchByIdTask } from "../../redux/task/taskSlice";
import DetailTask from "../task/DetailTask";
import { BGS, formatDate } from "../../utils";
const TaskAssignmentList = ({congviec}) => { 
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [completed, setCompleted] = useState(congviec.trangThaiCongViec);
    const dispatch=useDispatch();
    const maCongViec=congviec.maCongViec
    console.log(congviec)
    const phancong=useSelector((state) =>
        state.tasks.list.find((task) => task.maCongViec === maCongViec)
    );
    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            try {
                await dispatch(fetchByIdTask(maCongViec));
            } catch (error) {
                console.error("Error fetching task:", error);
            } finally {
                setLoading(false);
            }
        };

        if (maCongViec) {
            fetchData();
        }
    },[maCongViec,dispatch])

    if (loading) {
        return <p>Loading...</p>;
    }
    const handleToggleDetail = () => {
        setExpanded(!expanded);
    };
    console.log(phancong)
    const handleCheckboxChange = async (event) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn đánh dấu công việc đã hoàn thành?");
        if (isConfirmed) {
            setCompleted(event.target.checked);
            console.log(completed)
        } else {
            event.target.checked = !event.target.checked;
        }
    };
    const chiuTrachNhiem = phancong?.phanCongs?.filter(m => m.vaiTro === "Người Chịu Trách Nhiệm");
    const thucHien = phancong?.phanCongs?.filter(m => m.vaiTro === "Người Thực Hiện");
    return (
        <div className="w-full flex items-center  px-4">
          <div className="w-full flex py-2 border-b text-sm" >
            <div className="flex-1 w-1/4 px-4 truncate cursor-pointer"  onClick={handleToggleDetail} >{phancong.maCongViecCha ? (
                <span className="text-gray-500">🔹 {phancong.tenCongViec}</span>
              ) : (
                <span>{phancong.tenCongViec}</span>
              )}</div>
               <div className="flex-1 w-1/5 px-4 ">
              <span>{phancong.moTa}</span>
            </div>
            <div className="flex-1 w-1/5 px-4 ">
              <span>{phancong.mucDoUuTien}</span>
            </div>
            <div className="flex-1 px-4 text-gray-400 flex items-center">
            {phancong.thoiGianBatDau ? (
                  formatDate(new Date(phancong.thoiGianBatDau))
                ) : (
                  <div className="p-1 w-fit border-2 border-dashed rounded-full border-gray-400">
                    <BiCalendar size={20} />
                  </div>
                )}
            </div>
            <div className="flex-1 px-4 text-gray-400 flex items-center">
            {phancong.thoiGianKetThuc ? (
                  formatDate(new Date(phancong.thoiGianKetThuc))
                ) : (
                  <div className="p-1 w-fit border-2 border-dashed rounded-full border-gray-400">
                    <BiCalendar size={20} />
                  </div>
                )}
            </div>
            <div className="flex-1 px-4 flex items-center">
              {chiuTrachNhiem?.map((m, index) => (
                
                <div
                  key={index}
                  className={clsx(
                    "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                    BGS[index % BGS?.length]
                  )}
                >
                {/* <UserInfo user={m} /> */}
                <EmployeeInfo employee={m}/>
                </div>
              ))}
            </div>
            <div className="flex-1 px-4 flex items-center">
              {thucHien?.map((m, index) => (
                <div
                  key={index}
                  className={clsx(
                    "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                    BGS[index % BGS?.length]
                  )}
                >
                {/* <UserInfo user={m} /> */}
                <EmployeeInfo employee={m}/>
                </div>
              ))}
            </div>
            <div className="flex-1 px-4 ">
              {/* <Selection items={stages} selectedItem={phancong.trangThaiCongViec}/> */}
            </div>
            <div className="flex-1 px-4 ">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={handleCheckboxChange}
                        className="w-6 h-6"
                    />
                </div>
          </div>
          {expanded && (
            <DetailTask
              expanded={expanded} 
              setExpanded={setExpanded} 
              task={phancong} 
              titleTask={phancong.tenCongViec}
              date={formatDate(new Date(phancong.thoiGianKetThuc))}
              roleTeam={chiuTrachNhiem}
              userTeam={thucHien}
            />
          )}
        </div>
      );
};

export default TaskAssignmentList;
