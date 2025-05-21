package org.example.objects;

import jakarta.persistence.*;
import org.example.Products;
import org.example.objects.DTO.ConsumableDTO;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class Consumables implements Products {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name="nameOfProduct")
    private String name;

    @Column(name="typeOfProduct")
    private String type;

    @Column(name="description")
    private String description;

    @Column(name="price")
    private BigDecimal price;

    @Column(name="wheight")
    private BigDecimal weight;

    @Column(name="productIsAvaliable")
    private boolean availability;

    public Consumables(UUID id, String name, String type, String description,
                       BigDecimal price, BigDecimal weight, boolean availability){
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.price = price;
        this.weight = weight;
        this.availability = availability;
    }

    public Consumables(ConsumableDTO dto){
        id = dto.getId();
        name = dto.getName();
        type = dto.getType();
        description = dto.getDescription();
        price = dto.getPrice();
        weight = dto.getWeight();
        availability = dto.isAvailability();
    }

    public Consumables(){}

    public UUID getId(){return id;}

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

    public void setId(UUID id){this.id = id;}

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
