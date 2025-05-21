package org.example.repositories;

import org.example.objects.BirdFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BirdFoodRepository extends JpaRepository<BirdFood, UUID> {
}
