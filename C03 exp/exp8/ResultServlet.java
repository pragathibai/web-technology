package com.elgoog;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/result")
public class ResultServlet extends HttpServlet {

    private static final String[] SUBJECTS = {
        "Mathematics", "Physics", "English", "Data Structures", "Web Technology"
    };
    private static final int PASS_MARK = 35;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String name = request.getParameter("studentName");

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<!DOCTYPE html>");
        out.println("<html><head><title>Result</title>");
        out.println("<style>");
        out.println("body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f5fa;");
        out.println("display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;padding:20px;}");
        out.println(".card{background:#fff;border-radius:14px;padding:32px 38px;");
        out.println("box-shadow:0 10px 25px -14px rgba(0,0,0,0.3);max-width:460px;width:100%;}");
        out.println("h1{margin-bottom:16px;font-size:1.3rem;}");
        out.println(".error{color:#dc2626;background:#fdecec;padding:12px;border-radius:8px;font-size:0.85rem;}");
        out.println("table{width:100%;border-collapse:collapse;margin-top:10px;}");
        out.println("td,th{padding:8px 6px;font-size:0.88rem;border-bottom:1px solid #eee;text-align:left;}");
        out.println(".stat-row td{font-weight:700;}");
        out.println(".pass{color:#16a34a;font-weight:700;}");
        out.println(".fail{color:#dc2626;font-weight:700;}");
        out.println("a{display:inline-block;margin-top:16px;color:#4f46e5;text-decoration:none;font-size:0.85rem;}");
        out.println("</style></head><body><div class='card'>");

        // ---- Validation: check name + each of the 5 marks ----
        StringBuilder errors = new StringBuilder();

        if (name == null || name.trim().isEmpty()) {
            errors.append("Student name is required.<br>");
        }

        int[] marks = new int[SUBJECTS.length];
        boolean marksValid = true;

        for (int i = 0; i < SUBJECTS.length; i++) {
            String raw = request.getParameter("mark" + i);

            if (raw == null || raw.trim().isEmpty()) {
                errors.append("Marks for " + SUBJECTS[i] + " are missing.<br>");
                marksValid = false;
                continue;
            }

            try {
                int val = Integer.parseInt(raw.trim());
                if (val < 0 || val > 100) {
                    errors.append(SUBJECTS[i] + " mark must be between 0 and 100 (got " + val + ").<br>");
                    marksValid = false;
                } else {
                    marks[i] = val;
                }
            } catch (NumberFormatException e) {
                errors.append(SUBJECTS[i] + " mark must be a number (got \"" + raw + "\").<br>");
                marksValid = false;
            }
        }

        if (errors.length() > 0) {
            out.println("<h1>Result Not Processed</h1>");
            out.println("<div class='error'>" + errors.toString() + "</div>");
            out.println("<a href='result.html'>&larr; Back to form</a>");
            out.println("</div></body></html>");
            out.close();
            return;
        }

        // ---- Calculations (only reached if every field is valid) ----
        int total = 0;
        int highest = marks[0];
        int lowest = marks[0];

        for (int m : marks) {
            total += m;
            if (m > highest) highest = m;
            if (m < lowest) lowest = m;
        }

        double average = total / (double) marks.length;

        String grade;
        if (average >= 90) grade = "A+";
        else if (average >= 80) grade = "A";
        else if (average >= 70) grade = "B";
        else if (average >= 60) grade = "C";
        else if (average >= PASS_MARK) grade = "D";
        else grade = "F";

        boolean anyFail = false;
        for (int m : marks) {
            if (m < PASS_MARK) anyFail = true;
        }
        String status = anyFail ? "FAIL" : "PASS";

        // ---- Output as a dynamically generated table ----
        out.println("<h1>Result for " + name + "</h1>");
        out.println("<table>");
        out.println("<tr><th>Subject</th><th>Marks</th></tr>");
        for (int i = 0; i < SUBJECTS.length; i++) {
            out.println("<tr><td>" + SUBJECTS[i] + "</td><td>" + marks[i] + "</td></tr>");
        }
        out.println("<tr class='stat-row'><td>Total</td><td>" + total + "</td></tr>");
        out.println("<tr class='stat-row'><td>Average</td><td>" + String.format("%.2f", average) + "</td></tr>");
        out.println("<tr class='stat-row'><td>Highest Mark</td><td>" + highest + "</td></tr>");
        out.println("<tr class='stat-row'><td>Lowest Mark</td><td>" + lowest + "</td></tr>");
        out.println("<tr class='stat-row'><td>Grade</td><td>" + grade + "</td></tr>");
        out.println("<tr class='stat-row'><td>Status</td><td class='" +
            (anyFail ? "fail" : "pass") + "'>" + status + "</td></tr>");
        out.println("</table>");
        out.println("<a href='result.html'>&larr; Enter another result</a>");
        out.println("</div></body></html>");

        out.close();
    }
}
