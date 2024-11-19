import API_ENDPOINTS from "../constant/linkapi";

export const generateDeadlineNotification=(taskName, dueDate)=> {
    return `
      <html>
        <head>
          <style>
            .email-container {
              font-family: Arial, sans-serif;
              line-height: 1.5;
              background-color: #f9f9f9;
              padding: 20px;
              border-radius: 10px;
              color: #333;
            }
            .email-header {
              font-size: 24px;
              font-weight: bold;
              color: #d9534f;
              text-align: center;
            }
            .email-body {
              margin-top: 20px;
              font-size: 16px;
            }
            .highlight {
              color: #d9534f;
              font-weight: bold;
            }
            .cta-button {
              display: inline-block;
              margin-top: 20px;
              padding: 10px 20px;
              background-color: #0275d8;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
            }
            .footer {
              margin-top: 30px;
              font-size: 14px;
              color: #888;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">Thông Báo Công Việc Sắp Hết Hạn</div>
            <div class="email-body">
              <p>
                Công việc <span class="highlight">${taskName}</span> mà bạn phụ
                trách sắp đến hạn hoàn thành.
              </p>
              <p>
                Ngày hết hạn dự kiến: <span class="highlight">${dueDate}</span>
              </p>
              <p>
                Vui lòng kiểm tra lại và hoàn tất công việc trước thời hạn để đảm bảo
                tiến độ dự án.
              </p>
              <a href="${API_ENDPOINTS.EMAIL}/taskassignment" class="cta-button"
                >Xem Chi Tiết Công Việc</a>
            </div>
            <div class="footer">
              <p>
                Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với đội ngũ quản lý
                dự án.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }