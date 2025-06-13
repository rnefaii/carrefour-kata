package com.carrefour.carservice.service.impl;

import com.carrefour.carservice.dto.LeasingContractDTO;
import com.carrefour.carservice.mapper.LeasingContractMapper;
import com.carrefour.carservice.model.LeasingContract;
import com.carrefour.carservice.repository.LeasingContractRepository;
import com.carrefour.carservice.service.LeasingContractService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class LeasingContractServiceImpl implements LeasingContractService {

    private final LeasingContractRepository repository;
    private final LeasingContractMapper mapper;

    public LeasingContractServiceImpl(LeasingContractRepository repository, LeasingContractMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public LeasingContractDTO create(LeasingContractDTO dto) {
        LeasingContract entity = mapper.toEntity(dto);
        entity.setActive(true);
        LeasingContract saved = repository.save(entity);
        return mapper.toDTO(saved);
    }

    @Override
    public LeasingContractDTO update(String id, LeasingContractDTO dto) {
        if (!repository.existsById(id)) {
            throw new NoSuchElementException("Contract not found");
        }
        LeasingContract entity = mapper.toEntity(dto);
        entity.setId(id);
        return mapper.toDTO(repository.save(entity));
    }

    @Override
    public void delete(String id) {
        repository.deleteById(id);
    }

    @Override
    public List<LeasingContractDTO> getAll() {
        return repository.findAll().stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public LeasingContractDTO getById(String id) {
        return repository.findById(id)
                .map(mapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Contract not found"));
    }
}
