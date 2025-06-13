package com.carrefour.carservice.events;

import com.carrefour.carservice.service.CustomerService;
import com.carrefour.eventData.CustomerDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerEventHandler {
    private final CustomerService customerService;

    public void handleCustomerCreatedEvent(CustomerDto productDto) {
        customerService.add(CustomerDto.mapToCustomer(productDto));
    }

    public void handleCustomerUpdatedEvent(CustomerDto productDto) {
        customerService.update(CustomerDto.mapToCustomer(productDto));
    }

    public void handleCustomerDeletedEvent(String customerId) {
        customerService.delete(customerId);
    }
}
