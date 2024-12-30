package com.assignment.tactical.report.controller;

import com.assignment.tactical.report.dto.ItemRequestDTO;
import com.assignment.tactical.report.dto.ItemResponseDTO;
import com.assignment.tactical.report.service.ItemService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/admin/items/create")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createItem(@RequestBody ItemRequestDTO requestDTO) {
        try {
            ItemResponseDTO responseDTO = itemService.createItem(requestDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Item created successfully");
            response.put("item", responseDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred. Please try again later."));
        }
    }

    @GetMapping("public/items")
    public ResponseEntity<?> getAllItems() {
        try {
            List<ItemResponseDTO> items = itemService.getAllItems();
            return ResponseEntity.ok(Map.of("items", items));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred while fetching items."));
        }
    }


    @GetMapping("public/items/{id}")
    public ResponseEntity<?> getItemById(@PathVariable String id) {
        try {
            ItemResponseDTO item = itemService.getItemById(id);
            return ResponseEntity.ok(Map.of("item", item));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred while fetching the item."));
        }
    }


    @PutMapping("admin/items/{id}")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateItem(@PathVariable String id, @RequestBody ItemRequestDTO requestDTO) {
        try {
            ItemResponseDTO responseDTO = itemService.updateItem(id, requestDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Item updated successfully");
            response.put("item", responseDTO);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred while updating the item."));
        }
    }


    @DeleteMapping("admin/items/{id}")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteItem(@PathVariable String id) {
        try {
            itemService.deleteItem(id);
            return ResponseEntity.ok(Map.of("message", "Item deleted successfully"));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An unexpected error occurred while deleting the item."));
        }
    }
}
