package org.example.controllers;

import org.example.Constants;
import org.example.objects.DTO.PortionDTO;
import org.example.objects.Portion;
import org.example.services.PortionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PortionController {
    @Autowired
    private PortionService service;

    @PostMapping(Constants.API_PORTION)
    public ResponseEntity<Portion> create(@RequestBody PortionDTO dto){
        service.save(dto);

        Portion portion = new Portion(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(portion);
    }

    @GetMapping(Constants.API_PORTION)
    public ResponseEntity<List<Portion>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(Constants.API_PORTION + "/{id}")
    public ResponseEntity<Optional<Portion>> findById(@PathVariable("id") String id){
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(Constants.API_PORTION)
    public ResponseEntity<Portion> update(@RequestBody PortionDTO dto){
        Portion r = new Portion(dto);
        return ResponseEntity.ok(r);
    }

    @DeleteMapping(Constants.API_PORTION + "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") String id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
