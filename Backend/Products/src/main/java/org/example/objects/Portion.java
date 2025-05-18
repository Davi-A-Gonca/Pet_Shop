package org.example.objects;

import lombok.Getter;
import lombok.Setter;
import org.example.objects.DTO.PortionDTO;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document
@Getter
@Setter
public class Portion extends Consumables{

    public Portion(String name, String type, String description,
                   BigDecimal price, BigDecimal weight, boolean availability){
        super(name, type, description, price, weight, availability);
    }

    public Portion(PortionDTO dto){
        super(dto);
    }
}
