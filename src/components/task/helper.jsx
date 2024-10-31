import React from "react";
import { useLocation } from "react-router-dom";

export function initTasks() {
  const currentDate = new Date();
  const location = useLocation();
  const { duan } = location.state || {};
  if (!duan || !duan.phanDuAn) {
    console.error("Invalid project data");
    return [];
  }
  console.log(duan);
  const tasks = duan.phanDuAn.flatMap((item) => {
    return item.congViecs
      .map((i) => {
        const startTime = new Date(
          i.thoiGianBatDau.endsWith("Z")
            ? i.thoiGianBatDau
            : `${i.thoiGianBatDau}Z`
        );
        const endTime = new Date(
          i.thoiGianKetThuc.endsWith("Z")
            ? i.thoiGianKetThuc
            : `${i.thoiGianKetThuc}Z`
        );

        if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
          console.error(`Invalid times for task: ${JSON.stringify(i)}`);
          return null;
        }
        
        return {
          start: startTime,
          end: endTime,
          name: i.tenCongViec,
          id: i.maCongViec,
          type: "task",
          //project: duan.tenDuAn,
          progress:80        
        };
      })
      .filter(Boolean);
  });
  console.log(tasks);
  return tasks;
}

export function getStartEndDateForProject(tasks, projectId) {
  const projectTasks = tasks.filter((t) => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
