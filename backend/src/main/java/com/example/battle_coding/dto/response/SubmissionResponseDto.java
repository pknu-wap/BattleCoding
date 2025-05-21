package com.example.battle_coding.dto.response;

public record SubmissionResponseDto(
        boolean isCorrect,
        int xpEarned,
        String message,
        int updatedXp,
        int totalCorrect,
        int totalSubmitted,
        int questionId,
        String difficulty,
        String type,
        boolean isRankingOnly,
        String userAnswer
) {}

