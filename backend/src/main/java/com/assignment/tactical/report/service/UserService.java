package com.assignment.tactical.report.service;

import com.assignment.tactical.report.dto.UserRequestDTO;
import com.assignment.tactical.report.dto.UserResponseDTO;
import com.assignment.tactical.report.enums.UserRole;
import com.assignment.tactical.report.exception.*;
import com.assignment.tactical.report.mapper.UserMapper;
import com.assignment.tactical.report.model.User;
import com.assignment.tactical.report.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Value("${app.reset-password-url}")
    private String resetPasswordUrl;

    public UserResponseDTO createUser(UserRequestDTO request) {
        userRepository.findByEmail(request.getEmail()).ifPresent(user -> {
            if (!user.isActive()) {
                resendActivationEmail(user);
                throw new AccountNotActivatedException("An account with this email exists but is not activated. Activation email resent.");
            }
            throw new DuplicateResourceException("An account with this email already exists.");
        });

        User newUser = prepareNewUser(request);
        emailService.sendActivationEmail(newUser.getEmail(), newUser.getActivationToken());

        return UserMapper.toDTO(userRepository.save(newUser));
    }

    private User prepareNewUser(UserRequestDTO request) {
        User user = UserMapper.toUser(request);
        user.setRole(UserRole.USER);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setActive(false);
        user.generateActivationToken();
        return user;
    }

    private void resendActivationEmail(User user) {
        user.generateActivationToken();
        user.setActivationTokenExpiry(LocalDateTime.now().plusHours(24));
        userRepository.save(user);
        emailService.sendActivationEmail(user.getEmail(), user.getActivationToken());
    }

    public void activateUser(String token) {
        User user = userRepository.findByActivationToken(token)
                .filter(u -> u.getActivationTokenExpiry().isAfter(LocalDateTime.now()))
                .orElseThrow(() -> new InvalidTokenException("Invalid or expired activation token"));

        user.setActive(true);
        user.setActivationToken(null);
        user.setActivationTokenExpiry(null);
        userRepository.save(user);
    }

    public UserResponseDTO getUserByEmail(String email) {
        return UserMapper.toDTO(loadUserByEmail(email));
    }

    public User loadUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public void requestPasswordReset(String email) {
        User user = loadUserByEmail(email);
        if (!user.isActive()) {
            throw new AccountNotActivatedException("Activate your account before requesting a password reset.");
        }
        user.generateResetToken();
        userRepository.save(user);
        emailService.sendResetPasswordEmail(email, user.getResetToken());
    }

    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new InvalidTokenException("Invalid reset token"));

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        userRepository.save(user);
    }
}
