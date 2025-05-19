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
                .map((user) -> {
                    int rank = getUserRank(users, user); // XP 기준으로 rank 계산
                    return user.toRankingResponseDto(rank);
                })
                .collect(Collectors.toList());
    }

    public RankingResponseDto getMyRanking(String email) {
        List<User> users = userRepository.findAll()
                .stream()
                .sorted(Comparator.comparingInt(User::getXp).reversed())
                .collect(Collectors.toList());

        User me = users.stream()
                .filter(u -> email.equals(u.getEmail()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        int myRank = getUserRank(users, me);

        return me.toRankingResponseDto(myRank);
    }

    // 유저 순위를 계산하는 헬퍼 메서드
    private int getUserRank(List<User> sortedUsers, User targetUser) {
        for (int i = 0; i < sortedUsers.size(); i++) {
            if (sortedUsers.get(i).getId().equals(targetUser.getId())) {
                return i + 1; // 0-based index → 1-based rank
            }
        }
        return -1; // 못 찾으면 -1
    }
}
