package org.example.objects;

import jakarta.persistence.*;
import org.example.objects.DTO.UserDTO;

import java.util.UUID;

@Entity
@Table(name = "db_user")
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String name;
    private String password;

    public User(UUID id, String name, String password){
        this.id = id;
        this.name = name;
        this.password = password;
    }

    public User(UserDTO dto){
        id = dto.getId();
        name = dto.getName();
        password = dto.getPassword();
    }

    public User(){}

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
