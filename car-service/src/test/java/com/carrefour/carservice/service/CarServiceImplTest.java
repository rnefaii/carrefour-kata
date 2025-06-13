package com.carrefour.carservice.service;

import com.carrefour.carservice.dto.CarDTO;
import com.carrefour.carservice.exception.CarNotFoundException;
import com.carrefour.carservice.mapper.CarMapper;
import com.carrefour.carservice.mapper.CarMapperImpl;
import com.carrefour.carservice.model.Car;
import com.carrefour.carservice.repository.CarRepository;
import com.carrefour.carservice.service.impl.CarServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CarServiceImplTest {

    private CarRepository carRepository;
    private CarServiceImpl carService;

    @BeforeEach
    void setup() {
        carRepository = mock(CarRepository.class);
        CarMapper carMapper = new CarMapperImpl();
        carService = new CarServiceImpl(carRepository, carMapper);
    }

    @Test
    void testGetAllCars() {
        Car car = Car.builder()
                .id("1")
                .brand("Toyota")
                .model("Yaris")
                .available(true)
                .build();

        when(carRepository.findAll()).thenReturn(List.of(car));

        var result = carService.getAllCars();

        assertEquals(1, result.size());
        assertEquals("Toyota", result.getFirst().getBrand());
    }

    @Test
    void testGetCarById_NotFound_ThrowsException() {
        when(carRepository.findById("999")).thenReturn(Optional.empty());

        var exception = assertThrows(CarNotFoundException.class, () -> carService.getCarById("999"));

        assertEquals("Car with id 999 not found.", exception.getMessage());
        verify(carRepository, times(1)).findById("999");
    }


    @Test
    void testCreateCar() {
        Car savedCar = Car.builder()
                .id("1")
                .brand("Honda")
                .model("Civic")
                .available(true)
                .build();

        when(carRepository.save(any())).thenReturn(savedCar);

        var carDTO = CarDTO.builder()
                .brand("Honda")
                .model("Civic")
                .build();

        var result = carService.createCar(carDTO);

        assertNotNull(result);
        assertEquals("Civic", result.getModel());
        assertTrue(result.isAvailable());
        verify(carRepository, times(1)).save(any());
    }

    @Test
    void testUpdateAvailability() {
        Car existingCar = Car.builder()
                .id("1")
                .brand("BMW")
                .model("X1")
                .available(false)
                .build();

        Car updatedCar = Car.builder()
                .id("1")
                .brand("BMW")
                .model("X1")
                .available(true)
                .build();

        when(carRepository.findById("1")).thenReturn(Optional.of(existingCar));
        when(carRepository.save(any())).thenReturn(updatedCar);

        var result = carService.updateAvailability("1", true);

        assertTrue(result.isAvailable());
        assertEquals("BMW", result.getBrand());
    }
}
