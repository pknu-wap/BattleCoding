package com.example.battle_coding.dto.response;

public record ErrorResponseDto(
        boolean success,
        String message
) {}
