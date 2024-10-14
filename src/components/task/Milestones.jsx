// ProjectTimeline.js
import React from 'react';
import Timeline from 'react-calendar-timeline';

const ProjectTimeline = () => {
  const projectData = {
    users: [
      { name: 'Laura' },
      { name: 'Mitch' },
      { name: 'Lisa' },
      { name: 'Adrien' },
      { name: 'Kati' },
      { name: 'Jozef' },
    ],
    tasks: [
      { userId: 0, title: 'Add User Revamp', startTime: '2020-01-12T09:00:00', endTime: '2020-01-14T17:00:00' },
      { userId: 1, title: 'Vacation', startTime: '2020-01-15T09:00:00', endTime: '2020-01-18T17:00:00' },
      { userId: 2, title: 'Plan', startTime: '2020-01-19T09:00:00', endTime: '2020-01-20T17:00:00' },
      { userId: 0, title: 'Interviews', startTime: '2020-01-21T09:00:00', endTime: '2020-01-22T17:00:00' },
      { userId: 3, title: 'Support Week', startTime: '2020-01-23T09:00:00', endTime: '2020-01-24T17:00:00' },
    ],
  };

  const groups = projectData.users.map((user, index) => ({
    id: index,
    title: user.name,
  }));

  const items = projectData.tasks.map((task, index) => ({
    id: index,
    group: task.userId,
    title: task.title,
    start_time: new Date(task.startTime),
    end_time: new Date(task.endTime), 
  }));

  // Inline styles
  const containerStyle = {
    textAlign: 'center',
    margin: '20px',
  };

  const titleStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  };

  const timelineStyle = {
    backgroundColor: '#f7f7f7',
    border: '1px solid #ddd',
  };

  // Calculate the current time range for the timeline
  const currentTime = new Date();
  const defaultTimeStart = new Date(currentTime.setDate(currentTime.getDate() - 7)); // Start from a week ago
  const defaultTimeEnd = new Date(currentTime.setDate(currentTime.getDate() + 14)); // End two weeks later

  // Function to get color based on user ID
  const getColor = (userId) => {
    const colors = [
      '#ffcccb', // Red for Laura
      '#add8e6', // Light Blue for Mitch
      '#90ee90', // Light Green for Lisa
      '#ffb347', // Light Orange for Adrien
      '#d3d3d3', // Light Gray for Kati
      '#ff69b4', // Hot Pink for Jozef
    ];
    return colors[userId] || '#fff'; // Default color if userId is not found
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Project Timeline</h1>
      <div style={timelineStyle}>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          itemRenderer={({ item }) => (
            <div style={{ backgroundColor: getColor(item.group), padding: '10px', borderRadius: '5px', color: '#000' }}>
              {item.title}
            </div>
          )}
          lineHeight={50}
          sidebarWidth={100}
        />
      </div>
    </div>
  );
};

export default ProjectTimeline;
