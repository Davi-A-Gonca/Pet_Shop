package org.example.services;

import org.example.objects.DTO.PortionDTO;
import org.example.objects.Portion;
import org.example.repositories.PortionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortionService {
    @Autowired
    private PortionRepository repository;

    public Portion save(PortionDTO dto){
        Portion portion = new Portion(dto);
        repository.save(portion);
        return portion;
    }

    public Optional<Portion> findById(String id){
        return repository.findById(id);
    }

    public List<Portion> findAll(){
        return repository.findAll();
    }

    public void deleteById(String id){
        repository.deleteById(id);
    }
}
