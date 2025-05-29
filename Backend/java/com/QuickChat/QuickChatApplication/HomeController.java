package com.QuickChat.QuickChatApplication;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/{path:[^\\.]*}")  // Forward all unknown routes to React
    public String forwardReactRoutes() {
        return "forward:/index.html";
    }
}
