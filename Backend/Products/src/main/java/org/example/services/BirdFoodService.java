package org.example.services;

import org.example.objects.BirdFood;
import org.example.objects.DTO.BirdFoodDTO;
import org.example.repositories.BirdFoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BirdFoodService {
    @Autowired
    private BirdFoodRepository repository;

    public BirdFood save(BirdFoodDTO dto){
        BirdFood catFood = new BirdFood(dto);
        repository.save(catFood);
        return catFood;
    }

    public Optional<BirdFood> findById(UUID id){
        return repository.findById(id);
    }

    public List<BirdFood> findAll(){
        return repository.findAll();
    }

    public void deleteById(UUID id){
        repository.deleteById(id);
    }
}
