package com.feedback.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record FeedbackRequest(
    @NotBlank(message = "studentId is required")
    String studentId,

    @NotBlank(message = "courseId is required")
    String courseId,

    @Min(value = 1, message = "rating must be at least 1")
    @Max(value = 5, message = "rating must not exceed 5")
    int rating,

    @NotBlank(message = "comments are required")
    String comments
) {}
