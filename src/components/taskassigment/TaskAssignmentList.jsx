import { useEffect, useState } from "react";
import { BiCalendar, BiCheck, BiPlus } from "react-icons/bi";
import clsx from "clsx";
import EmployeeInfo from "../EmployeeInfo";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchByIdTask } from "../../redux/task/taskSlice";
import DetailTask from "../task/DetailTask";
import { BGS, formatDate } from "../../utils";
import { updateAssignment } from "../../redux/assignment/assignmentSlice";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
const TaskAssignmentList = ({congviec}) => { 
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [completed, setCompleted] = useState(congviec.trangThaiCongViec);
    const [connection, setConnection] = useState(null);
    const dispatch=useDispatch();
    const maCongViec=congviec.maCongViec
    const vaiTro=congviec.vaiTro
    const maPhanCong=congviec.maPhanCong
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
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7131/hub")
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();
        setConnection(newConnection);
    }, []);
    useEffect(() => {
        const startConnection = async () => {
            if (connection && connection.state === "Disconnected") {
                try {
                    await connection.start();
                    console.log("Connection started");
                    connection.on("loadPhanCong",async () => {
                        setLoading(true);
                        await dispatch(fetchByIdTask(maCongViec));
                        setLoading(false);
                        console.log('Mai Văn Tài')
                    });
                    //
                    connection.on("loadCongViec",async () => {
                        setLoading(true);
                        await dispatch(fetchByIdTask(maCongViec));
                        setLoading(false);
                        console.log('Mai Văn Tài')
                    });
                    //
                    connection.on("task",async (message)=>{
                        console.log("task")
                        alert(message)
                    })
                } catch (err) {
                    console.error("Error while starting connection: ", err);
                }
            }
        };
    
        if (connection) {
            startConnection();
        }
    
        return () => {
            if (connection) {
                connection.off("loadCongViec");
            }
        };
    }, [connection, dispatch, maCongViec]);
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px',
            }}>
                <div style={{
                    border: '4px solid rgba(0, 0, 0, 0.1)',
                    borderLeftColor: '#3b82f6',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    animation: 'spin 1s linear infinite'
                }} />
            </div>
        );
    }
    if (!phancong) {
        return <p>not found</p>
    }
    
    const handleToggleDetail = () => {
        setExpanded(!expanded);
    };
    const handleCheckboxChange = async (event) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn đánh dấu công việc đã hoàn thành?");
        if (isConfirmed) {
            const checked=event.target.checked
            setCompleted(checked);
            let PhanCong={
                maCongViec:maCongViec,
                maNhanVien:Number(localStorage.getItem("userId")),
                vaiTro:vaiTro,
                trangThaiCongViec:checked
            }
            try{
                await dispatch(updateAssignment({id:maPhanCong,assignment:PhanCong}))
                console.log("Updateeeeee")
                //await dispatch(fetchByIdTask(maCongViec))
            }catch(e){
                console.error("Error updating assignment:", error);
                alert('Có lỗi xảy ra trong quá trình cập nhật.');
            }
        } else {
            event.target.checked = !event.target.checked;
        }
    };
    const chiuTrachNhiem = phancong?.phanCongs?.filter(m => m.vaiTro === "Người Chịu Trách Nhiệm");
    const thucHien = phancong?.phanCongs?.filter(m => m.vaiTro === "Người Thực Hiện");
    return (
        <div className="w-full flex items-center  px-4">
          <div className="w-full flex py-2 border-b text-sm" >
          <div className="flex-1 w-2/12 px-4 truncate text-left cursor-pointer" onClick={handleToggleDetail}>
    <span className="line-clamp-2">{phancong.tenCongViec || "N/A"}</span>
</div>            <div className="flex-1 w-2/12 px-4 text-left">
              <span>{phancong.moTa}</span>
            </div>
            <div className="flex-1 w-1/12 px-4 text-center">
              <span>{phancong.mucDoUuTien}</span>
            </div>
            <div className="flex-1 w-1/12 px-4 text-center">
            {phancong.thoiGianBatDau ? (
                  formatDate(new Date(phancong.thoiGianBatDau))
                ) : (
                  <div className="p-1 w-fit border-2 border-dashed rounded-full border-gray-400">
                    <BiCalendar size={20} />
                  </div>
                )}
            </div>
            <div className="flex-1 w-1/12 px-4 text-center">
            {phancong.thoiGianKetThuc ? (
                  formatDate(new Date(phancong.thoiGianKetThuc))
                ) : (
                  <div className="p-1 w-fit border-2 border-dashed rounded-full border-gray-400">
                    <BiCalendar size={20} />
                  </div>
                )}
            </div>
            <div className="flex-1 w-2/12 px-4 flex items-center justify-center">
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
            <div className="flex-1 w-2/12 px-4 flex items-center justify-center">
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
            
            <div className="flex-1 w-1/12 px-4 text-center">
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
