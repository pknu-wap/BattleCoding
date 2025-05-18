package com.example.battle_coding.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RankingResponseDto(
        String nickname,
        int xp,

        @JsonProperty("totalSubmitted")
        int submitted,

        @JsonProperty("totalCorrect")
        int correct,

        @JsonProperty("totalWrong")
        int wrong,

        @JsonProperty("rank")
        int rank
) {}
