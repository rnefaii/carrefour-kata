package com.carrefour.customerservice.repository;

import com.carrefour.customerservice.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRepository extends MongoRepository<Customer, String> {
}