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
        List<Question> questions = questionRepository.findRandomGeneralQuestionsByType(type.name(), count);
        return questions.stream()
                .map(QuestionResponseDto::from)
                .toList();
    }

    public List<QuestionResponseDto> getRandomQuestionsByDifficulty(Difficulty difficulty, int count) {
        List<Question> questions = questionRepository.findRandomGeneralQuestionsByDifficulty(difficulty.name(), count);
        return questions.stream()
                .map(QuestionResponseDto::from)
                .toList();
    }

    public List<QuestionResponseDto> getRandomByTypeAndDifficulty(QuestionType type, Difficulty difficulty, int count) {
        List<Question> questions = questionRepository.findRandomGeneralQuestionsByTypeAndDifficulty(type.name(), difficulty.name(), count);
        return questions.stream()
                .map(QuestionResponseDto::from)
                .toList();
    }

    // 랭킹전 문제 4개 + 일반 문제 6개를 유형과 난이도 기준으로 균형 있게 조합하여 반환
    public List<QuestionResponseDto> getRankingModeQuestions() {
        List<Question> rankingOnlyQuestions = questionRepository.findAllByIsRankingOnly(true);
        List<Question> normalQuestions = questionRepository.findAllByIsRankingOnly(false);

        List<Question> rankingSelected = selectRankingQuestions(rankingOnlyQuestions);
        List<Question> generalSelected = selectGeneralQuestions(normalQuestions);

        List<Question> combined = new ArrayList<>();
        combined.addAll(rankingSelected);
        combined.addAll(generalSelected);
        Collections.shuffle(combined);

        return combined.stream().map(QuestionResponseDto::from).toList();
    }

    // 랭킹 문제 4개 선택: EASY 2, MEDIUM 1, HARD 1 + 유형 (2,1,1), (1,2,1), (1,1,2) 중 랜덤
    private List<Question> selectRankingQuestions(List<Question> pool) {
        List<QuestionType[]> typePatterns = List.of(
                new QuestionType[]{QuestionType.FILL_IN_BLANK, QuestionType.FILL_IN_BLANK, QuestionType.PREDICT_OUTPUT, QuestionType.CS_KNOWLEDGE},
                new QuestionType[]{QuestionType.FILL_IN_BLANK, QuestionType.PREDICT_OUTPUT, QuestionType.PREDICT_OUTPUT, QuestionType.CS_KNOWLEDGE},
                new QuestionType[]{QuestionType.FILL_IN_BLANK, QuestionType.PREDICT_OUTPUT, QuestionType.CS_KNOWLEDGE, QuestionType.CS_KNOWLEDGE}
        );
        Collections.shuffle(typePatterns);
        QuestionType[] selectedTypes = typePatterns.getFirst();

        List<Difficulty> rankingDifficulties = List.of(
                Difficulty.EASY, Difficulty.EASY,
                Difficulty.MEDIUM, Difficulty.HARD
        );

        return assignQuestions(pool, selectedTypes, rankingDifficulties);
    }

    // 일반 문제 6개 선택: EASY/MEDIUM/HARD 각 2개, 유형별로 2개씩
    private List<Question> selectGeneralQuestions(List<Question> pool) {
        List<QuestionType> generalTypes = new ArrayList<>(
                List.of(QuestionType.FILL_IN_BLANK, QuestionType.FILL_IN_BLANK,
                        QuestionType.PREDICT_OUTPUT, QuestionType.PREDICT_OUTPUT,
                        QuestionType.CS_KNOWLEDGE, QuestionType.CS_KNOWLEDGE)
        );
        Collections.shuffle(generalTypes);

        List<Difficulty> generalDifficulties = new ArrayList<>(
                List.of(Difficulty.EASY, Difficulty.EASY,
                        Difficulty.MEDIUM, Difficulty.MEDIUM,
                        Difficulty.HARD, Difficulty.HARD)
        );
        Collections.shuffle(generalDifficulties);

        return assignQuestions(pool, generalTypes.toArray(new QuestionType[0]), generalDifficulties);
    }

    // 주어진 문제 풀(pool)에서 각 유형-난이도 조합에 맞게 문제를 하나씩 선택 (중복 방지)
    private List<Question> assignQuestions(List<Question> pool, QuestionType[] types, List<Difficulty> difficulties) {
        List<Question> result = new ArrayList<>();
        Set<Integer> usedIds = new HashSet<>();

        for (int i = 0; i < types.length; i++) {
            QuestionType type = types[i];
            Difficulty difficulty = difficulties.get(i);
            pool.stream()
                    .filter(q -> q.getType() == type && q.getDifficulty() == difficulty && !usedIds.contains(q.getId()))
                    .findFirst()
                    .ifPresent(q -> {
                        result.add(q);
                        usedIds.add(q.getId());
                    });
        }
        return result;
    }


}
