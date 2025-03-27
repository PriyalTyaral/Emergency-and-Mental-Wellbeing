package com.example.service;

import com.example.model.ChatMessage;
import com.example.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ChatbotService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    public ChatMessage processUserMessage(String userMessage) {
        chatMessageRepository.save(new ChatMessage("user", userMessage));

        String botResponse = generateBotResponse(userMessage);
        ChatMessage botMessage = new ChatMessage("bot", botResponse);
        chatMessageRepository.save(botMessage);

        return botMessage;
    }

    private String generateBotResponse(String userMessage) {
        userMessage = userMessage.toLowerCase().trim();

        // Map of keyword-based responses
        Map<String, String[]> responseMap = new LinkedHashMap<>();

        // 1️⃣ Greetings & Initial Conversation
        responseMap.put("hello", new String[]{
            "Hi there! 👋 How can I help you today? 😊",
            "Hello! Hope you're doing well. What’s on your mind?"
        });
        responseMap.put("hi", responseMap.get("hello"));
        responseMap.put("how are you", new String[]{
            "I'm here to assist you! How are you feeling today?",
            "I’m always ready to chat! What’s on your mind?"
        });

        // 2️⃣ Stress & Anxiety Management
        responseMap.put("stress", new String[]{
            "It's great you're looking for ways to reduce stress! Here are some steps:\n"
            + "1️⃣ Identify Stressors: Keep a journal to understand triggers.\n"
            + "2️⃣ Develop Coping Mechanisms: Exercise, deep breathing, or meditation can help.\n"
            + "Would you like more specific techniques? 😊"
        });
        responseMap.put("anxiety", new String[]{
            "Anxiety can be tough, but you're not alone! Try these:\n"
            + "💨 Deep breathing: Inhale for 4 seconds, hold for 4, exhale for 4.\n"
            + "🎧 Listen to calming music or try mindfulness.\n"
            + "Need more coping strategies?"
        });

        // 3️⃣ Sleep Improvement Tips
        responseMap.put("sleep", new String[]{
            "Struggling with sleep? 💤 Try these:\n"
            + "📵 Avoid screens 30 minutes before bed.\n"
            + "🌿 Try relaxation techniques like reading or soft music.\n"
            + "Do you need more sleep tips?"
        });

        // 4️⃣ Healthy Lifestyle & Diet
        responseMap.put("healthy", new String[]{
            "Living healthy is a great choice! 🥗 Here are some basics:\n"
            + "✅ Eat a balanced diet (fruits, vegetables, proteins).\n"
            + "🏃 Exercise regularly (even 30 mins of walking helps!).\n"
            + "💧 Stay hydrated! Water is essential for overall health.\n"
            + "Want specific health tips?"
        });
        responseMap.put("diet", responseMap.get("healthy"));
        responseMap.put("nutrition", responseMap.get("healthy"));

        // 5️⃣ Mental Health & Self-Care
        responseMap.put("self-care", new String[]{
            "Self-care is important! 🌸 Here are ways to prioritize yourself:\n"
            + "🛀 Take a relaxing bath or listen to your favorite music.\n"
            + "📓 Write down 3 things you're grateful for daily.\n"
            + "💖 Practice kindness—especially toward yourself!\n"
            + "Would you like personalized self-care ideas?"
        });
        responseMap.put("mental health", responseMap.get("self-care"));

        // 6️⃣ Emergency Situations
        responseMap.put("emergency", new String[]{
            "If this is an emergency, please reach out to a trusted contact or helpline immediately. 🚨",
            "Your safety is important. If you're in urgent distress, seek help from a professional."
        });
        responseMap.put("suicide", new String[]{
            "I'm really sorry you're feeling this way. 💙 You're not alone.\n"
            + "Please consider talking to someone who can help. You matter. 💖"
        });

        // 7️⃣ Staying Motivated
        responseMap.put("motivate", new String[]{
            "You're doing great! 💪 Stay motivated by:\n"
            + "🎯 Setting small, achievable goals.\n"
            + "📅 Keeping track of progress (even little wins matter!).\n"
            + "💡 Surrounding yourself with positive influences!\n"
            + "Want a daily motivation tip?"
        });

        // 8️⃣ Thank You / Goodbye
        responseMap.put("thank you", new String[]{
            "You're always welcome! 😊 Need help with anything else?",
            "Glad I could assist! Do you have any other questions?"
        });
        responseMap.put("bye", new String[]{
            "Take care! 💖 Remember, I'm always here whenever you need a chat. 👋",
            "Goodbye for now! Stay positive and take care!"
        });

        // 9️⃣ General Default Response
        for (String key : responseMap.keySet()) {
            if (userMessage.contains(key)) {
                String[] responses = responseMap.get(key);
                return responses[new Random().nextInt(responses.length)];
            }
        }

        // If no keyword is found, provide a helpful fallback response
        return "That’s an interesting thought! Could you explain more so I can help better? 😊";
    }

    public List<ChatMessage> getChatHistory() {
        return chatMessageRepository.findAll();
    }
}
