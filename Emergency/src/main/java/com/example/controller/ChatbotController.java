package com.example.controller;

import com.example.model.ChatMessage;
import com.example.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chatbot")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping
    public Map<String, String> getChatResponse(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");
        ChatMessage botMessage = chatbotService.processUserMessage(userMessage);

        Map<String, String> response = new HashMap<>();
        response.put("reply", botMessage.getMessage());
        return response;
    }

    @GetMapping("/history")
    public List<ChatMessage> getChatHistory() {
        return chatbotService.getChatHistory();
    }
}
