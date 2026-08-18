import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// @WebServlet maps this class to the URL /welcome — this is the modern
// replacement for writing a <servlet-mapping> by hand in web.xml, and is
// what Eclipse's servlet wizard generates automatically on Tomcat 10+/11.
@WebServlet("/welcome")
public class WelcomeServlet extends HttpServlet {

    // doGet() runs automatically every time someone visits this servlet's
    // mapped URL using a GET request (e.g. submitting a form, or typing the URL).
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // HttpServletRequest lets us read values sent from the form in index.html
        String studentName = request.getParameter("studentName");
        String courseName = request.getParameter("courseName");

        // Fallback defaults if the servlet is visited directly with no form data
        if (studentName == null || studentName.trim().isEmpty()) {
            studentName = "Guest Student";
        }
        if (courseName == null || courseName.trim().isEmpty()) {
            courseName = "B.Tech Information Technology";
        }

        // Current date & time — generated fresh on the server, every single request
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm:ss a");
        String currentDateTime = LocalDateTime.now().format(formatter);

        // HttpServletResponse lets us control what gets sent back to the browser
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        // PrintWriter is how the servlet writes the actual HTML page, line by line
        out.println("<!DOCTYPE html>");
        out.println("<html><head><title>Welcome Servlet</title>");
        out.println("<style>");
        out.println("body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f5fa;");
        out.println("display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}");
        out.println(".card{background:#fff;border-radius:14px;padding:36px 42px;");
        out.println("box-shadow:0 10px 25px -14px rgba(0,0,0,0.3);text-align:center;max-width:420px;}");
        out.println("h1{color:#4f46e5;margin-bottom:10px;}");
        out.println("p{color:#333;font-size:1rem;margin:6px 0;}");
        out.println(".label{color:#888;font-size:0.8rem;}");
        out.println("</style></head><body>");
        out.println("<div class='card'>");
        out.println("<h1>Welcome, " + studentName + "!</h1>");
        out.println("<p><span class='label'>Course:</span> " + courseName + "</p>");
        out.println("<p><span class='label'>Generated on:</span> " + currentDateTime + "</p>");
        out.println("</div>");
        out.println("</body></html>");

        out.close();
    }
}
