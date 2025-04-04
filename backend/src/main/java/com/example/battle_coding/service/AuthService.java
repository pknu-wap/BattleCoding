package com.example.battle_coding.service;

import com.example.battle_coding.dto.request.LoginRequestDto;
import com.example.battle_coding.dto.request.SignupRequestDto;
import com.example.battle_coding.dto.response.LoginResponseDto;
import com.example.battle_coding.dto.response.SignupResponseDto;
import com.example.battle_coding.entity.LoginProvider;
import com.example.battle_coding.entity.User;
import com.example.battle_coding.repository.UserRepository;
import com.example.battle_coding.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public SignupResponseDto signup(SignupRequestDto request) {
        try {
            validateEmailDuplicate(request.email());
            validateProviderIdDuplicate(request.providerId());

            String encodedPassword = passwordEncoder.encode(request.password());

            User user = User.builder()
                    .email(request.email())
                    .password(encodedPassword)
                    .nickname(request.nickname())
                    .provider(request.provider())
                    .providerId(request.providerId())
                    .createdAt(LocalDateTime.now())
                    .build();

            userRepository.save(user);
            return new SignupResponseDto(true, "회원가입 성공!");
        } catch (IllegalArgumentException e) {
            return new SignupResponseDto(false, e.getMessage());
        }
    }

    public LoginResponseDto login(LoginRequestDto request) {
        try {
            User user = validateUserCredentials(request.email(), request.password());
            String token = jwtTokenProvider.createAccessToken(user.getEmail());

            return new LoginResponseDto(
                    true,
                    "로그인 성공!",
                    token,
                    user.getNickname()
            );
        } catch (IllegalArgumentException e) {
            return new LoginResponseDto(
                    false,
                    e.getMessage(),
                    null,
                    null
            );
        }
    }

    private User validateUserCredentials(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        if (user.getProvider() == LoginProvider.LOCAL) {
            if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
                throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
            }
        }

        return user;
    }

    private void validateEmailDuplicate(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }
    }

    private void validateProviderIdDuplicate(String providerId) {
        if (userRepository.findByProviderId(providerId).isPresent()) {
            throw new IllegalArgumentException("이미 가입된 소셜 로그인 계정입니다.");
        }
    }
}
