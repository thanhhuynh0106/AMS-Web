package com.ams.airManagement.service.interfac;

public interface NotificationService {
    void sendPaymentConfirmation(String toEmail, String subject, String content, boolean isHtml);
}