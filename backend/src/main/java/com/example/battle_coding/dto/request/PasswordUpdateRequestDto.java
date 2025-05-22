package com.example.battle_coding.dto.request;

public record PasswordUpdateRequestDto(
        String currentPassword,
        String newPassword
) {}
