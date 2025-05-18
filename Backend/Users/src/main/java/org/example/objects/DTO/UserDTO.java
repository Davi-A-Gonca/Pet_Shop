package org.example.objects.DTO;

public class UserDTO{
    private String id;
    private String name;
    private String password;

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public String getId() {
        return id;
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
