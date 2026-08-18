package com.elgoog;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.concurrent.atomic.AtomicInteger;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/visitors")
public class VisitorCounterServlet extends HttpServlet {

    // ---- UNSAFE counter ----
    // A plain instance variable. Tomcat reuses ONE servlet instance across
    // MANY simultaneous requests, each handled on its own thread. This
    // variable is therefore shared by every thread at once.
    //
    // "unsafeCount++" looks like one step but is actually THREE separate
    // steps at the CPU level: (1) read the current value, (2) add 1 to it,
    // (3) write the new value back. If two threads both do step 1 at the
    // same moment — before either has written back — they both read the
    // same starting number, both add 1, and both write back the same
    // result. One increment gets silently lost. That's the classic
    // "race condition."
    private int unsafeCount = 0;

    // ---- THREAD-SAFE counter ----
    // AtomicInteger performs "read, add, write" as a single indivisible
    // (atomic) hardware-level operation, so no other thread can jump in
    // halfway through. No increments get lost, no synchronized block needed.
    private final AtomicInteger safeCount = new AtomicInteger(0);

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Unsafe increment — vulnerable to race conditions under concurrent load
        unsafeCount++;

        // Safe increment — atomic, never loses a count even under heavy concurrent load
        int currentSafeCount = safeCount.incrementAndGet();

        // Note: request/response themselves, and any LOCAL variable declared
        // here inside doGet() (like currentSafeCount above), are safe by
        // default — each thread gets its own separate copy on its own stack.
        // It's only variables shared across requests (instance/static fields)
        // that need synchronization or atomic types.

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<!DOCTYPE html>");
        out.println("<html><head><title>Visitor Counter</title>");
        out.println("<style>");
        out.println("body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f5fa;");
        out.println("display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}");
        out.println(".card{background:#fff;border-radius:14px;padding:32px 38px;");
        out.println("box-shadow:0 10px 25px -14px rgba(0,0,0,0.3);max-width:420px;text-align:center;}");
        out.println("h1{margin-bottom:18px;font-size:1.2rem;}");
        out.println(".count{font-size:2rem;font-weight:700;color:#4f46e5;margin:6px 0 2px;}");
        out.println(".tag{font-size:0.75rem;color:#888;margin-bottom:18px;}");
        out.println("</style></head><body><div class='card'>");
        out.println("<h1>Visitor Counter</h1>");
        out.println("<div class='count'>" + unsafeCount + "</div>");
        out.println("<div class='tag'>Unsafe counter (plain int, not thread-safe)</div>");
        out.println("<div class='count'>" + currentSafeCount + "</div>");
        out.println("<div class='tag'>Thread-safe counter (AtomicInteger)</div>");
        out.println("</div></body></html>");
        out.close();
    }
}
