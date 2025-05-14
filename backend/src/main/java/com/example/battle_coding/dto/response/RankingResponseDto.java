package com.example.battle_coding.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RankingResponseDto(
        String nickname,
        int xp,

        @JsonProperty("totalAttempts")
        int attempts,

        @JsonProperty("totalCorrect")
        int correct,

        @JsonProperty("totalWrong")
        int wrong
) {}
