package com.carrefour.carservice.repository;

import com.carrefour.carservice.model.LeasingContract;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LeasingContractRepository extends MongoRepository<LeasingContract, String> {

    List<LeasingContract> findByCustomerId(String customerId);
    List<LeasingContract> findByCarId(String carId);
    List<LeasingContract> findByActiveTrue();
}
