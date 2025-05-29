package com.QuickChat.QuickChatApplication;

import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import java.util.*;

public class SignalingHandler extends TextWebSocketHandler {
    private static final Map<String, WebSocketSession> sessions = new HashMap<>();
    private static final Queue<WebSocketSession> waitingQueue = new LinkedList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        if (waitingQueue.isEmpty()) {
            waitingQueue.add(session);
        } else {
            WebSocketSession partner = waitingQueue.poll();
            sessions.put(session.getId(), partner);
            sessions.put(partner.getId(), session);

            session.sendMessage(new TextMessage("{\"type\": \"partner-found\"}"));
            partner.sendMessage(new TextMessage("{\"type\": \"partner-found\"}"));
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        WebSocketSession partner = sessions.get(session.getId());
        if (partner != null && partner.isOpen()) {
            partner.sendMessage(message);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        WebSocketSession partner = sessions.get(session.getId());
        if (partner != null && partner.isOpen()) {
            partner.sendMessage(new TextMessage("{\"type\": \"partner-disconnected\"}"));
            sessions.remove(partner.getId());
        }
        sessions.remove(session.getId());
    }
}
