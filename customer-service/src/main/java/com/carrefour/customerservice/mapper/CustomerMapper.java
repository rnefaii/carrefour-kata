package com.carrefour.customerservice.mapper;

import com.carrefour.customerservice.model.Customer;
import com.carrefour.eventData.CustomerDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    CustomerDTO toDTO(Customer customer);
    Customer toEntity(CustomerDTO dto);
}