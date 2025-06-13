package com.carrefour.carservice.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.carrefour.carservice.dto.LeasingContractDTO;
import com.carrefour.carservice.mapper.LeasingContractMapper;
import com.carrefour.carservice.model.LeasingContract;
import com.carrefour.carservice.repository.LeasingContractRepository;
import com.carrefour.carservice.service.impl.LeasingContractServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class LeasingContractServiceImplTest {

    @Mock
    private LeasingContractRepository repository;

    @Mock
    private LeasingContractMapper mapper;

    @InjectMocks
    private LeasingContractServiceImpl service;

    private LeasingContract entity;
    private LeasingContractDTO dto;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);

        entity = new LeasingContract();
        entity.setId("1");
        entity.setCarId("car-1");
        entity.setCustomerId("cust-1");
        entity.setStartDate(LocalDate.parse("2025-01-01"));
        entity.setEndDate(LocalDate.parse("2026-01-01"));
        entity.setDailyRate(499.99);
        entity.setActive(true);

        dto = new LeasingContractDTO(
                "1", "car-1", "cust-1",
                "2025-01-01", "2026-01-01",
                499.99, true
        );
    }

    @Test
    void testCreateContract() {
        when(mapper.toEntity(dto)).thenReturn(entity);
        when(repository.save(entity)).thenReturn(entity);
        when(mapper.toDTO(entity)).thenReturn(dto);

        LeasingContractDTO result = service.create(dto);

        assertEquals("1", result.id());
        verify(repository, times(1)).save(any());
    }

    @Test
    void testGetByIdSuccess() {
        when(repository.findById("1")).thenReturn(Optional.of(entity));
        when(mapper.toDTO(entity)).thenReturn(dto);

        LeasingContractDTO result = service.getById("1");

        assertEquals("cust-1", result.customerId());
    }

    @Test
    void testGetByIdNotFound() {
        when(repository.findById("99")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> service.getById("99"));
    }

    @Test
    void testGetAllContracts() {
        when(repository.findAll()).thenReturn(List.of(entity));
        when(mapper.toDTO(entity)).thenReturn(dto);

        List<LeasingContractDTO> results = service.getAll();

        assertEquals(1, results.size());
        assertEquals("1", results.get(0).id());
    }

    @Test
    void testUpdateContract() {
        when(repository.existsById("1")).thenReturn(true);
        when(mapper.toEntity(dto)).thenReturn(entity);
        when(repository.save(entity)).thenReturn(entity);
        when(mapper.toDTO(entity)).thenReturn(dto);

        LeasingContractDTO result = service.update("1", dto);

        assertEquals("1", result.id());
    }

    @Test
    void testDeleteContract() {
        service.delete("1");
        verify(repository, times(1)).deleteById("1");
    }
}
