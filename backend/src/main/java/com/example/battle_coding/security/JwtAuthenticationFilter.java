package com.example.battle_coding.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(final JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(
            @NonNull final HttpServletRequest request,
            @NonNull final HttpServletResponse response,
            @NonNull final FilterChain filterChain
    ) throws ServletException, IOException {
        String uri = request.getRequestURI();

        if (uri.startsWith("/auth/") ||
                uri.startsWith("/static/") ||
                uri.equals("/") ||
                uri.startsWith("/favicon.ico") ||
                uri.startsWith("/manifest.json") ||
                uri.matches(".*(\\.js|\\.css|\\.png|\\.jpg|\\.jpeg|\\.gif|\\.svg|\\.ico)$")) {

            filterChain.doFilter(request, response);
            return;
        }

        final String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            throw new AuthenticationCredentialsNotFoundException("로그인이 필요합니다.");
        }

        String token = header.substring(7);
        if (!jwtTokenProvider.validateToken(token)) {
            throw new AuthenticationCredentialsNotFoundException("유효하지 않은 토큰입니다.");
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }
}
