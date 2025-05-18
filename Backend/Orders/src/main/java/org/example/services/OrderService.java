package org.example.services;

import org.example.objects.DTO.OrderDTO;
import org.example.objects.Order;
import org.example.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderService {
    @Autowired
    private OrderRepository repository;

    public Order save(OrderDTO dto){
        Order portion = new Order(dto);
        repository.save(portion);
        return portion;
    }

    public Optional<Order> findById(UUID id){
        return repository.findById(id);
    }

    public List<Order> findAll(){
        return repository.findAll();
    }

    public void deleteById(UUID id){
        repository.deleteById(id);
    }
}
