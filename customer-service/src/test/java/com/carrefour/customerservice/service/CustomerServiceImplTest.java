package com.carrefour.customerservice.service;

import com.carrefour.customerservice.dto.CustomerDTO;
import com.carrefour.customerservice.exception.CustomerNotFoundException;
import com.carrefour.customerservice.mapper.CustomerMapper;
import com.carrefour.customerservice.mapper.CustomerMapperImpl;
import com.carrefour.customerservice.model.Customer;
import com.carrefour.customerservice.repository.CustomerRepository;
import com.carrefour.customerservice.service.impl.CustomerServiceImpl;

import com.carrefour.eventData.CustomerDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class CustomerServiceImplTest {

    private CustomerRepository customerRepository;
    private CustomerServiceImpl customerService;

    @BeforeEach
    void setup() {
        customerRepository = mock(CustomerRepository.class);
        CustomerMapper customerMapper = new CustomerMapperImpl();
        customerService = new CustomerServiceImpl(customerRepository, customerMapper);
    }

    @Test
    void testGetAllCustomers() {
        Customer customer = Customer.builder()
                .id("1")
                .email("rahma@gmail.com")
                .phone("23021252")
                .firstName("rahma")
                .lastName("nefai")
                .driverLicenseNumber("2525455")
                .active(true)
                .build();

        when(customerRepository.findAll()).thenReturn(List.of(customer));

        var result = customerService.getAllCustomers();

        assertEquals(1, result.size());
        assertEquals("23021252", result.getFirst().getPhone());
    }

    @Test
    void testGetCustomerById_NotFound_ThrowsException() {
        when(customerRepository.findById("999")).thenReturn(Optional.empty());

        var exception = assertThrows(CustomerNotFoundException.class, () -> customerService.getCustomerById("999"));

        assertEquals("Customer with id 999 not found.", exception.getMessage());
        verify(customerRepository, times(1)).findById("999");
    }


    @Test
    void testCreateCustomer() {
        Customer savedCustomer = Customer.builder()
                .id("1")
                .email("rahma@gmail.com")
                .phone("23021252")
                .firstName("rahma")
                .lastName("nefai")
                .driverLicenseNumber("2525455")
                .active(true)
                .build();

        when(customerRepository.save(any())).thenReturn(savedCustomer);

        var customerDTO = CustomerDTO.builder()
                .email("rahma@gmail.com")
                .phone("23021252")
                .firstName("rahma")
                .lastName("nefai")
                .driverLicenseNumber("2525455")
                .active(true)
                .build();

        var result = customerService.createCustomer(customerDTO);

        assertNotNull(result);
        assertEquals("2525455", result.getDriverLicenseNumber());
        verify(customerRepository, times(1)).save(any());
    }

}