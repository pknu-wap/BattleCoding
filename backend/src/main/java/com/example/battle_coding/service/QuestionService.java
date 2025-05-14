package com.example.battle_coding.service;

import com.example.battle_coding.dto.response.QuestionResponseDto;
import com.example.battle_coding.entity.Difficulty;
import com.example.battle_coding.entity.Question;
import com.example.battle_coding.entity.QuestionType;
import com.example.battle_coding.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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

    public List<QuestionResponseDto> getRandomQuestionsByDifficulty(Difficulty difficulty, int count) {
        List<Question> questions = questionRepository.findRandomByDifficulty(difficulty.name(), count);
        return questions.stream()
                .map(QuestionResponseDto::from)
                .toList();
    }

    public List<QuestionResponseDto> getRandomByTypeAndDifficulty(QuestionType type, Difficulty difficulty, int count) {
        List<Question> questions = questionRepository.findRandomByTypeAndDifficulty(type.name(), difficulty.name(), count);
        return questions.stream()
                .map(QuestionResponseDto::from)
                .toList();
    }

    public List<QuestionResponseDto> getRankingModeQuestions() {
        // 전용 / 일반 문제 분리
        List<Question> rankingOnlyQuestions = questionRepository.findAllByIsRankingOnly(true);
        List<Question> normalQuestions = questionRepository.findAllByIsRankingOnly(false);

        // 난이도별 그룹화
        Map<Difficulty, List<Question>> groupedRanking = groupByDifficulty(rankingOnlyQuestions);
        Map<Difficulty, List<Question>> groupedNormal = groupByDifficulty(normalQuestions);

        // 출제 개수 정의
        Map<Difficulty, Integer> rankingCounts = Map.of(
                Difficulty.EASY, 2,
                Difficulty.MEDIUM, 1,
                Difficulty.HARD, 1
        );

        Map<Difficulty, Integer> generalCounts = Map.of(
                Difficulty.EASY, 2,
                Difficulty.MEDIUM, 2,
                Difficulty.HARD, 2
        );

        // 유형 중복 방지용
        Set<QuestionType> rankingUsedTypes = new HashSet<>();
        Set<QuestionType> generalUsedTypes = new HashSet<>();

        // 문제 선택
        List<Question> rankingSelected = selectQuestionsByDifficulty(groupedRanking, rankingCounts, rankingUsedTypes);
        List<Question> generalSelected = selectQuestionsByDifficulty(groupedNormal, generalCounts, generalUsedTypes);

        // 결합 및 섞기
        List<Question> combined = new ArrayList<>();
        combined.addAll(rankingSelected);
        combined.addAll(generalSelected);
        Collections.shuffle(combined);

        return combined.stream()
                .map(QuestionResponseDto::from)
                .toList();
    }

    private Map<Difficulty, List<Question>> groupByDifficulty(List<Question> questions) {
        if (questions == null || questions.isEmpty()) return Map.of();
        return questions.stream()
                .collect(Collectors.groupingBy(Question::getDifficulty));
    }

    private List<Question> selectQuestionsByDifficulty(
            Map<Difficulty, List<Question>> grouped,
            Map<Difficulty, Integer> countPerDifficulty,
            Set<QuestionType> usedTypes
    ) {
        List<Question> result = new ArrayList<>();
        for (Map.Entry<Difficulty, Integer> entry : countPerDifficulty.entrySet()) {
            Difficulty difficulty = entry.getKey();
            int count = entry.getValue();
            result.addAll(pickQuestions(grouped.get(difficulty), count, usedTypes));
        }
        return result;
    }

    // 난이도 별로 분류된 문제 리스트에서 유형 중복을 최소화하여 문제를 count개 뽑는다.
    private List<Question> pickQuestions(List<Question> source, int count, Set<QuestionType> usedTypes) {
        if (source == null || source.isEmpty()) return List.of();

        Collections.shuffle(source);
        List<Question> result = new ArrayList<>();

        // 우선 유형 중복 없이 선택
        for (Question q : source) {
            if (usedTypes.add(q.getType())) {
                result.add(q);
                if (result.size() == count) return result;
            }
        }

        // 부족하면 유형 중복을 허용하여 추가
        for (Question q : source) {
            if (!result.contains(q)) {
                result.add(q);
                if (result.size() == count) break;
            }
        }

        return result;
    }
}
