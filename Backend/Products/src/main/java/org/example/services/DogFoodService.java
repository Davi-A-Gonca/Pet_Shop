package org.example.services;

import org.example.objects.DTO.DogFoodDTO;
import org.example.objects.DogFood;
import org.example.repositories.DogFoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DogFoodService {
    @Autowired
    private DogFoodRepository repository;

    public DogFood save(DogFoodDTO dto){
        DogFood dogFood = new DogFood(dto);
        repository.save(dogFood);
        return dogFood;
    }

    public Optional<DogFood> findById(UUID id){
        return repository.findById(id);
    }

    public List<DogFood> findAll(){
        return repository.findAll();
    }

    public void deleteById(UUID id){
        repository.deleteById(id);
    }
}
