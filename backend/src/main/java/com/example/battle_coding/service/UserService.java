package com.example.battle_coding.service;

import com.example.battle_coding.entity.User;
import com.example.battle_coding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void updateProfileImage(String email, String profileImageUrl) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        user.setProfileImage(profileImageUrl);
        userRepository.save(user);
    }

}
