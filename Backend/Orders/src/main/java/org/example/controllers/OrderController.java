package org.example.controllers;

import org.example.Constants;
import org.example.objects.DTO.OrderDTO;
import org.example.objects.Order;
import org.example.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class OrderController {
    @Autowired
    private OrderService service;

    @PostMapping(Constants.API_ORDER)
    public ResponseEntity<Order> create(@RequestBody OrderDTO dto){
        service.save(dto);

        Order portion = new Order(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(portion);
    }

    @GetMapping(Constants.API_ORDER)
    public ResponseEntity<List<Order>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(Constants.API_ORDER + "/{id}")
    public ResponseEntity<Optional<Order>> findById(@PathVariable("id") UUID id){
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(Constants.API_ORDER)
    public ResponseEntity<Order> update(@RequestBody OrderDTO dto){
        Order r = new Order(dto);
        return ResponseEntity.ok(r);
    }

    @DeleteMapping(Constants.API_ORDER + "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") UUID id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
