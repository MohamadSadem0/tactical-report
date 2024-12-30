package com.assignment.tactical.report.dto;

import lombok.Data;

@Data
public class ItemResponseDTO {
    private String id;
    private String name;
    private String description;
    private double price;

    public ItemResponseDTO(String number, String s, String s1, double v) {
    }    public ItemResponseDTO() {
    }
}
