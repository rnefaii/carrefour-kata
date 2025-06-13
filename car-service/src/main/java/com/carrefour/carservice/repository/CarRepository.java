package com.carrefour.carservice.repository;

import com.carrefour.carservice.model.Car;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CarRepository extends MongoRepository<Car, String> {
}