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

    public List<RankingResponseDto> getTopRanking() {
        PageRequest pageRequest = PageRequest.of(0, 10);
        List<User> users = userRepository.findAllByOrderByXpDesc(pageRequest);

        return users.stream()
                .map(u -> new RankingResponseDto(
                        u.getNickname(),
                        u.getXp(),
                        u.getTotalAttempts(),
                        u.getTotalCorrect(),
                        u.getTotalAttempts() - u.getTotalCorrect()
                ))
                .collect(Collectors.toList());
    }
}
