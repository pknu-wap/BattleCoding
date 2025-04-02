package com.example.battle_coding.dto.response;

import com.example.battle_coding.entity.Difficulty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class QuestionResponse {
    private Long id;
    private String title;
    private String description;
    private Difficulty difficulty;
}
