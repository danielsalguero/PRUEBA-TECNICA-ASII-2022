/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.prueba.mp.controlador;

import com.prueba.mp.controlador.exceptions.NonexistentEntityException;
import com.prueba.mp.modelo.Fiscalia;
import com.prueba.mp.servicio.FiscaliaServicio;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author danie
 */

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
@RequestMapping("/fiscalias")
public class FiscaliaControlador {
    
    @Autowired
    private FiscaliaServicio fiscaliaServ;
    /*
    @PostMapping
    public Fiscalia actualizar(@RequestBody Fiscalia fis){
        return fiscaliaServ.actualizar(fis);
    }*/
    
    @PostMapping
    public Fiscalia insertar(@RequestBody Fiscalia fis){
        return fiscaliaServ.create(fis);
    }
    
    @PutMapping
    public Fiscalia actualizar(@RequestBody Fiscalia fis){
        try {
            return fiscaliaServ.edit(fis);
        } catch (Exception ex) {
            Logger.getLogger(FiscaliaControlador.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    @DeleteMapping
    public void eliminar(@RequestBody Fiscalia fis){
        try {
            fiscaliaServ.destroy(fis);
        } catch (NonexistentEntityException ex) {
            Logger.getLogger(FiscaliaControlador.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    
}
