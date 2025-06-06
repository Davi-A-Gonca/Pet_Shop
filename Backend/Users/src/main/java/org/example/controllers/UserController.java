package org.example.controllers;

import org.example.Constants;
import org.example.objects.DTO.UserDTO;
import org.example.objects.User;
import org.example.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@RestController
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping(Constants.API_USER)
    public ResponseEntity<User> create(@RequestBody UserDTO dto){
        service.save(dto);

        User portion = new User(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(portion);
    }

    @GetMapping(Constants.API_USER)
    public ResponseEntity<List<User>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(Constants.API_USER + "/{id}")
    public ResponseEntity<Optional<User>> findById(@PathVariable("id") UUID id){
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping(Constants.API_USER)
    public ResponseEntity<User> update(@RequestBody UserDTO dto){
        User r = new User(dto);
        return ResponseEntity.ok(r);
    }

    @DeleteMapping(Constants.API_USER + "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") UUID id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(Constants.LOGIN)
    public ResponseEntity<Boolean> login(@RequestBody UserDTO dto){
        List<User> users = service.findAll();

        for (User u : users){
            if (Objects.equals(u.getName(), dto.getName()) && Objects.equals(u.getPassword(), dto.getPassword())){
                System.out.println("Usuário " + dto.getName() + " efetuou Login com Sucesso!!!");
                return ResponseEntity.ok(true);
            }
        }

        return ResponseEntity.notFound().build();
    }
}
