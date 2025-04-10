package com.example.battle_coding.controller;

import com.example.battle_coding.dto.response.QuestionResponseDto;
import com.example.battle_coding.entity.Difficulty;
import com.example.battle_coding.entity.QuestionType;
import com.example.battle_coding.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping("/random/by-type")
    public ResponseEntity<List<QuestionResponseDto>> getRandomQuestionByType(
            @RequestParam QuestionType type,
            @RequestParam(defaultValue = "10") int count
    ){
        return ResponseEntity.ok(questionService.getRandomQuestionsByType(type, count));
    }

    @GetMapping("/random/by-difficulty")
    public ResponseEntity<List<QuestionResponseDto>> getRandomQuestionByDifficulty(
            @RequestParam Difficulty difficulty,
            @RequestParam(defaultValue = "10") int count
    ) {
        return ResponseEntity.ok(questionService.getRandomQuestionsByDifficulty(difficulty, count));
    }

    @GetMapping("/random/by-filter")
    public ResponseEntity<List<QuestionResponseDto>> getRandomByTypeAndDifficulty(
            @RequestParam QuestionType type,
            @RequestParam Difficulty difficulty,
            @RequestParam(defaultValue = "10") int count
    ) {
        return ResponseEntity.ok(
                questionService.getRandomByTypeAndDifficulty(type, difficulty, count)
        );
    }
}