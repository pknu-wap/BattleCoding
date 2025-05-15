package com.example.battle_coding.dto.response;

import java.time.LocalDateTime;

public record UserInfoDto(
        String email,
        String nickname,
        int totalCorrect,
//        int totalAttempts,
        int totalSubmitted,
        int xp,
        LocalDateTime createdAt
) {}

