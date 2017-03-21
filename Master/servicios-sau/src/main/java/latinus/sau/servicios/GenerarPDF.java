/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package latinus.sau.servicios;


import javax.ws.rs.Consumes;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import latinus.sau.pdf.util.NotificacionResponse;
import latinus.sau.pdf.util.PdfRequest;
import latinus.sau.pdf.impl.PdfControladorImpl;

/**
 * REST Web Service
 *
 * @author Ricardo

*/

@Path("pdf")
public class GenerarPDF {

    @Context
    private UriInfo context;
    private final PdfControladorImpl pdfControlador = new PdfControladorImpl();

    public GenerarPDF() {
    }

    @GET
    public String getXml() {
        return "Creacion PDF";
    }

    @GET
    @Path("get")
    public String getGreeting() {

        return "Hi there";

    }

    @POST
    @Path("decodificarPdf")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public NotificacionResponse decodificarPdf(PdfRequest request) {
        System.out.println("Request:" + request);
        NotificacionResponse response = new NotificacionResponse();
        response.setFileName(this.pdfControlador.decodificarPdf(request));
        return response;
    }

}
