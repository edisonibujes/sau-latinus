/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package latinus.sau.pdf.impl;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.UUID;
import latinus.sau.pdf.PdfControlador;
import latinus.sau.pdf.util.PdfRequest;

/**
 *
 * @author Ricardo
 */
public class PdfControladorImpl implements PdfControlador {

    private final String DIRECTORY = "pdfs";

    @Override
    public String decodificarPdf(PdfRequest request) {
        try {
            String pdfId = UUID.randomUUID().toString();
            StringBuilder pdfFullPath = new StringBuilder();
            pdfFullPath.append(this.DIRECTORY).append(File.separator).append(pdfId).append(".pdf");
            byte[] pdf = request.getPdfCodificado();

            OutputStream out = new FileOutputStream(pdfFullPath.toString());
            out.write(pdf);
            out.close();
            return pdfId;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return "Error en el servicio decodificarPdf";
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "Error en el servicio decodificarPdf";
    }
    
}
