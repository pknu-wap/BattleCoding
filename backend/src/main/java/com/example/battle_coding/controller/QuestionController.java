package com.example.battle_coding.controller;

import com.example.battle_coding.dto.request.QuestionRequest;
import com.example.battle_coding.dto.response.QuestionResponse;
import com.example.battle_coding.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    @PostMapping
    public ResponseEntity<QuestionResponse> createQuestion(@RequestBody QuestionRequest request) {
        return ResponseEntity.ok(questionService.createQuestion(request));
    }
    @GetMapping
    public ResponseEntity<List<QuestionResponse>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }
    @GetMapping("/{id}")
    public ResponseEntity<QuestionResponse> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.getQuestionById(id));
    }
}
