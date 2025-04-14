package com.example.battle_coding.dto.response;

public record SubmissionResponseDto(
        boolean isCorrect,
        int xpEarned,
        String message,
        int updatedXp
) {}
