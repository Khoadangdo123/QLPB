import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignments, fetchEmployeeAssignment } from "../redux/assignment/assignmentSlice";
import TaskAssignmentList from "../components/taskassigment/TaskAssignmentList";

const TaskAssignment=()=>{
    const dispatch=useDispatch();
    const maNhanVien=2;
    const phancongs=useSelector((state)=>state.assignments)
    useEffect(()=>{
        dispatch(fetchEmployeeAssignment(maNhanVien))
    },[maNhanVien,dispatch])
    return(
        <div className="w-full bg-transparent">
        <div className="text-lg bg-transparent">
            <div className="w-full flex border-y-2 py-2 px-4 font-bold -mb-2 bg-white shadow-sm text-sm">
                <div className="flex-1 w-2/12 px-4 ">Công Việc</div>
                <div className="flex-1 w-2/12 border-l px-4 ">Mô Tả</div>
                <div className="flex-1 w-1/12 border-l px-4 ">Mức Độ Ưu Tiên</div>
                <div className="flex-1 w-1/12 border-l px-4 ">Bắt Đầu</div>
                <div className="flex-1 w-1/12 border-l px-4 ">Kết Thúc</div>
                <div className="flex-1 w-2/12 border-l px-4 ">Chịu Trách Nhiệm</div>
                <div className="flex-1 w-2/12 border-l px-4 ">Nhóm</div>
                <div className="flex-1 w-1/12 border-l px-4 ">Trình Trạng</div>
            </div>
            <div className="w-full bg-transparent border-b-1">
                <div className="p-4 w-full flex items-center justify-between font-semibold bg-white text-gray-600 mb-2 mt-4 shadow-sm border-y text-sm"></div>
                <div className="bg-slate-50 shadow-md">
                    {phancongs.list.map((item, index) => (
                        <TaskAssignmentList congviec={item} key={index} />
                    ))}
                </div>
            </div>
        </div>
    </div>
    )
}
export default TaskAssignment;