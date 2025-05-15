package com.example.battle_coding.service;

import com.example.battle_coding.dto.response.RankingResponseDto;
import com.example.battle_coding.entity.User;
import com.example.battle_coding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final UserRepository userRepository;

    public List<RankingResponseDto> getTopRankings() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .sorted(Comparator.comparingInt(User::getXp).reversed())
                .limit(10)
                .map(user -> new RankingResponseDto(
                        user.getNickname(),
                        user.getXp(),
                        user.getTotalSubmitted(),
                        user.getTotalCorrect(),
                        user.getTotalSubmitted() - user.getTotalCorrect() // wrong 계산
                ))
                .collect(Collectors.toList());
    }

    public RankingResponseDto getMyRanking(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        return new RankingResponseDto(
                user.getNickname(),
                user.getXp(),
                user.getTotalSubmitted(),
                user.getTotalCorrect(),
                user.getTotalSubmitted() - user.getTotalCorrect()
        );
    }
}
