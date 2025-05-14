package com.example.battle_coding.controller;

import com.example.battle_coding.dto.response.RankingResponseDto;
import com.example.battle_coding.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    @GetMapping("/rankings")
    public ResponseEntity<List<RankingResponseDto>> getTopRankings() {
        List<RankingResponseDto> rankings = rankingService.getTopRankings();
        return ResponseEntity.ok(rankings);
    }

    @GetMapping("/my-ranking")
    public ResponseEntity<RankingResponseDto> getMyRanking(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        RankingResponseDto myRanking = rankingService.getMyRanking(email);
        return ResponseEntity.ok(myRanking);
    }
}
