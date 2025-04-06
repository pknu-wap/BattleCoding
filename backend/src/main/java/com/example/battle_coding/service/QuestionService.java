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
                .question(request.getQuestion())
                .type(request.getType())
                .imageUrl(request.getImageUrl())
                .answer(request.getAnswer())
                .difficulty(request.getDifficulty())
                .build();

        Question saved = questionRepository.save(question);

        return new QuestionResponse(
                saved.getId(),
                saved.getQuestion(),
                saved.getType(),
                saved.getImageUrl(),
                saved.getAnswer(),
                saved.getDifficulty(),
                saved.getCreatedAt()
        );
    }

    public List<QuestionResponse> getAllQuestions() {
        return questionRepository.findAll().stream()
                .map(q -> new QuestionResponse(
                        q.getId(),
                        q.getQuestion(),
                        q.getType(),
                        q.getImageUrl(),
                        q.getAnswer(),
                        q.getDifficulty(),
                        q.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public QuestionResponse getQuestionById(Integer id) {
        return questionRepository.findById(id)
                .map(q -> new QuestionResponse(
                        q.getId(),
                        q.getQuestion(),
                        q.getType(),
                        q.getImageUrl(),
                        q.getAnswer(),
                        q.getDifficulty(),
                        q.getCreatedAt()
                ))
                .orElseThrow(() -> new RuntimeException("해당 문제를 찾을 수 없습니다."));
    }
}
