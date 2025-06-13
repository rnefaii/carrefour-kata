package com.carrefour.customerservice.exception;

public class CustomerNotFoundException extends RuntimeException {
    public CustomerNotFoundException(String id) {

        super("Customer with id " + id + " not found.");
    }
}