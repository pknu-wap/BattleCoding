package com.example.battle_coding.controller;

import com.example.battle_coding.dto.response.RankingResponseDto;
import com.example.battle_coding.service.RankingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ranking")
public class RankingController {

    private final RankingService rankingService;

    public RankingController(RankingService rankingService) {
        this.rankingService = rankingService;
    }

    @GetMapping
    public List<RankingResponseDto> getRanking() {
        return rankingService.getTopRanking();
    }
}
