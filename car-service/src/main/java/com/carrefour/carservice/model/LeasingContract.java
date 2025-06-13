package com.carrefour.carservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "leasing_contracts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeasingContract {

    @Id
    private String id;
    private String carId;
    private String customerId;
    private LocalDate startDate;
    private LocalDate endDate;
    private double dailyRate;
    private boolean active;
}
