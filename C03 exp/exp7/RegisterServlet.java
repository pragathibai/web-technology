package com.elgoog;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {

    // doPost() runs when the form (method="post") is submitted
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Read each field from the submitted form
        String name = request.getParameter("studentName");
        String regNo = request.getParameter("regNo");
        String email = request.getParameter("email");
        String dept = request.getParameter("department");
        String semester = request.getParameter("semester");

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        // ---- Validate: check if any field is empty or missing ----
        StringBuilder missing = new StringBuilder();
        if (name == null || name.trim().isEmpty()) missing.append("Student Name, ");
        if (regNo == null || regNo.trim().isEmpty()) missing.append("Register Number, ");
        if (email == null || email.trim().isEmpty()) missing.append("Email, ");
        if (dept == null || dept.trim().isEmpty()) missing.append("Department, ");
        if (semester == null || semester.trim().isEmpty()) missing.append("Semester, ");

        out.println("<!DOCTYPE html>");
        out.println("<html><head><title>Registration Result</title>");
        out.println("<style>");
        out.println("body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f5fa;");
        out.println("display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}");
        out.println(".card{background:#fff;border-radius:14px;padding:32px 38px;");
        out.println("box-shadow:0 10px 25px -14px rgba(0,0,0,0.3);max-width:420px;width:100%;}");
        out.println("h1{margin-bottom:16px;font-size:1.3rem;}");
        out.println(".error{color:#dc2626;background:#fdecec;padding:12px;border-radius:8px;font-size:0.85rem;}");
        out.println(".success h1{color:#16a34a;}");
        out.println("table{width:100%;border-collapse:collapse;margin-top:10px;}");
        out.println("td{padding:8px 4px;font-size:0.9rem;border-bottom:1px solid #eee;}");
        out.println("td.label{color:#888;width:40%;}");
        out.println("a{display:inline-block;margin-top:16px;color:#4f46e5;text-decoration:none;font-size:0.85rem;}");
        out.println("</style></head><body>");
        out.println("<div class='card'>");

        if (missing.length() > 0) {
            // Remove the trailing ", "
            String missingList = missing.substring(0, missing.length() - 2);
            out.println("<h1>Registration Incomplete</h1>");
            out.println("<p class='error'>Missing required field(s): " + missingList + "</p>");
        } else {
            out.println("<div class='success'>");
            out.println("<h1>Registration Successful ✔</h1>");
            out.println("</div>");
            out.println("<table>");
            out.println("<tr><td class='label'>Student Name</td><td>" + name + "</td></tr>");
            out.println("<tr><td class='label'>Register Number</td><td>" + regNo + "</td></tr>");
            out.println("<tr><td class='label'>Email</td><td>" + email + "</td></tr>");
            out.println("<tr><td class='label'>Department</td><td>" + dept + "</td></tr>");
            out.println("<tr><td class='label'>Semester</td><td>" + semester + "</td></tr>");
            out.println("</table>");
        }

        out.println("<a href='register.html'>&larr; Back to form</a>");
        out.println("</div></body></html>");

        out.close();
    }
}
