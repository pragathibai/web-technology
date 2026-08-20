package com.elgoog;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/processResult")
public class ResultProcessorServlet extends HttpServlet {

    private static final int PASS_MARK = 35;
    private static final String[] SUBJECTS = { "Subject 1", "Subject 2", "Subject 3" };

    // Note: Tomcat normally creates ONE instance of this servlet and reuses
    // it for every request, on separate threads running at the same time.
    // If we stored student data in INSTANCE variables (fields of the class),
    // one student's request could overwrite another's mid-calculation —
    // a race condition, since the field is shared across all threads.
    //
    // Instead, every variable below is a LOCAL variable, declared fresh
    // inside doPost(). Each thread/request gets its own separate copy on
    // its own call stack, so two students submitting at the exact same
    // moment can never see or corrupt each other's data. That's what makes
    // this servlet safe under concurrent requests without needing any
    // synchronization at all.
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // ---- Local variables: request-specific, thread-safe by default ----
        String name = request.getParameter("studentName");
        String regNo = request.getParameter("regNo");

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<!DOCTYPE html>");
        out.println("<html><head><title>Result</title>");
        out.println("<style>");
        out.println("body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f5fa;");
        out.println("display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;padding:20px;}");
        out.println(".card{background:#fff;border-radius:14px;padding:32px 38px;");
        out.println("box-shadow:0 10px 25px -14px rgba(0,0,0,0.3);max-width:420px;width:100%;}");
        out.println("h1{margin-bottom:16px;font-size:1.25rem;}");
        out.println(".error{color:#dc2626;background:#fdecec;padding:12px;border-radius:8px;font-size:0.85rem;}");
        out.println("table{width:100%;border-collapse:collapse;margin-top:10px;}");
        out.println("td,th{padding:8px 6px;font-size:0.88rem;border-bottom:1px solid #eee;text-align:left;}");
        out.println(".stat-row td{font-weight:700;}");
        out.println(".pass{color:#16a34a;font-weight:700;}");
        out.println(".fail{color:#dc2626;font-weight:700;}");
        out.println("a{display:inline-block;margin-top:16px;color:#4f46e5;text-decoration:none;font-size:0.85rem;}");
        out.println("</style></head><body><div class='card'>");

        // ---- Validation: missing name/regNo, missing marks, non-numeric, out-of-range ----
        StringBuilder errors = new StringBuilder();

        if (name == null || name.trim().isEmpty()) {
            errors.append("Student name is required.<br>");
        }
        if (regNo == null || regNo.trim().isEmpty()) {
            errors.append("Register number is required.<br>");
        }

        // Local array — again request-specific, not shared across threads
        int[] marks = new int[SUBJECTS.length];

        for (int i = 0; i < SUBJECTS.length; i++) {
            String raw = request.getParameter("mark" + i);

            if (raw == null || raw.trim().isEmpty()) {
                errors.append("Marks for " + SUBJECTS[i] + " are missing.<br>");
                continue;
            }
            try {
                int val = Integer.parseInt(raw.trim());
                if (val < 0 || val > 100) {
                    errors.append(SUBJECTS[i] + " must be between 0 and 100 (got " + val + ").<br>");
                } else {
                    marks[i] = val;
                }
            } catch (NumberFormatException e) {
                errors.append(SUBJECTS[i] + " must be a number (got \"" + raw + "\").<br>");
            }
        }

        if (errors.length() > 0) {
            out.println("<h1>Result Not Processed</h1>");
            out.println("<div class='error'>" + errors.toString() + "</div>");
            out.println("<a href='result-form.html'>&larr; Back to form</a>");
            out.println("</div></body></html>");
            out.close();
            return;
        }

        // ---- Calculations — all local variables, safe under concurrent requests ----
        int total = 0;
        int highest = marks[0];

        for (int m : marks) {
            total += m;
            if (m > highest) highest = m;
        }

        double average = total / (double) marks.length;

        boolean anyFail = false;
        for (int m : marks) {
            if (m < PASS_MARK) anyFail = true;
        }
        String status = anyFail ? "FAIL" : "PASS";

        // ---- Output as a dynamically generated table ----
        out.println("<h1>Result for " + name + " (" + regNo + ")</h1>");
        out.println("<table>");
        out.println("<tr><th>Subject</th><th>Marks</th></tr>");
        for (int i = 0; i < SUBJECTS.length; i++) {
            out.println("<tr><td>" + SUBJECTS[i] + "</td><td>" + marks[i] + "</td></tr>");
        }
        out.println("<tr class='stat-row'><td>Total</td><td>" + total + "</td></tr>");
        out.println("<tr class='stat-row'><td>Average</td><td>" + String.format("%.2f", average) + "</td></tr>");
        out.println("<tr class='stat-row'><td>Highest Mark</td><td>" + highest + "</td></tr>");
        out.println("<tr class='stat-row'><td>Status</td><td class='" +
            (anyFail ? "fail" : "pass") + "'>" + status + "</td></tr>");
        out.println("</table>");
        out.println("<a href='result-form.html'>&larr; Enter another result</a>");
        out.println("</div></body></html>");

        out.close();
    }
}
