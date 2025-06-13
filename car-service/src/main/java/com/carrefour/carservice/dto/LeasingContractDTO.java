package com.carrefour.carservice.dto;

public record LeasingContractDTO(
        String id,
        String carId,
        String customerId,
        String startDate,
        String endDate,
        double dailyRate,
        boolean active
) {}