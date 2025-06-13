package com.carrefour.carservice.service;

import com.carrefour.carservice.dto.LeasingContractDTO;

import java.util.List;
public interface LeasingContractService {

    LeasingContractDTO create(LeasingContractDTO contractDTO);
    LeasingContractDTO update(String id, LeasingContractDTO contractDTO);
    void delete(String id);
    List<LeasingContractDTO> getAll();
    LeasingContractDTO getById(String id);

}
