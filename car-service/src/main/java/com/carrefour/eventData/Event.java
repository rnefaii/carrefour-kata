package com.carrefour.eventData;

import java.time.LocalDateTime;

public record Event(EventType type, CustomerDto customerDto, LocalDateTime eventCreatedAt){}