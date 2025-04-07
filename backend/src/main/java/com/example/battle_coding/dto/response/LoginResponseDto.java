package com.example.battle_coding.dto.response;

public record LoginResponseDto (
    boolean success,
    String message,
    String token,
    String nickname
) {}

