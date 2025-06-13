package com.carrefour.carservice.mapper;

import com.carrefour.carservice.dto.CarDTO;
import com.carrefour.carservice.dto.LeasingContractDTO;
import com.carrefour.carservice.model.Car;
import com.carrefour.carservice.model.LeasingContract;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LeasingContractMapper {

    LeasingContractDTO toDTO(LeasingContract car);
    LeasingContract toEntity(LeasingContractDTO dto);
}
