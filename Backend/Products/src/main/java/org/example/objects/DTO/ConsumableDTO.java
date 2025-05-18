package org.example.objects.DTO;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ConsumableDTO {
    private String name;
    private String type;
    private String description;
    private BigDecimal price;
    private BigDecimal weight;
    private boolean availability;

    public String getName() { return name; }

    public String getType() { return type; }

    public String getDescription() { return description; }

    public BigDecimal getPrice() { return price; }

    public BigDecimal getWeight() { return weight; }

    public boolean isAvailability() { return availability; }

    public void setName(String name) { this.name = name; }

    public void setType(String type) { this.type = type; }

    public void setDescription(String description) { this.description = description; }

    public void setPrice(BigDecimal price) { this.price = price; }

    public void setWeight(BigDecimal weight) { this.weight = weight; }

    public void setAvailability(boolean availability) { this.availability = availability; }
}