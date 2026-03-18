package com.feedback.backend.dto;

import java.time.Instant;

public record ApiResponse(
    String message,
    Instant timestamp
) {
    public static ApiResponse ok(String message) {
        return new ApiResponse(message, Instant.now());
    }
}
