package org.example.controllers;

import org.example.Constants;
import org.example.objects.DTO.ReviewDTO;
import org.example.objects.Review;
import org.example.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ReviewController {
    @Autowired
    private ReviewService service;

    @PostMapping(Constants.API_REVIEW)
    public ResponseEntity<Review> create(@RequestBody ReviewDTO dto){
        service.save(dto);

        Review r = new Review(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(r);
    }

    @GetMapping(Constants.API_REVIEW)
    public ResponseEntity<List<Review>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(Constants.API_REVIEW + "/{id}")
    public ResponseEntity<Optional<Review>> findById(@PathVariable("id") String id){
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(Constants.API_REVIEW)
    public ResponseEntity<Review> update(@RequestBody ReviewDTO dto){
        Review r = new Review(dto);
        return ResponseEntity.ok(r);
    }

    @DeleteMapping(Constants.API_REVIEW + "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") String id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
