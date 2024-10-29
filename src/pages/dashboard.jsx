// import React from "react";
// import {
//   MdAdminPanelSettings,
//   MdKeyboardArrowDown,
//   MdKeyboardArrowUp,
//   MdKeyboardDoubleArrowUp,
// } from "react-icons/md";
// import { LuClipboardEdit } from "react-icons/lu";
// import { FaNewspaper, FaUsers } from "react-icons/fa";
// import { FaArrowsToDot } from "react-icons/fa6";
// import moment from "moment";
// import { summary } from "../assets/data";
// import clsx from "clsx";
// import { Chart } from "../components/Chart";
// import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
// import UserInfo from "../components/UserInfo";

// const TaskTable = ({ tasks }) => {
//   const ICONS = {
//     high: <MdKeyboardDoubleArrowUp />,
//     medium: <MdKeyboardArrowUp />,
//     low: <MdKeyboardArrowDown />,
//   };

//   const TableHeader = () => (
//     <thead className='border-b border-gray-300 '>
//       <tr className='text-black text-left'>
//         <th className='py-2'>Công việc</th>
//         <th className='py-2'>Ưu tiên</th>
//         <th className='py-2'>Nhóm</th>
//         <th className='py-2 hidden md:block'>Ngày tạo</th>
//       </tr>
//     </thead>
//   );

//   const TableRow = ({ task }) => (
//     <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
//       <td className='py-2'>
//         <div className='flex items-center gap-2'>
//           <div
//             className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
//           />

//           <p className='text-base text-black'>{task.title}</p>
//         </div>
//       </td>

//       <td className='py-2'>
//         <div className='flex gap-1 items-center'>
//           <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
//             {ICONS[task.priority]}
//           </span>
//           <span className='capitalize'>{task.priority}</span>
//         </div>
//       </td>

//       <td className='py-2'>
//         <div className='flex'>
//           {task.team.map((m, index) => (
//             <div
//               key={index}
//               className={clsx(
//                 "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
//                 BGS[index % BGS.length]
//               )}
//             >
//               <UserInfo user={m} />
//             </div>
//           ))}
//         </div>
//       </td>
//       <td className='py-2 hidden md:block'>
//         <span className='text-base text-gray-600'>
//           {moment(task?.date).fromNow()}
//         </span>
//       </td>
//     </tr>
//   );
//   return (
//     <>
//       <div className='w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
//         <table className='w-full'>
//           <TableHeader />
//           <tbody>
//             {tasks?.map((task, id) => (
//               <TableRow key={id} task={task} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// const UserTable = ({ users }) => {
//   const TableHeader = () => (
//     <thead className='border-b border-gray-300 '>
//       <tr className='text-black text-left'>
//         <th className='py-2'>Họ và Tên</th>
//         <th className='py-2'>Trạng thái</th>
//         <th className='py-2'>Ngày tạo</th>
//       </tr>
//     </thead>
//   );

//   const TableRow = ({ user }) => (
//     <tr className='border-b border-gray-200  text-gray-600 hover:bg-gray-400/10'>
//       <td className='py-2'>
//         <div className='flex items-center gap-3'>
//           <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700'>
//             <span className='text-center'>{getInitials(user?.name)}</span>
//           </div>

//           <div>
//             <p> {user.name}</p>
//             <span className='text-xs text-black'>{user?.role}</span>
//           </div>
//         </div>
//       </td>

//       <td>
//         <p
//           className={clsx(
//             "w-fit px-3 py-1 rounded-full text-sm",
//             user?.isActive ? "bg-blue-200" : "bg-yellow-100"
//           )}
//         >
//           {user?.isActive ? "Active" : "Disabled"}
//         </p>
//       </td>
//       <td className='py-2 text-sm'>{moment(user?.createdAt).fromNow()}</td>
//     </tr>
//   );

//   return (
//     <div className='w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded'>
//       <table className='w-full mb-5'>
//         <TableHeader />
//         <tbody>
//           {users?.map((user, index) => (
//             <TableRow key={index + user?._id} user={user} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// const Dashboard = () => {
//   const totals = summary.tasks;

//   const stats = [
//     {
//       _id: "1",
//       label: "SỐ LƯỢNG CÔNG VIỆC",
//       total: summary?.totalTasks || 0,
//       icon: <FaNewspaper />,
//       bg: "bg-[#1d4ed8]",
//     },
//     {
//       _id: "2",
//       label: "CÔNG VIỆC HOÀN THÀNH",
//       total: totals["completed"] || 0,
//       icon: <MdAdminPanelSettings />,
//       bg: "bg-[#0f766e]",
//     },
//     {
//       _id: "3",
//       label: "QUÁ TRÌNH LÀM VIỆC",
//       total: totals["in progress"] || 0,
//       icon: <LuClipboardEdit />,
//       bg: "bg-[#f59e0b]",
//     },
//     {
//       _id: "4",
//       label: "DANH SÁCH",
//       total: totals["todo"],
//       icon: <FaArrowsToDot />,
//       bg: "bg-[#be185d]" || 0,
//     },
//   ];

