package com.example.battle_coding.dto.response;

import com.example.battle_coding.entity.Difficulty;
import com.example.battle_coding.entity.QuestionType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class QuestionResponse {
    private Integer id;
    private String question;
    private QuestionType type;
    private String imageUrl;
    private String answer;
    private Difficulty difficulty;
    private LocalDateTime createdAt;
}
