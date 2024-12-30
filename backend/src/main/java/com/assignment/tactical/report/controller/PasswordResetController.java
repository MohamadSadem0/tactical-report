package com.assignment.tactical.report.controller;

import com.assignment.tactical.report.dto.ResetPasswordRequest;
import com.assignment.tactical.report.exception.AccountNotActivatedException;
import com.assignment.tactical.report.exception.InvalidTokenException;
import com.assignment.tactical.report.exception.ResourceNotFoundException;
import com.assignment.tactical.report.service.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PasswordResetController {

    @Autowired
    private UserService userService;

    @PostMapping("public/request-password-reset")
    public ResponseEntity<?> requestPasswordReset(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            userService.requestPasswordReset(email);
            return ResponseEntity.ok("Password reset link sent to your email");
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
        } catch (AccountNotActivatedException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "An unexpected error occurred"));
        }
    }

    @PostMapping("/public/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetRequest) {
        try {
            userService.resetPassword(resetRequest.getToken(), resetRequest.getNewPassword());
            return ResponseEntity.ok("Password has been reset successfully");
        } catch (InvalidTokenException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "An unexpected error occurred"));
        }
    }
}