//   const Card = ({ label, count, bg, icon }) => {
//     return (
//       <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
//         <div className='h-full flex flex-1 flex-col justify-between'>
//           <p className='text-base text-gray-600'>{label}</p>
//           <span className='text-2xl font-semibold'>{count}</span>
//           <span className='text-sm text-gray-400'>{"110 last month"}</span>
//         </div>

//         <div
//           className={clsx(
//             "w-10 h-10 rounded-full flex items-center justify-center text-white",
//             bg
//           )}
//         >
//           {icon}
//         </div>
//       </div>
//     );
//   };
//   return (
//     <div classNamee='h-full py-4'>
//       <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
//         {stats.map(({ icon, bg, label, total }, index) => (
//           <Card key={index} icon={icon} bg={bg} label={label} count={total} />
//         ))}
//       </div>

//       <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
//         <h4 className='text-xl text-gray-600 font-semibold'>
//           Biểu đồ phân quyền
//         </h4>
//         <Chart />
//       </div>

//       <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
//         {/* /left */}

//         <TaskTable tasks={summary.last10Task} />

//         {/* /right */}

//         <UserTable users={summary.users} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';

const barData = [
  { name: 'Lam viec', value: 4, color: '#4CAF50' },
  { name: 'Nghi', value: 0, color: '#F44336' },
  { name: 'Hoc', value: 0, color: '#2196F3' },
];

const pieData = [
  { name: 'Incomplete', value: 4, color: '#FF6384' },
];

const lineData = Array.from({ length: 14 }, (_, i) => ({
  name: `09/${i + 1}`,
  value: 4
}));

const lollipopData = [
  { name: 'A', value: 5 },
  { name: 'B', value: 4 },
  { name: 'C', value: 3 },
  { name: 'D', value: 2 },
  { name: 'E', value: 1 },
  { name: 'F', value: 1 },
  { name: 'G', value: 1 },
];

const StatBox = ({ title, value, filters }) => (
  <div style={styles.statBox}>
    <h2 style={styles.statValue}>{value}</h2>
    <p style={styles.statTitle}>{title}</p>
    <p style={styles.statFilters}>{filters}</p>
  </div>
);

