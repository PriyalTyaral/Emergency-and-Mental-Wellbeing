package com.example.repository;

import com.example.model.Assessment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AssessmentRepository extends MongoRepository<Assessment, String> {}
