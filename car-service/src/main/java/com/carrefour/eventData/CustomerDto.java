package com.carrefour.eventData;

import com.carrefour.carservice.model.Customer;
public record CustomerDto(String id, String username) {
    public static Customer mapToCustomer(CustomerDto customerDto) {
        return new Customer(customerDto.id(), customerDto.username());
    }
}