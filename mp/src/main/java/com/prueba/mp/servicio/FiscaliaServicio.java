/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.prueba.mp.servicio;

import com.prueba.mp.controlador.exceptions.NonexistentEntityException;
import com.prueba.mp.modelo.Fiscalia;
import java.io.Serializable;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Service;

/**
 *
 * @author danie
 */
@Service
public class FiscaliaServicio implements Serializable {

    public FiscaliaServicio(EntityManagerFactory emf) {
        this.emf = emf;
    }
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public Fiscalia create(Fiscalia fiscalia) {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            em.persist(fiscalia);
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
        
        return fiscalia;
    }

    public Fiscalia edit(Fiscalia fiscalia) throws NonexistentEntityException, Exception {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            fiscalia = em.merge(fiscalia);
            em.getTransaction().commit();
        } catch (Exception ex) {
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                int id = fiscalia.getId_fiscalia();
                if (findFiscalia(id) == null) {
                    throw new NonexistentEntityException("The fiscalia with id " + id + " no longer exists.");
                }
            }
            throw ex;
        } finally {
            if (em != null) {
                em.close();
            }
        }
        
        return fiscalia;
    }

    public void destroy(Fiscalia fis) throws NonexistentEntityException {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            Fiscalia fiscalia;
            try {
                fiscalia = em.getReference(Fiscalia.class, fis.getId_fiscalia());
                fiscalia.getId_fiscalia();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The fiscalia with id " + fis.getId_fiscalia() + " no longer exists.", enfe);
            }
            em.remove(fiscalia);
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public List<Fiscalia> findFiscaliaEntities() {
        return findFiscaliaEntities(true, -1, -1);
    }

    public List<Fiscalia> findFiscaliaEntities(int maxResults, int firstResult) {
        return findFiscaliaEntities(false, maxResults, firstResult);
    }

    private List<Fiscalia> findFiscaliaEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(Fiscalia.class));
            Query q = em.createQuery(cq);
            if (!all) {
                q.setMaxResults(maxResults);
                q.setFirstResult(firstResult);
            }
            return q.getResultList();
        } finally {
            em.close();
        }
    }

    public Fiscalia findFiscalia(int id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(Fiscalia.class, id);
        } finally {
            em.close();
        }
    }

    public int getFiscaliaCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<Fiscalia> rt = cq.from(Fiscalia.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
