package com.QuickChat.QuickChatApplication;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class WebSocketController {

    @GetMapping("/socket-url")
    public Map<String, String> getWebSocketUrl() {
        return Map.of("url", "ws://localhost:8080/ws");
    }
}
