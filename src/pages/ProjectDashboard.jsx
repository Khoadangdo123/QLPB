import React from 'react';
import ProjectMilestone from './ProjectMilestone';

const ProjectDashboard = () => {
  const projectData = {
    projectName: 'Project ABC',
    projectStartDate: '2024-10-01',
    projectEndDate: '2024-12-31',
    sections: [
      {
        phaseId: 1,
        sectionName: 'Planning',
        tasks: [
          {
            taskName: 'Task 1',
            startDate: '2024-10-01',
            endDate: '2024-10-07',
            milestones: ['2024-10-03', '2024-10-05'],
          },
          {
            taskName: 'Task 2',
            startDate: '2024-10-08',
            endDate: '2024-10-15',
            milestones: [],
          },
        ],
      },
      {
        phaseId: 2,
        sectionName: 'Execution',
        tasks: [
          {
            taskName: 'Task 1',
            startDate: '2024-10-16',
            endDate: '2024-10-22',
            milestones: ['2024-10-19'],
          },
          {
            taskName: 'Task 2',
            startDate: '2024-10-23',
            endDate: '2024-10-30',
            milestones: [],
          },
        ],
      },
      {
        phaseId: 3,
        sectionName: 'Launch',
        tasks: [
          {
            taskName: 'Task 1',
            startDate: '2024-11-01',
            endDate: '2024-11-07',
            milestones: ['2024-11-03'],
          },
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Project Dashboard</h1>
      <ProjectMilestone projectData={projectData} />
    </div>
  );
};

export default ProjectDashboard;
