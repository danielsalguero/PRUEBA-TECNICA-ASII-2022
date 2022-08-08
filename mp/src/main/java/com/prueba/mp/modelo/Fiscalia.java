/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.prueba.mp.modelo;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author danie
 */
@Entity
@Table(name="tc_fiscalia")
public class Fiscalia implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_fiscalia;
    
    @Column(unique = true)
    private String fiscalia;
    private String direccion;
    private String telefono;
    private Integer estado = 1;
    private Integer id_departamento;

    public int getId_fiscalia() {
        return id_fiscalia;
    }

    public void setId_fiscalia(int id_fiscalia) {
        this.id_fiscalia = id_fiscalia;
    }
    
     public String getFiscalia() {
        return fiscalia;
    }

    public void setFiscalia(String fiscalia) {
        this.fiscalia = fiscalia;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    public Integer getId_departamento() {
        return id_departamento;
    }

    public void setId_departamento(Integer id_departamento) {
        this.id_departamento = id_departamento;
    }


    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) id_fiscalia;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Fiscalia)) {
            return false;
        }
        Fiscalia other = (Fiscalia) object;
        if (this.id_fiscalia != other.id_fiscalia) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.prueba.mp.modelo.Fiscalia[ id=" + id_fiscalia + " ]";
    }
    
}
