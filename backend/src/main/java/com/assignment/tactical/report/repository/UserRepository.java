package com.assignment.tactical.report.repository;

import com.assignment.tactical.report.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User>  findByActivationToken(String token);
    Optional<User> findByResetToken(String resetToken);

}
