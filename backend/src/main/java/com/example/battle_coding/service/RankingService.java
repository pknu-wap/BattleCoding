package com.example.battle_coding.service;

import com.example.battle_coding.dto.response.RankingPageResponseDto;
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

    // ✅ 수정된 부분: 페이징 처리
    public RankingPageResponseDto getRankingsPaged(int page, int size) {
        List<User> allUsers = userRepository.findAll()
                .stream()
                .sorted(Comparator.comparingInt(User::getXp).reversed())
                .collect(Collectors.toList());

        int total = allUsers.size();

        int start = page * size;
        int end = Math.min(start + size, total);

        if (start >= total) {
            return new RankingPageResponseDto(List.of(), total); // 요청 범위 벗어나면 빈 리스트
        }

        List<RankingResponseDto> paged = allUsers.subList(start, end)
                .stream()
                .map(user -> {
                    int rank = getUserRank(allUsers, user);
                    return user.toRankingResponseDto(rank);
                })
                .collect(Collectors.toList());

        return new RankingPageResponseDto(paged, total);
    }

    // 기존 내 랭킹 조회는 그대로 유지
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
                return i + 1; // 1부터 시작하는 순위
            }
        }
        return -1;
    }
}
