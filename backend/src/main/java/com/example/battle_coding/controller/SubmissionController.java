package com.example.battle_coding.controller;

import com.example.battle_coding.dto.request.SubmissionRequestDto;
import com.example.battle_coding.dto.response.SubmissionResponseDto;
import com.example.battle_coding.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/submissions")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService submissionService;

    @PostMapping
    public ResponseEntity<SubmissionResponseDto> submit(
            @RequestBody SubmissionRequestDto request,
            Authentication authentication) {
        SubmissionResponseDto response = submissionService.submit(request, authentication);

        return ResponseEntity.ok(response);
    }
}
