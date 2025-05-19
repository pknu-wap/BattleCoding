package com.example.battle_coding.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.List;

@Getter
@AllArgsConstructor
public class RankingPageResponseDto {
    private List<RankingResponseDto> rankings;
    private long totalCount;
}


