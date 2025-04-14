package com.example.battle_coding.dto.response;

import com.example.battle_coding.entity.Difficulty;
import com.example.battle_coding.entity.Question;
import com.example.battle_coding.entity.QuestionType;

public record QuestionResponseDto(
        Integer id,
        QuestionType type,
        String question,      // 텍스트 문제 (null일 수 있음)
        String imageUrl,      // 이미지 문제 (null일 수 있음)
        Difficulty difficulty
) {
    public static QuestionResponseDto from(Question q) {
        return new QuestionResponseDto(
                q.getId(),
                q.getType(),
                q.getQuestion(),
                q.getImageUrl(),
                q.getDifficulty()
        );
    }
}
