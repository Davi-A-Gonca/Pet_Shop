package org.example.services;

import org.example.objects.DTO.CatFoodDTO;
import org.example.objects.CatFood;
import org.example.repositories.CatFoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CatFoodService {
    @Autowired
    private CatFoodRepository repository;

    public CatFood save(CatFoodDTO dto){
        CatFood catFood = new CatFood(dto);
        repository.save(catFood);
        return catFood;
    }

    public Optional<CatFood> findById(UUID id){
        return repository.findById(id);
    }

    public List<CatFood> findAll(){
        return repository.findAll();
    }

    public void deleteById(UUID id){
        repository.deleteById(id);
    }
}
