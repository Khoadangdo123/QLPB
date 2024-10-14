import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import TaskDetails from "./pages/TaskDetails";
import Tasks from "./pages/Tasks";
import Trash from "./pages/Trash";
import Users from "./pages/Users";
import Departments from "./pages/Department";
import Dashboard from "./pages/dashboard";
import { setOpenSidebar } from "./redux/slices/authSlice";
import Employees from "./pages/Employee";
import Accounts from "./pages/Account";
import * as signalR from '@microsoft/signalr';
import RolePermission from "./pages/Permission";
import TaskAssignment from "./pages/TaskAssignment";
import DepartmentAssignment from "./pages/DepartmentAssignment";
import Projects from "./pages/Project";
function Layout() {
  const authUser = useSelector((state) => state.authen);
  console.log(authUser)
  const token=authUser.user.token;
  var payload = JSON.parse(atob(token.split('.')[1]));
  localStorage.setItem("userId",payload.MaTaiKhoan)
  const location = useLocation();

  return authUser ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className='flex-1 overflow-y-auto'>
        <Navbar />

        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/log-in' state={{ from: location }} replace />
  );
  // return (
  //   <Navigate to='/log-in' state={{ from: location }} replace />
  // )
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.authen);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className='bg-white w-3/4 h-full'>
              <div className='w-full flex justify-end px-5 mt-5'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end'
                >
                  <IoClose size={25} />
                </button>
              </div>

              <div className='-mt-10'>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

function App() {
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6] position-fixed'>
      <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/project/:id' element={<Tasks />} />
          <Route path='/project' element={<Projects />} />
          {/* <Route path='/completed/:status' element={<Tasks />} /> */}
          <Route path='/in-progress/:status' element={<Tasks />} />
          <Route path='/todo/:status' element={<Tasks />} />
          <Route path='/team' element={<Users />} />
          <Route path='/department' element={<Departments/>} />
          <Route path='/employee' element={<Employees/>} />
          <Route path='/account' element={<Accounts/>} />
          <Route path='/permission' element={<RolePermission/>} />
          <Route path='/trashed' element={<Trash />} />
          <Route path='/taskassignment' element={<TaskAssignment/>} />
          <Route path='/assignmentdepartment' element={<DepartmentAssignment/>} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Route>
        <Route path='/log-in' element={<Login />} />
      </Routes>

      <Toaster richColors />
    </main>
  );
}

export default App;
