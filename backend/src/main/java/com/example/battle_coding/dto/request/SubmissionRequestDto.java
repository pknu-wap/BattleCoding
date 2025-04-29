package com.example.battle_coding.dto.request;

public record SubmissionRequestDto(
        Integer questionId,
        String userAnswer,
        Integer timeTaken,
        Boolean isRanking
) {}
