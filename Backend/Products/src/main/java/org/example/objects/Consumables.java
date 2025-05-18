package org.example.objects;

import org.example.Products;
import org.example.objects.DTO.ConsumableDTO;

import java.math.BigDecimal;

public class Consumables implements Products {
    private String name;
    private String type;
    private String description;
    private BigDecimal price;
    private BigDecimal weight;
    private boolean availability;

    public Consumables(String name, String type, String description,
                       BigDecimal price, BigDecimal weight, boolean availability){
        this.name = name;
        this.type = type;
        this.description = description;
        this.price = price;
        this.weight = weight;
        this.availability = availability;
    }

    public Consumables(ConsumableDTO dto){
        name = dto.getName();
        type = dto.getType();
        description = dto.getDescription();
        price = dto.getPrice();
        weight = dto.getWeight();
        availability = dto.isAvailability();
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public boolean isAvailability() {
        return availability;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }
}
