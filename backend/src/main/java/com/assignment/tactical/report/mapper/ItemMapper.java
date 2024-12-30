package com.assignment.tactical.report.mapper;

import com.assignment.tactical.report.dto.ItemRequestDTO;
import com.assignment.tactical.report.dto.ItemResponseDTO;
import com.assignment.tactical.report.model.Item;

public class ItemMapper {

    public static Item toItem(ItemRequestDTO dto) {
        Item item = new Item();
        item.setName(dto.getName());
        item.setDescription(dto.getDescription());
        item.setPrice(dto.getPrice());
        return item;
    }

    public static ItemResponseDTO toDTO(Item item) {
        ItemResponseDTO dto = new ItemResponseDTO();
        dto.setId(item.getId());
        dto.setName(item.getName());
        dto.setDescription(item.getDescription());
        dto.setPrice(item.getPrice());
        return dto;
    }
}
