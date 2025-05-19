package com.example.battle_coding.controller;

import com.example.battle_coding.dto.response.CorrectAnswerResponseDto;
import com.example.battle_coding.dto.response.QuestionResponseDto;
import com.example.battle_coding.entity.Difficulty;
import com.example.battle_coding.entity.QuestionType;
import com.example.battle_coding.service.QuestionService;
import com.example.battle_coding.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    private final SubmissionService submissionService;

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

    @GetMapping("/random/by-type-and-difficulty")
    public ResponseEntity<List<QuestionResponseDto>> getRandomByTypeAndDifficulty(
            @RequestParam QuestionType type,
            @RequestParam Difficulty difficulty,
            @RequestParam(defaultValue = "10") int count
    ) {
        return ResponseEntity.ok(
                questionService.getRandomByTypeAndDifficulty(type, difficulty, count)
        );
    }

    @GetMapping("/ranking")
    public ResponseEntity<List<QuestionResponseDto>> getRankingQuestions() {
        List<QuestionResponseDto> questions = questionService.getRankingModeQuestions();
        return ResponseEntity.ok(questions);
    }

    // 유저가 해당 문제에 대해 오답 제출 이력이 있어야만 정답을 반환함
    @GetMapping("/{questionId}/correct-answer")
    public ResponseEntity<CorrectAnswerResponseDto> getCorrectAnswer(
            @PathVariable Long questionId,
            Authentication authentication
    ) {
        String email = (String) authentication.getPrincipal();
        return ResponseEntity.ok(submissionService.getCorrectAnswersForWrongAttempt(email, questionId));
    }
}