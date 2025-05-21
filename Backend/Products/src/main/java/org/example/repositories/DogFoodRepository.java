package org.example.repositories;

import org.example.objects.DogFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DogFoodRepository extends JpaRepository<DogFood, UUID> {
}
