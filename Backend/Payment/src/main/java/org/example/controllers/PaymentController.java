package org.example.controllers;

import org.example.Constants;
import org.example.objects.DTO.PaymentDTO;
import org.example.objects.Payment;
import org.example.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class PaymentController {
    @Autowired
    private PaymentService service;

    @PostMapping(Constants.API_PAYMENT)
    public ResponseEntity<Payment> create(@RequestBody PaymentDTO dto){
        service.save(dto);

        Payment payment = new Payment(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(payment);
    }

    @GetMapping(Constants.API_PAYMENT)
    public ResponseEntity<List<Payment>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(Constants.API_PAYMENT + "/{id}")
    public ResponseEntity<Optional<Payment>> findById(@PathVariable("id") UUID id){
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(Constants.API_PAYMENT + "/{id}")
    public ResponseEntity<Payment> update(@RequestBody PaymentDTO dto){
        Payment payment = new Payment(dto);
        return ResponseEntity.ok(payment);
    }

    @DeleteMapping(Constants.API_PAYMENT + "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") UUID id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
