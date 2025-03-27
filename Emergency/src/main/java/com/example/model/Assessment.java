package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "assessments")
public class Assessment {
    @Id
    private String id;
    private String question;
    private int score;

    // Constructors
    public Assessment() {}
    public Assessment(String question, int score) {
        this.question = question;
        this.score = score;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
}
