package com.carrefour.carservice.service.impl;

import com.carrefour.carservice.model.Customer;
import com.carrefour.carservice.repository.CustomerRepository;
import com.carrefour.carservice.service.CustomerService;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public void add(Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    @Transactional
    public void update(Customer customer) {
        if (!customerRepository.existsById(customer.getId())) {
            throw new IllegalArgumentException("Customer with ID " + customer.getId() + " does not exist.");
        }
        customerRepository.save(customer);
    }

    @Override
    @Transactional
    public void delete(String customerId) {
        if (!customerRepository.existsById(customerId)) {
            throw new IllegalArgumentException("Customer with ID " + customerId + " does not exist.");
        }
        customerRepository.deleteById(customerId);
    }
}
