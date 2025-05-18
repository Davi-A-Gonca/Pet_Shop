package org.example.repositories;

import org.example.objects.Portion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PortionRepository extends MongoRepository<Portion, String> {
}
