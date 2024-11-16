// emailTemplates.js
export const generateEmailTemplate = (employee) => {
    return `
      <html>
          <head>
              <style>
                  .email-container {
                      font-family: Arial, sans-serif;
                      line-height: 1.5;
                      background-color: #f4f4f4;
                      padding: 20px;
                      border-radius: 10px;
                  }
                  .email-header {
                      font-size: 20px;
                      font-weight: bold;
                      color: #2e86c1;
                  }
                  .email-body {
                      margin-top: 20px;
                      color: #333;
                      font-size: 16px;
                  }
                  p {
                      margin: 10px 0;
                  }
                  .highlight {
                      color: #d35400;
                      font-weight: bold;
                  }
                  .footer {
                      margin-top: 30px;
                      font-size: 14px;
                      color: #888;
                  }
              </style>
          </head>
          <body>
              <div class="email-container">
                  <div class="email-header">Xin chào ${employee.tenNhanVien},</div>
                  <div class="email-body">
                      <p>Bạn đã được chọn để tham gia dự án với vai trò: <span class="highlight">${employee.vaiTro}</span></p>
                      <p>Vui lòng kiểm tra lại chi tiết trong hệ thống quản lý công việc của chúng tôi.</p>
                      <p>Trân trọng,</p>
                      <p>Đội ngũ quản lý dự án</p>
                  </div>
                  <div class="footer">
                      <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email support@company.com.</p>
                  </div>
              </div>
          </body>
      </html>
    `;
  };
  