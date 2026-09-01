<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>IT Service Request</title>

<style>

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
    }

    body {
        min-height: 100vh;
        background: linear-gradient(135deg, #0f172a, #1e3a5f);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 20px;
    }

    .container {
        width: 100%;
        max-width: 950px;
        background: white;
        border-radius: 22px;
        overflow: hidden;
        box-shadow: 0 20px 50px rgba(0,0,0,0.30);
    }

    .header {
        background: linear-gradient(135deg, #2563eb, #06b6d4);
        color: white;
        padding: 35px 45px;
    }

    .header h1 {
        font-size: 30px;
        margin-bottom: 8px;
    }

    .header p {
        font-size: 15px;
        opacity: 0.9;
    }

    .content {
        padding: 40px 45px;
    }

    .section-title {
        font-size: 20px;
        color: #172033;
        margin-bottom: 25px;
        font-weight: bold;
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 22px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .full {
        grid-column: 1 / 3;
    }

    label {
        font-size: 14px;
        font-weight: bold;
        color: #374151;
        margin-bottom: 8px;
    }

    input, select, textarea {
        width: 100%;
        padding: 13px 15px;
        border: 1px solid #d1d5db;
        border-radius: 10px;
        font-size: 14px;
        outline: none;
        background: #f9fafb;
    }

    input:focus, select:focus, textarea:focus {
        border-color: #2563eb;
        background: white;
    }

    textarea {
        resize: vertical;
        min-height: 120px;
    }

    .button-area {
        margin-top: 30px;
        text-align: right;
    }

    .submit-btn {
        border: none;
        background: linear-gradient(135deg, #2563eb, #06b6d4);
        color: white;
        padding: 14px 30px;
        border-radius: 10px;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
    }

    .submit-btn:hover {
        opacity: 0.9;
    }

    .footer {
        text-align: center;
        padding: 18px;
        background: #f8fafc;
        color: #64748b;
        font-size: 12px;
    }

    @media (max-width: 700px) {
        .form-grid {
            grid-template-columns: 1fr;
        }

        .full {
            grid-column: 1;
        }

        .content {
            padding: 30px 25px;
        }

        .header {
            padding: 30px 25px;
        }
    }

</style>
</head>

<body>

<div class="container">

    <div class="header">
        <h1>IT Service Request</h1>
        <p>Raise a technical issue and get the support you need.</p>
    </div>

    <div class="content">

        <div class="section-title">
            Submit a Service Request
        </div>

        <form action="ServiceRequestServlet" method="post">

            <div class="form-grid">

                <div class="form-group">
                    <label>Employee ID</label>
                    <input type="text" name="employeeId"
                           placeholder="Enter employee ID" required>
                </div>

                <div class="form-group">
                    <label>Employee Name</label>
                    <input type="text" name="employeeName"
                           placeholder="Enter employee name" required>
                </div>

                <div class="form-group">
                    <label>Department</label>
                    <input type="text" name="department"
                           placeholder="Enter department" required>
                </div>

                <div class="form-group">
                    <label>Problem Category</label>
                    <select name="problemCategory" required>
                        <option value="">Select category</option>
                        <option value="Network">Network</option>
                        <option value="Software">Software</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Account">Account</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div class="form-group full">
                    <label>Problem Description</label>
                    <textarea name="problemDescription"
                              placeholder="Describe your technical problem..."
                              required></textarea>
                </div>

                <div class="form-group">
                    <label>Priority</label>
                    <select name="priority" required>
                        <option value="">Select priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

            </div>

            <div class="button-area">
                <button type="submit" class="submit-btn">
                    Submit Request
                </button>
            </div>

        </form>

    </div>

    <div class="footer">
        IT Service Request Management System
    </div>

</div>

</body>
</html>