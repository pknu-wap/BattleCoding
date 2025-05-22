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
        validateEmailFormat(request.email());
        validatePasswordFormat(request.password());
        validateNicknameLength(request.nickname());

        validateEmailDuplicate(request.email());
        validateProviderIdDuplicate(request.providerId());
        validateNicknameDuplicate(request.nickname());

        String encodedPassword = passwordEncoder.encode(request.password());

        User user = User.builder()
                .email(request.email())
                .password(encodedPassword)
                .nickname(request.nickname())
                .provider(request.provider())
                .providerId(request.providerId())
                .profileImage("https://res.cloudinary.com/dmby7fmvo/image/upload/v1747656353/%EA%B8%B0%EB%B3%B8_%ED%94%84%EB%A1%9C%ED%95%84_o4xxyn.png")
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);
        return new SignupResponseDto(true, "회원가입 성공!");
    }


    public LoginResponseDto login(LoginRequestDto request) {
        User user = validateUserCredentials(request.email(), request.password());
        String token = jwtTokenProvider.createAccessToken(user.getEmail());

        String refreshToken = jwtTokenProvider.createRefreshToken();
        user.updateRefreshToken(refreshToken);
        userRepository.save(user);

        return new LoginResponseDto(
                true,
                "로그인 성공!",
                token,
                user.getNickname()
        );
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

    private void validateNicknameDuplicate(String nickname) {
        if (userRepository.existsByNickname(nickname)) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
        }
    }

    private void validateEmailFormat(String email) {
        String regex = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
        if (email == null || !email.matches(regex)) {
            throw new IllegalArgumentException("올바른 이메일 형식이 아닙니다.");
        }
    }

    private void validatePasswordFormat(String password) {
        String regex = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,16}$";
        if (password == null || !password.matches(regex)) {
            throw new IllegalArgumentException("비밀번호는 영문, 숫자, 특수문자를 포함해 8~16자여야 합니다.");
        }
    }

    private void validateNicknameLength(String nickname) {
        if (nickname == null || nickname.length() < 4 || nickname.length() > 12) {
            throw new IllegalArgumentException("닉네임은 4~12자여야 합니다.");
        }
    }

    private void validateProviderIdDuplicate(String providerId) {
        if (userRepository.findByProviderId(providerId).isPresent()) {
            throw new IllegalArgumentException("이미 가입된 소셜 로그인 계정입니다.");
        }
    }

    public LoginResponseDto reissueAccessToken(String refreshToken) {
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new IllegalArgumentException("유효하지 않은 Refresh Token입니다.");
        }

        String email = jwtTokenProvider.getEmailFromToken(refreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(()->new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (!refreshToken.equals(user.getRefreshToken())) {
            throw new IllegalArgumentException("토큰 정보가 일치하지 않습니다.");
        }

        String newAccessToken = jwtTokenProvider.createAccessToken(user.getEmail());

        return new LoginResponseDto(
                true,
                "Access Token 재발급 성공",
                newAccessToken,
                user.getNickname()
        );
    }
}
