

package com.assignment.tactical.report.model;

import com.assignment.tactical.report.enums.UserRole;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

@Data
@Document(collection = "users")
public class User implements UserDetails {

    @Id
    private String id;
    private String email;
    private String password;
    private UserRole role;
    private String username;
    private String resetToken;
    private String activationToken;
    private boolean isActive = false;

    private LocalDateTime resetTokenExpiry;
    private LocalDateTime activationTokenExpiry;

    public void generateActivationToken() {
        this.activationToken = java.util.UUID.randomUUID().toString();
        this.activationTokenExpiry = LocalDateTime.now().plusHours(24);
    }

    public boolean isActivationTokenExpired() {
        return activationTokenExpiry != null && activationTokenExpiry.isBefore(LocalDateTime.now());
    }

    public void generateResetToken() {
        this.resetToken = java.util.UUID.randomUUID().toString();
        this.resetTokenExpiry = LocalDateTime.now().plusHours(1);
    }

    public boolean isResetTokenExpired() {
        return resetTokenExpiry != null && resetTokenExpiry.isBefore(LocalDateTime.now());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(() -> role.name());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }
}
