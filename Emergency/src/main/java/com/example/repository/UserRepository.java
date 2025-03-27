package com.example.repository; // Updated to lowercase

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.model.User;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
