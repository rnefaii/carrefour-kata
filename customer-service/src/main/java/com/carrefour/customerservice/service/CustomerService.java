package com.carrefour.customerservice.service;

import com.carrefour.eventData.CustomerDTO;

import java.util.List;

public interface CustomerService {
    List<CustomerDTO> getAllCustomers();
    CustomerDTO getCustomerById(String id);
    CustomerDTO createCustomer(CustomerDTO customer);
}