package com.example.battle_coding.dto.request;

import com.example.battle_coding.entity.Difficulty;
import com.example.battle_coding.entity.QuestionType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionRequest {
    private QuestionType type;
    private String question;
    private String imageUrl;
    private String answer;
    private Difficulty difficulty;
}
