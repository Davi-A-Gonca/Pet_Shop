package org.example.services;

import org.example.objects.DTO.PaymentDTO;
import org.example.objects.Payment;
import org.example.repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository repository;

    public Payment save(PaymentDTO dto){
        Payment payment = new Payment(dto);
        repository.save(payment);
        return payment;
    }

    public Optional<Payment> findById(UUID id){
        return repository.findById(id);
    }

    public List<Payment> findAll(){
        return repository.findAll();
    }

    public void deleteById(UUID id){
        repository.deleteById(id);
    }

}
