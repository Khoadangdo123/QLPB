import React, { useEffect, useState } from 'react';

const TimelineItem = ({ project, isLast }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Cập nhật thời gian hiện tại theo thời gian thực
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Cập nhật mỗi giây
    return () => clearInterval(interval);
  }, []);

  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);

  // Tính toán số ngày từ ngày bắt đầu đến ngày kết thúc
  const totalDuration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Tổng số ngày của dự án
  const elapsedDuration = Math.ceil((currentDate - startDate) / (1000 * 60 * 60 * 24)); // Số ngày đã trôi qua
  const progressPercent = Math.min(Math.max((elapsedDuration * 100) / totalDuration, 0), 100); // Phần trăm tiến độ, giới hạn từ 0 đến 100

  const styles = {
    item: {
      display: 'flex',
      position: 'relative',
      alignItems: 'flex-start',
      marginBottom: '50px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      width: '600px',
    },
    content: {
      marginLeft: '40px',
    },
    date: {
      position: 'absolute',
      top: 0,
      left: '-40px',
      width: '80px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#666',
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '50%',
      padding: '10px',
      zIndex: 1,
    },
    circle: {
      position: 'absolute',
      left: '-25px',
      top: '15px',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#3498db',
      zIndex: 2,
    },
    line: {
      position: 'absolute',
      left: '-20px',
      top: '0',
      bottom: isLast ? '15px' : '-40px',
      width: '2px',
      backgroundColor: '#ddd',
      zIndex: 1,
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    description: {
      fontSize: '14px',
      color: '#777',
      marginBottom: '10px',
    },
    barContainer: {
      width: '300px',
      position: 'relative',
    },
    bar: {
      backgroundColor: '#e0e0e0',
      height: '6px',
      borderRadius: '10px',
      position: 'relative',
      marginTop: '10px',
    },
    progress: {
      backgroundColor: '#3498db',
      height: '100%',
      borderRadius: '10px',
    },
    days: {
      marginTop: '5px',
      fontSize: '12px',
      color: '#2ecc71',
    },
  };

  return (
    <div style={styles.item}>
      <div style={styles.circle}></div>
      <div style={styles.line}></div>
      <div style={styles.date}>
        <span>{project.startDate}</span>
      </div>

      <div style={styles.content}>
        <h3 style={styles.title}>{project.title}</h3>
        <p style={styles.description}>{project.description}</p>

        {/* Thanh thời gian */}
        <div style={styles.barContainer}>
          <div style={styles.bar}>
            <div
              style={{
                ...styles.progress,
                width: `${progressPercent}%`, // Hiển thị phần trăm tiến độ thực tế
              }}
            />
          </div>
          <div style={styles.days}>{elapsedDuration} / {totalDuration} ngày</div>
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  const projects = [
    {
      id: 1,
      title: 'Dự án A',
      startDate: '2024-10-01',
      endDate: '2024-10-20',
      description: 'Mô tả về dự án A.',
    },
    {
      id: 2,
      title: 'Dự án B',
      startDate: '2024-10-05',
      endDate: '2024-10-25',
      description: 'Mô tả về dự án B.',
    },
  ];

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    position: 'relative',
  };

  return (
    <div style={containerStyle}>
      {projects.map((project, index) => (
        <TimelineItem key={project.id} project={project} isLast={index === projects.length - 1} />
      ))}
    </div>
  );
};

export default Timeline;
