package com.example.battle_coding.controller;

import com.example.battle_coding.dto.response.RankingResponseDto;
import com.example.battle_coding.dto.response.RankingPageResponseDto;
import com.example.battle_coding.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    // ✅ 페이징된 랭킹 조회 (10명씩)
    @GetMapping("/rankings")
    public ResponseEntity<RankingPageResponseDto> getPaginatedRankings(
            @RequestParam(defaultValue = "0") int page) {
        int size = 10; // 한 페이지당 10명
        RankingPageResponseDto rankings = rankingService.getRankingsPaged(page, size);
        return ResponseEntity.ok(rankings);
    }

    // ✅ 본인의 랭킹 조회
    @GetMapping("/my-ranking")
    public ResponseEntity<RankingResponseDto> getMyRanking(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        RankingResponseDto myRanking = rankingService.getMyRanking(email);
        return ResponseEntity.ok(myRanking);
    }
}
