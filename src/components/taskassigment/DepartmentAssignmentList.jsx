import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchByIdDepartment} from "../../redux/workdepartment/workdepartmentSlice";

const DepartmentAssignmentList=({phongban})=>{
    // console.log(phongban)
    // if (!phongban || !phongban.maPhongBan) {
    //     return <p>Department not found or no valid department data</p>;
    // }
    // const maPhongBan=phongban.maPhongBan;
    // const [loading, setLoading] = useState(true);
    // const dispatch=useDispatch();
    // const congViecPhongBans=useSelector((state)=>state.workdepartments)
    // useEffect(() => {
    //     const loadData = async () => {
    //         setLoading(true);
    //         await dispatch(fetchByIdDepartment(maPhongBan));
    //         setLoading(false);
    //     };
    //     loadData();
    // }, [maPhongBan, dispatch]);
    // if (loading) {
    //     return (
    //         <div className="flex justify-center items-center h-24">
    //             <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    //         </div>
    //     );
    // }
    // if (!maPhongBan) {
    //     return <p>not found</p>
    // }
    return(
        // <DepartmentAssignmentList congviec={1}></DepartmentAssignmentList>
        <h1>{ }</h1>
    )
}
export default DepartmentAssignmentList;