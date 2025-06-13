package com.carrefour.carservice.controller;

import com.carrefour.carservice.dto.CarDTO;
import com.carrefour.carservice.service.CarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
@Tag(name = "Car API", description = "Endpoints for managing cars")
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping
    @Operation(summary = "Get all cars")
    public List<CarDTO> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get car by ID")
    public CarDTO getCarById(@PathVariable String id) {
        return carService.getCarById(id);
    }

    @PostMapping
    @Operation(summary = "Create a new car")
    public CarDTO createCar(@Valid @RequestBody CarDTO car) {
        return carService.createCar(car);
    }

    @PutMapping("/{id}/availability")
    @Operation(summary = "Update car availability")
    public CarDTO updateAvailability(@PathVariable String id, @RequestParam boolean available) {
        return carService.updateAvailability(id, available);
    }
}