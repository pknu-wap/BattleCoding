package com.example.battle_coding.controller;

import com.example.battle_coding.dto.request.LoginRequestDto;
import com.example.battle_coding.dto.request.SignupRequestDto;
import com.example.battle_coding.dto.response.LoginResponseDto;
import com.example.battle_coding.dto.response.SignupResponseDto;
import com.example.battle_coding.repository.UserRepository;
import com.example.battle_coding.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
                .sameSite("Lax")
                .build();

        response.addHeader("Set-Cookie", responseCookie.toString());

        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseDto> refresh(
            @CookieValue(value = "refreshToken", required = false) String refreshToken
    ) {

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponseDto(false, "쿠키 없음", null, null));
        }

        return ResponseEntity.ok(authService.reissueAccessToken(refreshToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(false) // 배포 서버면 true, 로컬 테스트면 false
                .path("/")
                .maxAge(0)     // ✅ 즉시 만료
                .sameSite("Lax") // 실제 쿠키 설정과 동일하게 맞춰야 함
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());

        return ResponseEntity.ok().build();
    }

}
