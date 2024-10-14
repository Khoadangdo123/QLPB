import React, { useEffect, useRef, useState } from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";
import { addProject, fetchProjects } from "../redux/project/projectSlice";
import { HubConnectionBuilder,LogLevel } from '@microsoft/signalr';
import RolePermission from "../pages/Permission";
const Sidebar = () => {
  const dispatch=useDispatch();
  const [connection, setConnection] = useState(null);
  const { user } = useSelector((state) => state.authen);
  const duans=useSelector((state)=>state.projects.list)
  useEffect(()=>{
    dispatch(fetchProjects({ search: '', page: 20 }))
  },[dispatch])
  useEffect(()=>{
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7131/hub").withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);
  },[])
  useEffect(() => {
    if (connection && connection.state === "Disconnected") {
      connection.start()
        .then(() => {
          console.log("Connected!");
          connection.on("loadDuAn", () => {
            dispatch(fetchProjects({ search: '', page: 20 }))
          });
        })
        .catch((error) => console.error("Connection failed: ", error));
    }
  }, [connection,dispatch]);
  const taskSubMenu = duans.map((duan) => ({
    label: duan.tenDuAn,
    link: `/project/${duan.maDuAn}`,
    color: "bg-blue-500",
    key:duan.maDuAn
  }));
  const linkData = [
    {
      label: "Bảng Điều Khiển",
      link: "/dashboard",
      icon: <MdDashboard />,
    },
    {
      label: "Dự Án",
      //link: "/tasks",
      icon: <FaTasks />,
      subMenu: taskSubMenu,
    },
    {
      label: "Phân Quyền",
      link: "/permission",
      icon: <FaTasks />,
    },
    {
      label: "Milestones",
      link: "/milestones",
      icon: <FaTasks />,
    },
    {
      label: "Công Việc",
      link: "/taskassignment",
      icon: <FaTasks />,
    },
    // {
    //   label: "Đã Hoàn Thành",
    //   link: "/completed/completed",
    //   icon: <MdTaskAlt />,
    // },
    // {
    //   label: "Đang Thực Hiện",
    //   link: "/in-progress/in-progress",
    //   icon: <MdOutlinePendingActions />,
    // },
    // {
    //   label: "Cần Làm",
    //   link: "/todo/todo",
    //   icon: <MdOutlinePendingActions />,
    // },
    {
      label: "Công Việc Phòng Ban",
      link: "/assignmentdepartment",
      icon: <FaUsers />,
    },
    {
      label: "Nhóm",
      link: "/team",
      icon: <FaUsers />,
    },
    {
      label: "Phòng Ban",
      link: "/department",
      icon: <FaUsers />,
    },{
      label: "Nhân Viên",
      link: "/employee",
      icon: <FaUsers />,
    },
    {
      label: "Tài Khoản",
      link: "/account",
      icon: <FaUsers />,
    },
    {
      label: "Thùng Rác",
      link: "/trashed",
      icon: <FaTrashAlt />,
    },
  ];
  const location = useLocation();
  const currentPath = location.pathname;
  //const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);
  const sidebarLinks = linkData
  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };
  const [expandedSubMenu, setExpandedSubMenu] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState(""); // State to track error
  useEffect(() => {
    if (isModalOpen) {
      const input = document.querySelector("input");
      input?.focus();
    }
  }, [isModalOpen]);
  const handleProjectSubmit =async (e) => {
    e.preventDefault();

    // Kiểm tra độ dài chuỗi
    if (projectName.length < 3) {
      setError("Tên dự án phải có ít nhất 3 ký tự!"); 
      return;
    }

    if (projectName.length === 0) {
      setError("Tên dự án không được để trống!"); 
      return;
    }
    setError("");
    try{
      await dispatch(addProject({
        tenDuAn:projectName
      }))
      console.log("Dự án được tạo:", projectName);
    setProjectName("");
    setModalOpen(false);
    }catch(e){
      console.log(e)
    }
  };

  // Component cho các đường dẫn trong Sidebar
  const NavLink = ({ el }) => {
    const hasSubMenu = !!el.subMenu;
    return (
      <>
        <Link
          to={el.link}
          onClick={() => {
            closeSidebar();
            if (hasSubMenu) {
              setExpandedSubMenu(el.label === expandedSubMenu ? null : el.label);
            } else {
              setExpandedSubMenu(null);
            }
          }}
          className={clsx(
            "w-full flex gap-3 px-4 py-3 rounded-lg items-center text-gray-800 text-base cursor-pointer transition-all duration-200",
            currentPath.startsWith(el.link) ? "bg-blue-600 text-white" : "hover:bg-gray-100"
          )}
        >
          {el.icon}
          <span className='font-medium'>{el.label}</span>
          {hasSubMenu && (
            <span
              className={clsx("ml-auto transition-transform duration-200", {
                "rotate-180": expandedSubMenu === el.label
              })}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (expandedSubMenu === el.label) {
                  setExpandedSubMenu(null);
                } else {
                  setExpandedSubMenu(el.label);
                  setModalOpen(true);
                }
              }}
            >
              <FaPlus />
            </span>
          )}
        </Link>
        {hasSubMenu && expandedSubMenu === el.label && (
          <div className="ml-8 flex flex-col space-y-2 mt-2">
            {el.subMenu.map((subEl) => (
              <Link
                key={subEl.label}
                to={subEl.link}
                onClick={closeSidebar}
                className={clsx(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors",
                  currentPath === subEl.link ? "bg-blue-600 text-white" : ""
                )}
              >
                <span className={`w-2 h-2 ${subEl.color} rounded-full`} />
                <span className="font-medium">{subEl.label}</span>
              </Link>
            ))}
          </div>
        )}
      </>
    );
  };

  // Modal component để nhập tên dự án
  const Modal = ({ isOpen, onClose }) => {
    const inputRef = useRef(null); // Tạo ref cho input

     useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus(); // Focus vào input khi modal mở
    }
  }, [isOpen]); // Chỉ chạy khi modal mở
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-lg font-bold mb-4">Nhập Tên Dự Án</h2>
          <form onSubmit={handleProjectSubmit}>
            <input
              type="text"
              ref={inputRef}
              onChange={(e)=>setProjectName(e.target.value)}
              placeholder="Tên dự án"
              value={projectName}
              className={clsx(
                "w-full p-2 border rounded mb-4 ",
                error ? "border-red-500" : "border-gray-300"
              )}
              required
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setProjectName("");
                  setError("");
                  onClose();
                }}
                className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className='w-full h-full flex flex-col gap-6 p-5 bg-white shadow-lg rounded-xl'>
      <h1 className='flex gap-2 items-center'>
        <p className='bg-blue-600 p-3 rounded-full'>
          <MdOutlineAddTask className='text-white text-2xl' />
        </p>
        <span className='text-2xl font-bold text-gray-900'>Quản lý công việc</span>
      </h1>

      <div className='flex-1 flex flex-col gap-y-5 overflow-y-auto'>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div className='pt-4'>
        <button
          className='w-full flex gap-2 p-3 items-center text-lg text-gray-800 hover:bg-gray-100 rounded-lg transition'
          onClick={() => setModalOpen(true)}
        >
          <MdSettings />
          <span>Chỉnh Sửa</span>
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Sidebar;
