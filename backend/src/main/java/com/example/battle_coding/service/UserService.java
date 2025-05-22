package com.example.battle_coding.service;

import com.example.battle_coding.entity.LoginProvider;
import com.example.battle_coding.entity.User;
import com.example.battle_coding.repository.ProfileImageRepository;
import com.example.battle_coding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ProfileImageRepository profileImageRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public void updateProfileImage(String email, String profileImageUrl) {
        if (!profileImageRepository.existsByImageUrl(profileImageUrl)) {
            throw new IllegalArgumentException("허용되지 않은 이미지입니다.");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        user.setProfileImage(profileImageUrl);
        userRepository.save(user);
    }

    public void updateNickname(String email, String newNickname) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (user.isNicknameChanged()) {
            throw new IllegalStateException("닉네임은 한 번만 변경할 수 있습니다.");
        }

        if (userRepository.existsByNickname(newNickname)) {
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }

        user.setNickname(newNickname);
        user.setNicknameChanged(true);
        userRepository.save(user);
    }

    public void updatePassword(String email, String currentPassword, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        if (user.getProvider() != LoginProvider.LOCAL) {
            throw new IllegalStateException("소셜 로그인 사용자는 비밀번호 변경이 불가능합니다.");
        }

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

}
