package com.carrefour.customerservice.service.impl;

import com.carrefour.customerservice.events.KafkaProducer;
import com.carrefour.customerservice.exception.CustomerNotFoundException;
import com.carrefour.customerservice.mapper.CustomerMapper;
import com.carrefour.customerservice.model.Customer;
import com.carrefour.customerservice.repository.CustomerRepository;
import com.carrefour.customerservice.service.CustomerService;
import com.carrefour.eventData.CustomerDTO;
import com.carrefour.eventData.Event;
import com.carrefour.eventData.EventType;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    private final KafkaProducer kafkaProducer;

    public CustomerServiceImpl(CustomerRepository customerRepository, CustomerMapper customerMapper,
                               KafkaProducer kafkaProducer) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
        this.kafkaProducer = kafkaProducer;
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(customerMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDTO getCustomerById(String id) {
        return customerRepository.findById(id)
                .map(customerMapper::toDTO)
                .orElseThrow(() -> new CustomerNotFoundException(id));
    }

    @Override
    public CustomerDTO createCustomer(CustomerDTO customerDTO) {
        Customer customer = customerMapper.toEntity(customerDTO);
        customerDTO = customerMapper.toDTO(customerRepository.save(customer));
        kafkaProducer.produceEvent(new Event(EventType.CREATED_CUSTOMER_EVENT, customerDTO, LocalDateTime.now()));
        return customerDTO;
    }

}