package com.example.battle_coding.controller;

import com.example.battle_coding.dto.request.NicknameUpdateRequestDto;
import com.example.battle_coding.dto.request.PasswordUpdateRequestDto;
import com.example.battle_coding.dto.request.UpdateProfileImageRequestDto;
import com.example.battle_coding.dto.response.CommonResponseDto;
import com.example.battle_coding.dto.response.UserInfoDto;
import com.example.battle_coding.entity.User;
import com.example.battle_coding.repository.UserRepository;
import com.example.battle_coding.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;


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
                user.getTotalCorrect(),
                user.getTotalSubmitted(),
                user.getXp(),
                user.getCreatedAt(),
                user.getProfileImage(),
                user.isNicknameChanged()
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/profile/image")
    public ResponseEntity<CommonResponseDto> updateProfileImage(
            @RequestBody UpdateProfileImageRequestDto request,
            Authentication authentication
    ) {
        String email = (String) authentication.getPrincipal();
        userService.updateProfileImage(email, request.profileImage());

        return ResponseEntity.ok(new CommonResponseDto(true, "프로필 이미지가 변경되었습니다."));
    }

    @PutMapping("/profile/nickname")
    public ResponseEntity<CommonResponseDto> updateNickname(
            @RequestBody NicknameUpdateRequestDto request,
            Authentication authentication
    ) {
        String email = (String) authentication.getPrincipal();
        userService.updateNickname(email, request.newNickname());
        return ResponseEntity.ok(new CommonResponseDto(true, "닉네임이 성공적으로 변경되었습니다."));
    }

    @PutMapping("/profile/password")
    public ResponseEntity<CommonResponseDto> updatePassword(
            @RequestBody PasswordUpdateRequestDto request,
            Authentication authentication
    ) {
        String email = (String) authentication.getPrincipal();
        userService.updatePassword(email, request.currentPassword(), request.newPassword());
        return ResponseEntity.ok(new CommonResponseDto(true, "비밀번호가 성공적으로 변경되었습니다."));
    }


}
