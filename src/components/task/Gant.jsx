import React, { useEffect, useState } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./ViewSwitcher";
import { getStartEndDateForProject, initTasks } from "./helper";

const GanttApp = () => {
  const [view, setView] = useState(ViewMode.Day);
  const [tasks, setTasks] = useState(initTasks());
  const [isChecked, setIsChecked] = useState(true);
  let columnWidth = 30;

  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  } else if (view === ViewMode.Day || view === ViewMode.HalfDay || view === ViewMode.QuarterDay) {
    columnWidth = 100;
  }
  //
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.parentId]) {
      acc[task.parentId] = [];
    }
    acc[task.parentId].push(task);
    return acc;
  }, {});

  // Convert grouped tasks into an array for rendering
  const tasksToDisplay = Object.values(groupedTasks).flat();
  if (isNaN(columnWidth) || columnWidth <= 0) {
    console.error("Invalid columnWidth value:", columnWidth);
    columnWidth = 100;
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
    console.log(newTasks)
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
  const customCellRender = (cell) => {
    const colors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#D5AAFF', '#85E3FF', '#B9FBC0'];
    const colorIndex = (cell.index % colors.length); // Cycle through colors
    return (
      <div style={{ backgroundColor: colors[colorIndex], width: columnWidth, height: '100%' }}>
        {cell.value}
      </div>
    );
  };
  const customTaskRender = (task) => {
    return (
      <div style={{ backgroundColor: task.color, height: '100%' }}>
        {task.name}
      </div>
    );
  };
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
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
        barBackgroundColor="red"
        barColor="blue"
        rowHeight={40}
        fontSize={14}
        style={{ color: 'black', fontFamily: 'Arial, sans-serif' }}
        taskBarRender={customTaskRender}

      />
    </div>
  );
};

export default GanttApp;
