<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ page import="model.ServiceRequest"%>

<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <title>Request Submitted</title>

    <style>

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #eef2ff, #f8fafc);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30px;
        }

        .card {
            width: 700px;
            background: white;
            border-radius: 18px;
            padding: 35px;
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
        }

        .success {
            text-align: center;
            margin-bottom: 30px;
        }

        .icon {
            width: 65px;
            height: 65px;
            margin: auto;
            border-radius: 50%;
            background: #22c55e;
            color: white;
            font-size: 38px;
            line-height: 65px;
        }

        h1 {
            margin-bottom: 8px;
            color: #172554;
        }

        .message {
            color: #64748b;
            font-size: 16px;
        }

        .request-number {
            background: #eef2ff;
            border-radius: 12px;
            padding: 18px;
            text-align: center;
            margin-bottom: 25px;
        }

        .request-number span {
            display: block;
            color: #64748b;
            font-size: 13px;
            margin-bottom: 6px;
        }

        .request-number strong {
            color: #3730a3;
            font-size: 25px;
        }

        .details {
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
        }

        .row {
            display: flex;
            padding: 14px 18px;
            border-bottom: 1px solid #e2e8f0;
        }

        .row:last-child {
            border-bottom: none;
        }

        .label {
            width: 40%;
            font-weight: bold;
            color: #475569;
        }

        .value {
            width: 60%;
            color: #1e293b;
        }

        /* Submit Another Response Button */

        .another-button {
            display: block;
            width: fit-content;
            margin: 25px auto 0;
            padding: 13px 24px;
            background: linear-gradient(135deg, #2563eb, #06b6d4);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            text-align: center;
        }

        .another-button:hover {
            opacity: 0.9;
        }

        .footer {
            text-align: center;
            margin-top: 25px;
            color: #64748b;
            font-size: 14px;
        }

    </style>

</head>

<body>

<%

    ServiceRequest serviceRequest =
        (ServiceRequest) request.getAttribute("serviceRequest");

    String requestNumber =
        (String) request.getAttribute("requestNumber");

%>

<div class="card">

    <div class="success">

        <div class="icon">✓</div>

        <h1>Request Submitted Successfully</h1>

        <p class="message">
            Your IT service request has been received.
        </p>

    </div>


    <div class="request-number">

        <span>Service Request Number</span>

        <strong><%= requestNumber %></strong>

    </div>


    <div class="details">

        <div class="row">

            <div class="label">
                Employee ID
            </div>

            <div class="value">
                <%= serviceRequest.getEmployeeId() %>
            </div>

        </div>


        <div class="row">

            <div class="label">
                Employee Name
            </div>

            <div class="value">
                <%= serviceRequest.getEmployeeName() %>
            </div>

        </div>


        <div class="row">

            <div class="label">
                Department
            </div>

            <div class="value">
                <%= serviceRequest.getDepartment() %>
            </div>

        </div>


        <div class="row">

            <div class="label">
                Problem Category
            </div>

            <div class="value">
                <%= serviceRequest.getProblemCategory() %>
            </div>

        </div>


        <div class="row">

            <div class="label">
                Priority
            </div>

            <div class="value">
                <%= serviceRequest.getPriority() %>
            </div>

        </div>


        <div class="row">

            <div class="label">
                Problem Description
            </div>

            <div class="value">
                <%= serviceRequest.getProblemDescription() %>
            </div>

        </div>

    </div>


    <!-- Submit Another Response -->

    <a href="serviceRequest.jsp" class="another-button">
        Submit Another Response
    </a>


    <div class="footer">

        IT Service Request Management System

    </div>

</div>

</body>

</html>