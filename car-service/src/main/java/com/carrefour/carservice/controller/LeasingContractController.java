package com.carrefour.carservice.controller;

import com.carrefour.carservice.dto.LeasingContractDTO;
import com.carrefour.carservice.service.LeasingContractService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@RestController
@RequestMapping("/api/contracts")
@Tag(name = "Leasing Contracts", description = "CRUD operations for vehicle leasing contracts")
public class LeasingContractController {

    private final LeasingContractService contractService;

    public LeasingContractController(LeasingContractService contractService) {
        this.contractService = contractService;
    }

    @Operation(summary = "Create a new leasing contract")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Contract created",
                    content = @Content(schema = @Schema(implementation = LeasingContractDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public ResponseEntity<LeasingContractDTO> createContract(@RequestBody LeasingContractDTO dto) {
        LeasingContractDTO created = contractService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @Operation(summary = "Get all leasing contracts")
    @ApiResponse(responseCode = "200", description = "List of contracts",
            content = @Content(schema = @Schema(implementation = LeasingContractDTO.class)))
    @GetMapping
    public ResponseEntity<List<LeasingContractDTO>> getAllContracts() {
        return ResponseEntity.ok(contractService.getAll());
    }

    @Operation(summary = "Get a leasing contract by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contract found"),
            @ApiResponse(responseCode = "404", description = "Contract not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<LeasingContractDTO> getContractById(@PathVariable String id) {
        return ResponseEntity.ok(contractService.getById(id));
    }

    @Operation(summary = "Update an existing contract")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Contract updated"),
            @ApiResponse(responseCode = "404", description = "Contract not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<LeasingContractDTO> updateContract(
            @PathVariable String id,
            @RequestBody LeasingContractDTO dto) {
        return ResponseEntity.ok(contractService.update(id, dto));
    }

    @Operation(summary = "Delete a leasing contract by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Contract deleted"),
            @ApiResponse(responseCode = "404", description = "Contract not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContract(@PathVariable String id) {
        contractService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
