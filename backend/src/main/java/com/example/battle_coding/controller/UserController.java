package com.example.battle_coding.controller;

import com.example.battle_coding.dto.response.UserInfoDto;
import com.example.battle_coding.entity.User;
import com.example.battle_coding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    @GetMapping("/check-nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        boolean exists = userRepository.existsByNickname(nickname);
        return ResponseEntity.ok(!exists);  // 사용 가능하면 true
    }

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        boolean exists = userRepository.existsByEmail(email);
        return ResponseEntity.ok(!exists); // true면 사용 가능
    }

    @GetMapping("/me")
    public ResponseEntity<UserInfoDto> getMyInfo(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자 정보를 찾을 수 없습니다."));

        UserInfoDto response = new UserInfoDto(
                user.getEmail(),
                user.getNickname(),
                user.getXp(),
                user.getTotalCorrect(),
                user.getCreatedAt()
        );

        return ResponseEntity.ok(response);
    }
}
