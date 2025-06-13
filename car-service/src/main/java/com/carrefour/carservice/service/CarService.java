package com.carrefour.carservice.service;

import com.carrefour.carservice.dto.CarDTO;

import java.util.List;

public interface CarService {
    List<CarDTO> getAllCars();
    CarDTO getCarById(String id);
    CarDTO createCar(CarDTO car);
    CarDTO updateAvailability(String id, boolean available);
}