//còn đang gặp bug nên chưa hoàn thành
const BarChartComponent = () => (
  <div style={styles.chartBox}>
    <h6 style={styles.chartTitle}>Total Tasks by Section</h6>
    <div style={styles.barChart}>
      <div style={styles.yAxis}>
        <span>4</span>
        <span>2</span>
        <span>0</span>
      </div>
      <div style={styles.barContainer}>
        {barData.map((item) => (
          <div key={item.name} style={styles.barColumn}>
            <div
              style={{
                ...styles.bar,
                height: `${(item.value / 4) * 100}%`,
                backgroundColor: item.color,
              }}
            >
              {item.value > 0 && <span style={styles.barValue}>{item.value}</span>}
            </div>
            <span style={styles.barLabel}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
    <p style={styles.chartFilters}>No Filters</p>
  </div>
);

const PieChartComponent = () => (
  <div style={styles.chartBox}>
    <h6 style={styles.chartTitle}>Total Tasks by Completion Status</h6>
    <div style={styles.donutChartContainer}>
      <div style={styles.donutChart}>
        <div style={styles.donutHole}></div>
        <div style={{...styles.donutRing, background: `conic-gradient(${pieData[0].color} 360deg, ${pieData[0].color} 360deg)`}}></div>
        <div style={styles.donutNumber}>{pieData[0].value}</div>
      </div>
    </div>
    <div style={styles.legend}>
      <div style={styles.legendItem}>
        <div style={{...styles.legendColor, backgroundColor: pieData[0].color}}></div>
        <span>{pieData[0].name}</span>
      </div>
    </div>
    <p style={styles.chartFilters}>1 Filter</p>
  </div>
);

const LollipopChartComponent = () => (
  <div style={styles.chartBox}>
    <h6 style={styles.chartTitle}>Upcoming Tasks by Assignee</h6>
    <div style={styles.lollipopChart}>
      {lollipopData.map((item, index) => (
        <div key={index} style={{...styles.lollipopItem, height: `${item.value * 20}px`}}>
          <div style={styles.lollipopCircle}></div>
          <div style={styles.lollipopLine}></div>
          <span style={styles.lollipopLabel}>{item.name}</span>
        </div>
      ))}
    </div>
    <p style={styles.chartFilters}>2 Filters</p>
  </div>
);

const LineChartComponent = () => (
  <div style={styles.chartBox}>
    <h6 style={styles.chartTitle}>Task Completion Over Time</h6>
    <div style={styles.lineChart}>
      <div style={styles.yAxis}>
        {[4, 3, 2, 1, ''].map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </div>
      <div style={styles.lineChartContent}>
        {[0, 1, 2, 3].map((value) => (
          <div key={value} style={{...styles.gridLine, bottom: `${value * 25}%`}} />
        ))}
        {lineData.map((item, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${(index / (lineData.length - 1)) * 100}%`,
              bottom: 0,
              width: '1px',
              height: '100%',
            }}
          >
            <div style={styles.dataPoint} />
          </div>
        ))}
      </div>
      <div style={styles.xAxis}>
        {lineData.map((item, index) => (
          index % 2 === 0 && <div key={index}>{item.name}</div>
        ))}
      </div>
    </div>
    <div style={styles.lineLegend}>
      <span style={styles.lineLegendItem}>
        <span style={{...styles.lineLegendColor, backgroundColor: '#E0E0E0'}}></span>
        Total
      </span>
      <span style={styles.lineLegendItem}>
        <span style={{...styles.lineLegendColor, backgroundColor: '#8884D8'}}></span>
        Completed
      </span>
    </div>
    <p style={styles.chartFilters}>No Filters</p>
  </div>
);
// Component chính
function App() {
  return (
    <div style={styles.app}>
      <div style={styles.statContainer}>
        <StatBox title="Completed tasks" value={0} filters="1 Filter" />
        <StatBox title="Incomplete tasks" value={4} filters="1 Filter" />
        <StatBox title="Overdue tasks" value={2} filters="1 Filter" />
        <StatBox title="Total tasks" value={4} filters="No Filters" />
      </div>
      <div style={styles.chartContainer}>
        <BarChartComponent />
        <PieChartComponent />
        <LollipopChartComponent />
        <LineChartComponent />
      </div>
    </div>
  );
}

const styles = {
  app: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#1E1E1E',
    color: '#fff',
    minHeight: '100vh',
  },
  statContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '25px',
    marginBottom: '30px',
  },
  statBox: {
    padding: '25px',
    backgroundColor: '#2D2D2D',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
  },
  statValue: {
    fontSize: '2.8em',
    margin: '0',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statTitle: {
    margin: '10px 0',
    fontSize: '1.1em',
    color: '#B0B0B0',
  },
  statFilters: {
    margin: '5px 0 0',
    fontSize: '0.9em',
    color: '#808080',
  },
  chartContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '25px',
  },
  chartBox: {
    padding: '25px',
    backgroundColor: '#2D2D2D',
    borderRadius: '12px',
    position: 'relative',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
  },
  chartTitle: {
    margin: '0 0 20px',
    fontSize: '1.3em',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  chartFilters: {
    margin: '20px 0 0',
    fontSize: '0.9em',
    color: '#808080',
  },
  barChart: {
    display: 'flex',
    height: '220px',
    position: 'relative',
    paddingBottom: '30px',
  },
  yAxis: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    paddingRight: '15px',
    color: '#B0B0B0',
    fontSize: '0.9em',
  },
  barContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    flex: 1,
    borderBottom: '2px solid #3D3D3D',
  },
  barColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  bar: {
    width: '35px',
    position: 'relative',
    transition: 'height 0.5s ease',
    borderRadius: '6px 6px 0 0',
  },
  barValue: {
    position: 'absolute',
    top: '-25px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#FFFFFF',
    fontSize: '0.9em',
    fontWeight: 'bold',
  },
  barLabel: {
    fontSize: '0.9em',
    color: '#B0B0B0',
    marginTop: '10px',
  },
  donutChartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '220px',
  },
  donutChart: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    position: 'relative',
  },
  donutHole: {
    width: '70%',
    height: '70%',
    borderRadius: '50%',
    backgroundColor: '#2D2D2D',
    position: 'absolute',
    top: '15%',
    left: '15%',
  },
  donutRing: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    transition: 'transform 0.3s ease',
  },
  donutNumber: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '2.8em',
    fontWeight: 'bold',
  },
  legend: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '25px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1em',
  },
  legendColor: {
    width: '14px',
    height: '14px',
    marginRight: '8px',
    borderRadius: '3px',
  },
  lollipopChart: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '220px',
    position: 'relative',
  },
  lollipopItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '25px',
    transition: 'height 0.5s ease',
  },
  lollipopCircle: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#4CAF50',
    boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)',
  },
  lollipopLine: {
    width: '2px',
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  lollipopLabel: {
    position: 'absolute',
    bottom: '-25px',
    fontSize: '0.9em',
    color: '#B0B0B0',
  },
  lineChart: {
    height: '220px',
    position: 'relative',
    display: 'flex',
    paddingBottom: '30px',
  },
  lineChartContent: {
    flex: 1,
    position: 'relative',
    borderLeft: '2px solid #3D3D3D',
    borderBottom: '2px solid #3D3D3D',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTop: '1px dashed #3D3D3D',
  },
  dataPoint: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#8884D8',
    position: 'absolute',
    bottom: '-4px',
    left: '-4px',
    boxShadow: '0 0 10px rgba(136, 132, 216, 0.5)',
  },
  xAxis: {
    position: 'absolute',
    left: '30px',
    right: 0,
    bottom: '-25px',
    display: 'flex',
    justifyContent: 'space-between',
    color: '#B0B0B0',
    fontSize: '0.9em',
  },
  lineLegend: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '35px',
  },
  lineLegendItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px',
    fontSize: '1em',
  },
  lineLegendColor: {
    width: '16px',
    height: '16px',
    marginRight: '8px',
    borderRadius: '3px',
  },
};

export default App;