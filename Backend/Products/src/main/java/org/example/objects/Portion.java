package org.example.objects;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.example.objects.DTO.PortionDTO;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "db_portion")
public class Portion extends Consumables{

    public Portion(String name, String type, String description,
                   BigDecimal price, BigDecimal weight, boolean availability){
        super(name, type, description, price, weight, availability);
    }

    public Portion(PortionDTO dto){
        super(dto);
    }
}
