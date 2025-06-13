package com.carrefour.carservice.exception;

public class CarNotFoundException extends RuntimeException {
    public CarNotFoundException(String id) {
        super("Car with id " + id + " not found.");
    }
}