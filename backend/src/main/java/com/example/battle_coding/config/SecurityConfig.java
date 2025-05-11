package com.example.battle_coding.config;

import com.example.battle_coding.security.CustomAuthenticationEntryPoint;
import com.example.battle_coding.security.JwtAuthenticationFilter;
import com.example.battle_coding.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, CustomAuthenticationEntryPoint customAuthenticationEntryPoint) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable) // CSRF 보호 비활성화
                .authorizeHttpRequests(auth -> auth
                        // ✅ React 정적 리소스
                        .requestMatchers(
                                "/", "/index.html",
                                "/static/**", "/favicon.ico", "/manifest.json",
                                "/logo192.png", "/logo512.png",
                                "/auth/login", "/register"
                        ).permitAll()

                        // ✅ 인증 없이 접근 가능한 API
                        .requestMatchers(
                                "/auth/login", "/auth/signup",         // 로그인 & 회원가입
                                "/user/check-email", "/user/check-nickname" // 중복 체크
                        ).permitAll()

                        // ✅ 그 외 API는 인증 필요
                        .requestMatchers(
                                "/user/**", "/questions/**", "/game/**"
                        ).authenticated()

                        .anyRequest().denyAll()
                )

                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(e -> e
                        .authenticationEntryPoint(customAuthenticationEntryPoint)
                )
                .addFilterBefore(
                        new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}
