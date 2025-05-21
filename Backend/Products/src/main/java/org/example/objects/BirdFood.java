package org.example.objects;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.example.objects.DTO.BirdFoodDTO;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "db_bird_food")
public class BirdFood extends Consumables{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    public BirdFood(UUID id, String name, String type, String description,
                    BigDecimal price, BigDecimal weight, boolean availability){
        super(name, type, description, price, weight, availability);
        this.id = id;
    }

    public BirdFood(BirdFoodDTO dto){
        super(dto);
    }

    public BirdFood(){}

    public UUID getId() {
        return id;
    }

    @Override
    public String getName() {
        return super.getName();
    }

    @Override
    public String getType() {
        return super.getType();
    }

    @Override
    public String getDescription() {
        return super.getDescription();
    }

    @Override
    public BigDecimal getPrice() {
        return super.getPrice();
    }

    @Override
    public BigDecimal getWeight() {
        return super.getWeight();
    }

    @Override
    public boolean isAvailability() {
        return super.isAvailability();
    }

    public void setId(UUID id) {
        this.id = id;
    }

    @Override
    public void setName(String name) {
        super.setName(name);
    }

    @Override
    public void setType(String type) {
        super.setType(type);
    }

    @Override
    public void setDescription(String description) {
        super.setDescription(description);
    }

    @Override
    public void setPrice(BigDecimal price) {
        super.setPrice(price);
    }

    @Override
    public void setWeight(BigDecimal weight) {
        super.setWeight(weight);
    }

    @Override
    public void setAvailability(boolean availability) {
        super.setAvailability(availability);
    }
}
