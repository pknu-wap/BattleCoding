package com.example.battle_coding.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${cors.allowed-origins:http://localhost:3000}")
    private String allowedOrigins;
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] origins = allowedOrigins.split(",");
        registry.addMapping("/**")
                .allowedOrigins(origins) // 프론트 주소
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    // 정적 자원 처리 (React SPA 라우팅 대응)
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/static/");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{spring:\\w+}")
                .setViewName("forward:/");
        registry.addViewController("/**/{spring:\\w+}")
                .setViewName("forward:/");
        registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}")
                .setViewName("forward:/");
    }
}

