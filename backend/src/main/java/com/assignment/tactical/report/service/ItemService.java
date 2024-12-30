package com.assignment.tactical.report.service;

import com.assignment.tactical.report.dto.ItemRequestDTO;
import com.assignment.tactical.report.dto.ItemResponseDTO;
import com.assignment.tactical.report.mapper.ItemMapper;
import com.assignment.tactical.report.model.Item;
import com.assignment.tactical.report.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemResponseDTO createItem(ItemRequestDTO request) {
        if (itemRepository.findByName(request.getName()).isPresent()) {
            throw new IllegalArgumentException("An item with the same name already exists.");
        }

        Item item = ItemMapper.toItem(request);
        Item savedItem = itemRepository.save(item);
        return ItemMapper.toDTO(savedItem);
    }

    public List<ItemResponseDTO> getAllItems() {
        return itemRepository.findAll().stream()
                .map(ItemMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ItemResponseDTO getItemById(String id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Item not found."));
        return ItemMapper.toDTO(item);
    }

    public ItemResponseDTO updateItem(String id, ItemRequestDTO request) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Item not found."));

        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setPrice(request.getPrice());

        Item updatedItem = itemRepository.save(item);
        return ItemMapper.toDTO(updatedItem);
    }

    public void deleteItem(String id) {
        if (!itemRepository.existsById(id)) {
            throw new IllegalArgumentException("Item not found.");
        }
        itemRepository.deleteById(id);
    }
}
