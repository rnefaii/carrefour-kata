package com.carrefour.carservice.mapper;

import com.carrefour.carservice.dto.CarDTO;
import com.carrefour.carservice.model.Car;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CarMapper {
    CarDTO toDTO(Car car);
    Car toEntity(CarDTO dto);
}