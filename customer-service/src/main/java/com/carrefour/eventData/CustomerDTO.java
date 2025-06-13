package com.carrefour.eventData;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerDTO {

    private String id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String phone;

    private String driverLicenseNumber;
    private boolean active;
}