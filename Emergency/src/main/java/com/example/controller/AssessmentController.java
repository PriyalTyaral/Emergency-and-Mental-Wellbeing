package com.example.controller;

import com.example.model.Assessment;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/assessment")
@CrossOrigin(origins = "http://localhost:5173")
public class AssessmentController {

    // Predefined questions
    @GetMapping("/questions")
    public List<Assessment> getDefaultQuestions() {
        return Arrays.asList(
            new Assessment("Do you often feel sad or empty?", 0),
            new Assessment("Do you experience sleep disturbances?", 0),
            new Assessment("Do you have difficulty concentrating?", 0),
            new Assessment("Do you feel tired most of the time?", 0),
            new Assessment("Do you find little interest in activities?", 0),
            new Assessment("Do you experience appetite changes?", 0),
            new Assessment("Do you feel worthless or guilty?", 0),
            new Assessment("Do you have trouble making decisions?", 0),
            new Assessment("Do you experience anxiety frequently?", 0),
            new Assessment("Have you had thoughts of self-harm?", 0)
        );
    }

    // Evaluate test score
    @PostMapping("/submit")
    public String evaluateScore(@RequestBody List<Integer> scores) {
        int totalScore = scores.stream().mapToInt(Integer::intValue).sum();
        String result;
        String recommendation = "";

        // Adjust score ranges for depression level (out of 50)
        if (totalScore <= 10) {
            result = "Minimal Depression";
        } else if (totalScore <= 20) {
            result = "Mild Depression";
            recommendation = "Consider relaxation exercises and social interactions.";
        } else if (totalScore <= 30) {
            result = "Moderate Depression";
            recommendation = "Try therapy or counseling sessions.";
        } else if (totalScore <= 40) {
            result = "Moderate to Severe Depression";
            recommendation = "Seek therapy and support groups.";
        } else {
            result = "Severe Depression";
            recommendation = "Seek immediate professional help from a psychologist.";
        }

        // Return the total score, depression level, and recommendation in JSON format
        return "{ \"result\": \"" + result + "\", \"recommendation\": \"" + recommendation + "\", \"score\": " + totalScore + " }";
    }
}
