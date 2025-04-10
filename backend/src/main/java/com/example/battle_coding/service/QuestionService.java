package com.example.battle_coding.service;

import com.example.battle_coding.dto.response.QuestionResponseDto;
import com.example.battle_coding.entity.Question;
import com.example.battle_coding.entity.QuestionType;
import com.example.battle_coding.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 문제를 찾을 수 없습니다."));
    }

    public List<QuestionResponseDto> getRandomQuestionsByType(QuestionType type, int count) {
        List<Question> questions = questionRepository.findRandomByType(type.name(), count);
        return questions.stream()
                .map(QuestionResponseDto::from)
                .toList();
    }
}
