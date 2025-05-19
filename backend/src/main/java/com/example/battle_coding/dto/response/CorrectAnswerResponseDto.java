package com.example.battle_coding.dto.response;

import java.util.List;

public record CorrectAnswerResponseDto(
        boolean success,
        List<String> answers,
        String message
) {
    public static CorrectAnswerResponseDto success(List<String> answers) {
        return new CorrectAnswerResponseDto(true, answers, null);
    }

    public static CorrectAnswerResponseDto fail(String message) {
        return new CorrectAnswerResponseDto(false, null, message);
    }
}
