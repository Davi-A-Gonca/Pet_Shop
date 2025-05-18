package org.example.services;

import org.example.objects.DTO.UserDTO;
import org.example.objects.User;
import org.example.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public User save(UserDTO dto){
        User portion = new User(dto);
        repository.save(portion);
        return portion;
    }

    public Optional<User> findById(UUID id){
        return repository.findById(id);
    }

    public List<User> findAll(){
        return repository.findAll();
    }

    public void deleteById(UUID id){
        repository.deleteById(id);
    }
}
