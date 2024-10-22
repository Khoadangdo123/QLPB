import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import ModalWrapper from "../ModalWrapper";
import { useEffect } from "react";
import { fetchTaskHistories, fetchTaskHistoryById } from "../../redux/taskhistory/taskhistorySlice";

const TaskHistory=({openTaskHistory,setOpenTaskHistory,maCongViec})=>{
    const dispatch=useDispatch()
    // const lichsucongviec=useSelector(
    //     (state)=>state.taskhistories.list.find((lichsu) => lichsu.maCongViec === maCongViec))
    const lichsucongviec=useSelector((state)=>state.taskhistories.list)
    useEffect(()=>{
        const loadData = async () => {
            //await dispatch(fetchTaskHistoryById(maCongViec))
            await dispatch(fetchTaskHistories({search:"",page:1}))
        }
        loadData()
    },[dispatch,maCongViec])
    console.log(maCongViec)
    const lichsu=lichsucongviec.filter((item)=>item.maCongViec===maCongViec)
    console.log(lichsu)
    return (
        <>
          <ModalWrapper open={openTaskHistory} setOpen={setOpenTaskHistory}>
          <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
          <Button
                  label='Gửi'
                  type='submit'
                  className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                />

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpenTaskHistory(false)}
                label='Hủy'
              />
            </div>
          </ModalWrapper> 
        </>
      );
}
export default TaskHistory;