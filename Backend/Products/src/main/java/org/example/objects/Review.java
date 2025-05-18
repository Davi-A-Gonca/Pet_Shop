package org.example.objects;

import lombok.Getter;
import lombok.Setter;
import org.example.objects.DTO.ReviewDTO;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document
@Getter
@Setter
public class Review {
    private String id;
    private String film;
    private BigDecimal rating;
    private String note;

    public Review(){}

    public Review(String id, String film, BigDecimal rating, String note){
        this.id = id;
        this.film = film;
        this.rating = rating;
        this.note = note;
    }

    public Review(ReviewDTO dto){
        film = dto.getFilm();
        rating = dto.getRating();
        note = dto.getNote();
    }
}
