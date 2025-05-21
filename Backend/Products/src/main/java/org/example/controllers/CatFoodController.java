package org.example.controllers;

import org.example.Constants;
import org.example.objects.DTO.CatFoodDTO;
import org.example.objects.CatFood;
import org.example.services.CatFoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class CatFoodController {
    @Autowired
    private CatFoodService service;

    @PostMapping(Constants.API_CAT_FOOD)
    public ResponseEntity<CatFood> create(@RequestBody CatFoodDTO dto){
        service.save(dto);

        CatFood catFood = new CatFood(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(catFood);
    }

    @GetMapping(Constants.API_CAT_FOOD)
    public ResponseEntity<List<CatFood>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(Constants.API_CAT_FOOD + "/{id}")
    public ResponseEntity<Optional<CatFood>> findById(@PathVariable("id") UUID id){
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(Constants.API_CAT_FOOD)
    public ResponseEntity<CatFood> update(@RequestBody CatFoodDTO dto){
        CatFood r = new CatFood(dto);
        return ResponseEntity.ok(r);
    }

    @DeleteMapping(Constants.API_CAT_FOOD + "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") UUID id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
