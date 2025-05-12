package com.example.battle_coding.dto.response;

public record RankingDto(
        int id,
        String username,
        int score,
        String percent
) {
}
