package org.example.objects.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FilmDTO {
    private String name;

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public String getName() {
        return name;
    }

    private String description;
}