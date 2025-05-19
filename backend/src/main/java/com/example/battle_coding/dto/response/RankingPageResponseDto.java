package com.example.battle_coding.dto.response;

import java.util.List;

/**
 * 랭킹 페이지 응답 DTO (페이징 처리용)
 *
 * @param content    랭킹 데이터 리스트 (현재 페이지 데이터)
 * @param totalPages 총 페이지 수
 */
public record RankingPageResponseDto(
        List<RankingResponseDto> content,
        int totalPages
) {}
