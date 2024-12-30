package com.assignment.tactical.report.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.reset-password-url}")
    private String resetPasswordUrl;

    @Value("${app.activate-url}")
    private String activateEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }



    public void sendResetPasswordEmail(String recipientEmail, String token) {
        String resetLink = resetPasswordUrl + "reset-password?token=" + token;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientEmail);
        email.setSubject("Reset Your Password");
        email.setText("Click the link below to reset your password:\n" + resetLink);

        mailSender.send(email);
    }

    public void sendActivationEmail(String recipientEmail, String token) {
        String activationLink = activateEmail + "activate?token=" + token;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientEmail);
        email.setSubject("Activate Your Account");
        email.setText("Welcome! Please click the link below to activate your account:\n" + activationLink);

        mailSender.send(email);
    }

}
