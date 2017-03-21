/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package latinus.sau.pdf.util;

import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Ricardo
 */
@XmlRootElement       
public class PdfRequest {

    private String nombreUsuario;
    private String tipoUsuario;
    private String correoUsuario;
    private String documentoUsuario;
    private String nombreFedatario;
    private String documentoFedatario;
    private String fecha;
    private String foto;
    private String firma;
    private byte[] pdfCodificado;
    
    public String getNombreUsuario() {
        return this.nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getTipoUsuario() {
        return this.tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public String getCorreoUsuario() {
        return this.correoUsuario;
    }

    public void setCorreoUsuario(String correoUsuario) {
        this.correoUsuario = correoUsuario;
    }

    public String getDocumentoUsuario() {
        return this.documentoUsuario;
    }

    public void setDocumentoUsuario(String documentoUsuario) {
        this.documentoUsuario = documentoUsuario;
    }

    public String getNombreFedatario() {
        return this.nombreFedatario;
    }

    public void setNombreFedatario(String nombreFedatario) {
        this.nombreFedatario = nombreFedatario;
    }

    public String getDocumentoFedatario() {
        return this.documentoFedatario;
    }

    public void setDocumentoFedatario(String documentoFedatario) {
        this.documentoFedatario = documentoFedatario;
    }

    public String getFecha() {
        return this.fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getFoto() {
        return this.foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getFirma() {
        return this.firma;
    }

    public void setFirma(String firma) {
        this.firma = firma;
    }

    public byte[] getPdfCodificado() {
        return this.pdfCodificado;
    }

    public void setPdfCodificado(byte[] pdfCodificado) {
        this.pdfCodificado = pdfCodificado;
    }

    @Override
    public String toString() {
        return "PdfRequest [nombreUsuario=" + this.nombreUsuario + ", tipoUsuario=" + this.tipoUsuario + ", correoUsuario=" + this.correoUsuario + ", documentoUsuario=" + this.documentoUsuario + ", nombreFedatario=" + this.nombreFedatario + ", documentoFedatario=" + this.documentoFedatario + ", fecha=" + this.fecha + ", foto=" + this.foto + ", firma=" + this.firma + "]";
    }
}
