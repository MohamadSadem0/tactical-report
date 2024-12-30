package com.assignment.tactical.report.mapper;

import com.assignment.tactical.report.dto.UserRequestDTO;
import com.assignment.tactical.report.dto.UserResponseDTO;
import com.assignment.tactical.report.model.User;

public class UserMapper {

    public static User toUser(UserRequestDTO dto) {
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setUsername(dto.getUsername());
        return user;
    }

    public static UserResponseDTO toDTO(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setEmail(user.getEmail());
        dto.setUsername(user.getUsername());
        dto.setRole(user.getRole().name());
        return dto;
    }
}