package com.example.battle_coding.service;

import com.example.battle_coding.dto.request.QuestionRequest;
import com.example.battle_coding.dto.response.QuestionResponse;
import com.example.battle_coding.entity.Question;
import com.example.battle_coding.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    public QuestionResponse createQuestion(QuestionRequest request) {
        Question question = Question.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .difficulty(request.getDifficulty())
                .build();
        Question savedQuestion = questionRepository.save(question);
        return new QuestionResponse(savedQuestion.getId(), savedQuestion.getTitle(), savedQuestion.getDescription(), savedQuestion.getDifficulty());
    }
    public List<QuestionResponse> getAllQuestions() {
        return questionRepository.findAll().stream()
                .map(q -> new QuestionResponse(q.getId(), q.getTitle(), q.getDescription(), q.getDifficulty()))
                .collect(Collectors.toList());
    }
    public QuestionResponse getQuestionById(Long id) {
        return questionRepository.findById(id)
                .map(q -> new QuestionResponse(q.getId(), q.getTitle(), q.getDescription(), q.getDifficulty()))
                .orElseThrow(() -> new RuntimeException("해당 문제를 찾을 수 없습니다."));
    }
}
