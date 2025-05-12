package com.example.battle_coding.service;

import com.example.battle_coding.dto.response.RankingResponseDto;
import com.example.battle_coding.entity.User;
import com.example.battle_coding.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RankingService {

    private final UserRepository userRepository;

    public RankingService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<RankingResponseDto> getTopRanking(int page, int size) {
        // Pageable 객체 생성
        PageRequest pageable = PageRequest.of(page, size);

        // 상위 랭킹 사용자 목록 조회
        List<User> users = userRepository.findAllByAccuracyDesc(pageable);

        // 사용자 리스트를 DTO로 변환하여 반환
        return users.stream()
                .map(u -> new RankingResponseDto(
                        u.getNickname(),
                        u.getTotalAttempts(),
                        u.getTotalCorrect(),
                        u.getTotalAttempts() - u.getTotalCorrect(),
                        u.getTotalAttempts() > 0 ? (u.getTotalCorrect() * 100.0) / u.getTotalAttempts() : 0
                ))
                .collect(Collectors.toList());
    }
}
