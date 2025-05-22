package com.example.battle_coding.controller;

import com.example.battle_coding.dto.request.LoginRequestDto;
import com.example.battle_coding.dto.request.SignupRequestDto;
import com.example.battle_coding.dto.response.LoginResponseDto;
import com.example.battle_coding.dto.response.SignupResponseDto;
import com.example.battle_coding.repository.UserRepository;
import com.example.battle_coding.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDto> signup(@RequestBody SignupRequestDto request) {
        return ResponseEntity.ok(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto request, HttpServletResponse response) {
        String refreshToken = userRepository.findByEmail(request.email())
                .orElseThrow(()-> new IllegalArgumentException("해당 사용자가 없습니다."))
                .getRefreshToken();

        ResponseCookie responseCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false)  // https 도입시 true로 변경해야 함
                .path("/")
                .maxAge(30 * 24 * 60 * 60) // 30일
                .sameSite("Strict")
                .build();

        response.addHeader("Set-Cookie", responseCookie.toString());

        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseDto> refresh(@CookieValue("refreshToken") String refreshToken) {
        return ResponseEntity.ok(authService.reissueAccessToken(refreshToken));
    }
}
