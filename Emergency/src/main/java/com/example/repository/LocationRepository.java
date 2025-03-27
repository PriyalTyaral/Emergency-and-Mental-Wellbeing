package com.example.repository;

import com.example.model.Location;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface LocationRepository extends MongoRepository<Location, String> {
    Optional<Location> findByPhoneNumber(String phoneNumber);
}
