package com.assignment.tactical.report.repository;

import com.assignment.tactical.report.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ItemRepository extends MongoRepository<Item, String> {
    Optional<Item> findByName(String name);
}
