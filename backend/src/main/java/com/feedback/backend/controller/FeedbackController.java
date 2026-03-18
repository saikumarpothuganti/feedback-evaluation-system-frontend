package com.feedback.backend.controller;

import com.feedback.backend.dto.ApiResponse;
import com.feedback.backend.dto.FeedbackRequest;
import com.feedback.backend.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse> submit(@Valid @RequestBody FeedbackRequest request) {
        String message = feedbackService.submitFeedback(request);
        return ResponseEntity.ok(ApiResponse.ok(message));
    }
}
