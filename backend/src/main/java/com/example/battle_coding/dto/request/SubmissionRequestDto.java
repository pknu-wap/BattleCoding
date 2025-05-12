package com.example.battle_coding.dto.request;

public record SubmissionRequestDto(
        Integer questionId,
        String userAnswer,
        Integer timeTaken,  // 연습 모드일 경우 null
        Boolean isRanking
) {}
