package com.carrefour.carservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CarDTO {
    private String id;
    private String brand;
    private String model;
    private boolean available;
}
