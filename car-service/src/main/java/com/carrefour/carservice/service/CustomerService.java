package com.carrefour.carservice.service;

import com.carrefour.carservice.model.Customer;

public interface CustomerService {
    void add(Customer customer);
    void update(Customer customer);
    void delete(String customerId);
}
