package org.example.objects;

import lombok.Getter;
import lombok.Setter;
import org.example.objects.DTO.UserDTO;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document
@Getter
@Setter
public class User{

    private String id;
    private String name;
    private String password;

    public User(String id, String name, String password){
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

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
