package org.example.controllers;

import org.example.Constants;
import org.example.objects.BirdFood;
import org.example.objects.DTO.BirdFoodDTO;
import org.example.services.BirdFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class BirdFoodController {
    @Autowired
    private BirdFoodService service;

    @PostMapping(Constants.API_BIRD_FOOD)
    public ResponseEntity<BirdFood> create(@RequestBody BirdFoodDTO dto){
        service.save(dto);

        BirdFood birdFood = new BirdFood(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(birdFood);
    }

    @GetMapping(Constants.API_BIRD_FOOD)
    public ResponseEntity<List<BirdFood>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(Constants.API_BIRD_FOOD + "/{id}")
    public ResponseEntity<Optional<BirdFood>> findById(@PathVariable("id") UUID id){
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(Constants.API_BIRD_FOOD)
    public ResponseEntity<BirdFood> update(@RequestBody BirdFoodDTO dto){
        BirdFood r = new BirdFood(dto);
        return ResponseEntity.ok(r);
    }

    @DeleteMapping(Constants.API_BIRD_FOOD + "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") UUID id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
