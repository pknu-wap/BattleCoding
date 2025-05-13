package com.example.battle_coding.dto.response;

public record RankingResponseDto(
        String nickname,
        int xp,
        int attempts,
        int correct,
        int wrong
) {}


