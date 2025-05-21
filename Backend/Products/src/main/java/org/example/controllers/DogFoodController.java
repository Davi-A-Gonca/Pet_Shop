package org.example.controllers;

import org.example.Constants;
import org.example.objects.DTO.DogFoodDTO;
import org.example.objects.DogFood;
import org.example.services.DogFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class DogFoodController {
    @Autowired
    private DogFoodService service;

    @PostMapping(Constants.API_DOG_FOOD)
    public ResponseEntity<DogFood> create(@RequestBody DogFoodDTO dto){
        service.save(dto);

        DogFood dogFood = new DogFood(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(dogFood);
    }

    @GetMapping(Constants.API_DOG_FOOD)
    public ResponseEntity<List<DogFood>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(Constants.API_DOG_FOOD + "/{id}")
    public ResponseEntity<Optional<DogFood>> findById(@PathVariable("id") UUID id){
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(Constants.API_DOG_FOOD)
    public ResponseEntity<DogFood> update(@RequestBody DogFoodDTO dto){
        DogFood r = new DogFood(dto);
        return ResponseEntity.ok(r);
    }

    @DeleteMapping(Constants.API_DOG_FOOD + "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") UUID id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
