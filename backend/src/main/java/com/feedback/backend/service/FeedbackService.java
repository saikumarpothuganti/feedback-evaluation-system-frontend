package com.feedback.backend.service;

import com.feedback.backend.dto.FeedbackRequest;
import com.feedback.backend.entity.Feedback;
import com.feedback.backend.repository.FeedbackRepository;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public String submitFeedback(FeedbackRequest request) {
        Feedback feedback = new Feedback();
        feedback.setStudentId(request.studentId());
        feedback.setCourseId(request.courseId());
        feedback.setRating(request.rating());
        feedback.setComments(request.comments());

        Feedback saved = feedbackRepository.save(feedback);
        return "Feedback saved with id " + saved.getId();
    }
}
