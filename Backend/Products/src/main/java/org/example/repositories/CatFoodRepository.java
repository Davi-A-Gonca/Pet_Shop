package org.example.repositories;

import org.example.objects.CatFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CatFoodRepository extends JpaRepository<CatFood, UUID> {
}
