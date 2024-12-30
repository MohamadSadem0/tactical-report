package com.assignment.tactical.report.controller;

import com.assignment.tactical.report.dto.UserRequestDTO;
import com.assignment.tactical.report.dto.UserResponseDTO;
import com.assignment.tactical.report.exception.*;
import com.assignment.tactical.report.service.UserService;
import com.assignment.tactical.report.config.JwtService;
import com.assignment.tactical.report.model.User;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/public/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserRequestDTO requestDTO) {
        try {
            UserResponseDTO responseDTO = userService.createUser(requestDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "message", "User registered successfully. Please activate your account.",
                    "user", responseDTO
            ));
        } catch (DuplicateResourceException | AccountNotActivatedException ex) {
            return handleConflict(ex);
        } catch (Exception ex) {
            return handleServerError();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserRequestDTO requestDTO) {
        try {
            User user = userService.loadUserByEmail(requestDTO.getEmail());
            validatePassword(requestDTO.getPassword(), user.getPassword());

            String token = jwtService.generateToken(user);
            return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "token", token,
                    "role", user.getRole()
            ));
        } catch (UnauthorizedAccessException | ResourceNotFoundException ex) {
            return handleUnauthorized(ex);
        } catch (Exception ex) {
            return handleServerError();
        }
    }

    @GetMapping("/activate")
    public ResponseEntity<?> activateUser(@RequestParam("token") String token) {
        try {
            userService.activateUser(token);
            return ResponseEntity.ok(Map.of("message", "Account activated successfully"));
        } catch (InvalidTokenException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            return handleServerError();
        }
    }

    private void validatePassword(String rawPassword, String encodedPassword) {
        if (!passwordEncoder.matches(rawPassword, encodedPassword)) {
            throw new UnauthorizedAccessException("Invalid email or password");
        }
    }

    private ResponseEntity<?> handleConflict(Exception ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", ex.getMessage()));
    }

    private ResponseEntity<?> handleUnauthorized(Exception ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", ex.getMessage()));
    }

    private ResponseEntity<?> handleServerError() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "An unexpected error occurred. Please try again later."));
    }
}
