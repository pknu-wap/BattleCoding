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

    // ✅ 모든 유저를 페이징하여 반환 (30명 제한 없음)
    public RankingPageResponseDto getRankingsPaged(int page, int size) {
        // XP 기준 내림차순 정렬, 제한 없음
        List<User> allUsers = userRepository.findAll()
                .stream()
                .sorted(Comparator.comparingInt(User::getXp).reversed())
                .collect(Collectors.toList());

        int totalUsers = allUsers.size(); // 모든 유저 수
        int totalPages = (int) Math.ceil((double) totalUsers / size);

        int start = page * size;
        int end = Math.min(start + size, totalUsers);

        // 범위를 벗어나면 빈 리스트 반환
        if (start >= totalUsers) {
            return new RankingPageResponseDto(List.of(), totalPages);
        }

        List<RankingResponseDto> paged = allUsers.subList(start, end)
                .stream()
                .map(user -> {
                    int rank = getUserRank(allUsers, user);
                    return user.toRankingResponseDto(rank);
                })
                .collect(Collectors.toList());

        return new RankingPageResponseDto(paged, totalPages);
    }


    // ✅ 특정 유저의 랭킹을 조회 (모든 유저 중에서)
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

    // ✅ 랭킹 계산 로직 (1등부터 시작)
    private int getUserRank(List<User> sortedUsers, User targetUser) {
        for (int i = 0; i < sortedUsers.size(); i++) {
            if (sortedUsers.get(i).getId().equals(targetUser.getId())) {
                return i + 1;
            }
        }
        return -1; // 못 찾을 경우
    }
}
