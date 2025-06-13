package com.carrefour.carservice.service.impl;

import com.carrefour.carservice.dto.CarDTO;
import com.carrefour.carservice.exception.CarNotFoundException;
import com.carrefour.carservice.mapper.CarMapper;
import com.carrefour.carservice.model.Car;
import com.carrefour.carservice.repository.CarRepository;
import com.carrefour.carservice.service.CarService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;
    private final CarMapper carMapper;

    public CarServiceImpl(CarRepository carRepository, CarMapper carMapper) {
        this.carRepository = carRepository;
        this.carMapper = carMapper;
    }

    @Override
    public List<CarDTO> getAllCars() {
        return carRepository.findAll().stream()
                .map(carMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CarDTO getCarById(String id) {
        return carRepository.findById(id)
                .map(carMapper::toDTO)
                .orElseThrow(() -> new CarNotFoundException(id));
    }

    @Override
    public CarDTO createCar(CarDTO carDTO) {
        Car car = carMapper.toEntity(carDTO);
        car.setAvailable(true);
        return carMapper.toDTO(carRepository.save(car));
    }

    @Override
    public CarDTO updateAvailability(String id, boolean available) {
        Car car = carRepository.findById(id).orElseThrow(() -> new CarNotFoundException(id));
        car.setAvailable(available);
        return carMapper.toDTO(carRepository.save(car));
    }
}