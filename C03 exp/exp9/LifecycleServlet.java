package com.elgoog;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/lifecycle")
public class LifecycleServlet extends HttpServlet {

    // Instance variables — belong to THIS servlet instance, which Tomcat
    // normally creates only ONCE and reuses for every request until the
    // app is stopped/redeployed. That's why these counts persist and grow
    // across multiple browser refreshes.
    private int serviceCount = 0;

    // ---- 1. CONSTRUCTOR ----
    // Runs exactly once: the moment Tomcat creates this servlet's instance
    // (usually on the very first request to it, or at app startup).
    public LifecycleServlet() {
        super();
        System.out.println("[LIFECYCLE] Constructor called — servlet instance created.");
    }

    // ---- 2. init() ----
    // Runs exactly once, immediately AFTER the constructor, before the
    // servlet handles its first request. Good place for one-time setup
    // (e.g. opening a database connection).
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        System.out.println("[LIFECYCLE] init() called — servlet initialized, ready to serve requests.");
    }

    // ---- 3. service() / doGet() ----
    // Runs EVERY time a request comes in. doGet() is called automatically
    // by the parent service() method for GET requests.
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        serviceCount++;
        System.out.println("[LIFECYCLE] doGet() called — request #" + serviceCount);

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<!DOCTYPE html>");
        out.println("<html><head><title>Servlet Lifecycle</title>");
        out.println("<style>");
        out.println("body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f5fa;");
        out.println("display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}");
        out.println(".card{background:#fff;border-radius:14px;padding:32px 38px;");
        out.println("box-shadow:0 10px 25px -14px rgba(0,0,0,0.3);max-width:420px;}");
        out.println("h1{margin-bottom:14px;font-size:1.25rem;}");
        out.println("table{width:100%;border-collapse:collapse;margin-top:6px;}");
        out.println("td{padding:8px 4px;font-size:0.88rem;border-bottom:1px solid #eee;}");
        out.println(".note{margin-top:14px;font-size:0.78rem;color:#888;}");
        out.println("</style></head><body><div class='card'>");
        out.println("<h1>Servlet Lifecycle Demo</h1>");
        out.println("<table>");
        out.println("<tr><td>Constructor</td><td>ran once — check Eclipse Console</td></tr>");
        out.println("<tr><td>init()</td><td>ran once — check Eclipse Console</td></tr>");
        out.println("<tr><td>doGet() / service()</td><td>ran <b>" + serviceCount + "</b> time(s) so far</td></tr>");
        out.println("<tr><td>destroy()</td><td>will run once, only when the server stops or app is redeployed</td></tr>");
        out.println("</table>");
        out.println("<p class='note'>Refresh this page a few times — the doGet() count will keep climbing, but Constructor/init() will NOT print again in the Console. Then stop or restart the Tomcat server in Eclipse and check the Console for the destroy() message.</p>");
        out.println("</div></body></html>");
        out.close();
    }

    // ---- 4. destroy() ----
    // Runs exactly once, when the servlet is being taken out of service —
    // either the whole app is redeployed/undeployed, or the server shuts down.
    @Override
    public void destroy() {
        System.out.println("[LIFECYCLE] destroy() called — servlet instance being removed. Total requests served: " + serviceCount);
        super.destroy();
    }
}
