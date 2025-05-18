package org.example.services;

import org.example.objects.DTO.ReviewDTO;
import org.example.objects.Review;
import org.example.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository repository;

    public Review save(ReviewDTO dto){
        Review review = new Review(dto);
        repository.save(review);
        return review;
    }

    public Optional<Review> findById(String id){
        return repository.findById(id);
    }

    public List<Review> findAll(){
        return repository.findAll();
    }

    public void deleteById(String id){
        repository.deleteById(id);
    }
}
