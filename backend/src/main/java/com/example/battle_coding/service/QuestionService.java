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

    // 랭킹전 문제 4개 + 일반 문제 6개를 난이도 균형만 고려하여 랜덤으로 조합
    public List<QuestionResponseDto> getRankingModeQuestions() {
        List<Question> rankingOnlyQuestions = questionRepository.findAllByIsRankingOnly(true);
        List<Question> normalQuestions = questionRepository.findAllByIsRankingOnly(false);

        List<Question> rankingSelected = assignByDifficultyOnly(rankingOnlyQuestions, 2, 1, 1); // 총 4
        List<Question> generalSelected = assignByDifficultyOnly(normalQuestions, 2, 2, 2);     // 총 6

        List<Question> combined = new ArrayList<>();
        combined.addAll(rankingSelected);
        combined.addAll(generalSelected);
        Collections.shuffle(combined);

        return combined.stream().map(QuestionResponseDto::from).toList();
    }

    // 난이도만 고려해서 문제를 랜덤하게 뽑음 (type은 고려하지 않음)
    private List<Question> assignByDifficultyOnly(List<Question> pool, int easyCount, int mediumCount, int hardCount) {
        Collections.shuffle(pool);

        List<Question> result = new ArrayList<>();
        Set<Integer> usedIds = new HashSet<>();

        Map<Difficulty, Integer> target = Map.of(
                Difficulty.EASY, easyCount,
                Difficulty.MEDIUM, mediumCount,
                Difficulty.HARD, hardCount
        );

        Map<Difficulty, Integer> current = new EnumMap<>(Difficulty.class);
        for (Difficulty d : Difficulty.values()) current.put(d, 0);

        for (Question q : pool) {
            // 미니게임 유형은 건너뜀
            if (q.getType() == QuestionType.WORD_CHAIN) continue;
            if (q.getType() == QuestionType.GUESS_WHO) continue;

            Difficulty diff = q.getDifficulty();
            if (!usedIds.contains(q.getId()) && current.get(diff) < target.getOrDefault(diff, 0)) {
                result.add(q);
                usedIds.add(q.getId());
                current.put(diff, current.get(diff) + 1);
            }
            if (result.size() >= easyCount + mediumCount + hardCount) break;
        }

        return result;
    }


}
