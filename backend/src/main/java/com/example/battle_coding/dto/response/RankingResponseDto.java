package com.example.battle_coding.dto.response;
public record RankingResponseDto(
        String username,
        int attempts,
        int right,
        int wrong,
        double percent
) {}
