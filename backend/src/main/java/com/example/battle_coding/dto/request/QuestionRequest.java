package com.example.battle_coding.dto.request;

import com.example.battle_coding.entity.Difficulty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionRequest {
    private String title;
    private String description;
    private Difficulty difficulty;
}
