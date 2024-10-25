import React, { useEffect, useState } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./ViewSwitcher";
import { getStartEndDateForProject, initTasks } from "./helper";

const GanttApp = () => {
  const [view, setView] = useState(ViewMode.Day);
  const [tasks, setTasks] = useState(initTasks());
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    console.log("Current tasks:", tasks);
  }, [tasks]);

  // Đặt độ rộng cột dựa trên chế độ xem
  let columnWidth = 30;

  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  } else if (view === ViewMode.Day || view === ViewMode.HalfDay || view === ViewMode.QuarterDay) {
    columnWidth = 100;
  }
  if (isNaN(columnWidth) || columnWidth <= 0) {
    console.error("Invalid columnWidth value:", columnWidth);
    columnWidth = 100; // Đặt giá trị mặc định nếu không hợp lệ
  }
  const handleTaskChange = (task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));

    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      console.log([start, end]);
      
      const project = newTasks.find((t) => t.id === task.project);
      if (project && (project.start.getTime() !== start.getTime() || project.end.getTime() !== end.getTime())) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map((t) => (t.id === task.project ? changedProject : t));
      }
    }

    setTasks(newTasks);
  };

  const handleTaskDelete = (task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleSelect = (task, isSelected) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  tasks.forEach(task => {
    const startDate = new Date(task.start);
    const endDate = new Date(task.end);
    console.log(startDate)
    console.log(endDate)
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.warn(`Task ${task.id} has invalid dates: start ${task.start} or end ${task.end} is invalid`);
    } else if (startDate >= endDate) {
      console.warn(`Task ${task.id} has invalid dates: start ${task.start} is after end ${task.end}`);
    }
  });
  console.log(typeof(columnWidth))
  return (
    <div>
      <ViewSwitcher
        onViewModeChange={setView}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <h3>Gantt With Unlimited Height</h3>
      <Gantt
        tasks={tasks}
        // onDateChange={handleTaskChange}
        // onDelete={handleTaskDelete}
        // onProgressChange={handleProgressChange}
        // onDoubleClick={handleDblClick}
        // onSelect={handleSelect}
        // onExpanderClick={handleExpanderClick}
        // listCellWidth={isChecked ? "155px" : ""}
        // columnWidth={columnWidth}
        // barBackgroundColor="blue"
        // rowHeight={40}
        // fontSize={12}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
        barBackgroundColor="blue"
        rowHeight={40}
        fontSize={12}
      />
    </div>
  );
};

export default GanttApp;
