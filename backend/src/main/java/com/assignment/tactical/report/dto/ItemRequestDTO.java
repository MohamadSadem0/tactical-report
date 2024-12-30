package com.assignment.tactical.report.dto;

import lombok.Data;

@Data
public class ItemRequestDTO {
    private String name;
    private String description;
    private double price;

    public ItemRequestDTO(String updatedItem, String updatedDescription, double i) {
    }    public ItemRequestDTO() {
    }
}
