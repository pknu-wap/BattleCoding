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
    // 2. 변경: getRankingModeQuestions 메서드 내 수정
    public List<QuestionResponseDto> getRankingModeQuestions() {
        List<Question> rankingOnlyQuestions = questionRepository.findAllByIsRankingOnly(true);
        List<Question> normalQuestions = questionRepository.findAllByIsRankingOnly(false);

        Map<QuestionType, Integer> typeCount = new HashMap<>();

        RankingPickResult rankingPick = pickWithCsLimitAndBalance(rankingOnlyQuestions, typeCount);
        List<Question> rankingSelected = rankingPick.questions();
        int remainingCsLimit = 5 - rankingPick.csUsed();

        List<Question> generalSelected = assignByDifficultyOnlyWithTypeLimit(normalQuestions, 3, 2, 2, remainingCsLimit, typeCount, 4);

        List<Question> combined = new ArrayList<>();
        combined.addAll(rankingSelected);
        combined.addAll(generalSelected);
        Collections.shuffle(combined);

        return combined.stream().map(QuestionResponseDto::from).toList();
    }


    // 랭킹 문제 뽑기 (1/1/1 분포 + CS 제한)
    private record RankingPickResult(List<Question> questions, int csUsed) {}

    private RankingPickResult pickWithCsLimitAndBalance(List<Question> pool, Map<QuestionType, Integer> typeCount) {
        Collections.shuffle(pool);
        List<Question> result = new ArrayList<>();
        int csCount = 0;

        Map<Difficulty, Integer> target = Map.of(
                Difficulty.EASY, 1,
                Difficulty.MEDIUM, 1,
                Difficulty.HARD, 1
        );
        Map<Difficulty, Integer> current = new EnumMap<>(Difficulty.class);
        for (Difficulty d : Difficulty.values()) current.put(d, 0);

        for (Question q : pool) {
            if (q.getType() == QuestionType.WORD_CHAIN || q.getType() == QuestionType.GUESS_WHO) continue;
            if (q.getType() == QuestionType.CS_KNOWLEDGE && csCount >= 5) continue;
            if (typeCount.getOrDefault(q.getType(), 0) >= 4) continue;

            Difficulty diff = q.getDifficulty();
            if (current.get(diff) < target.get(diff)) {
                result.add(q);
                current.put(diff, current.get(diff) + 1);
                typeCount.put(q.getType(), typeCount.getOrDefault(q.getType(), 0) + 1);

                if (q.getType() == QuestionType.CS_KNOWLEDGE) csCount++;
            }

            if (result.size() == 3) break;
        }

        return new RankingPickResult(result, csCount);
    }

    // 일반 문제 뽑기 (난이도 분포 + CS 제한)
    private List<Question> assignByDifficultyOnlyWithTypeLimit(
            List<Question> pool,
            int easyCount, int mediumCount, int hardCount,
            int csKnowledgeMax,
            Map<QuestionType, Integer> typeCount,
            int typeLimit
    ) {
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

        int csKnowledgeCount = 0;

        for (Question q : pool) {
            if (q.getType() == QuestionType.WORD_CHAIN || q.getType() == QuestionType.GUESS_WHO) continue;
            if (q.getType() == QuestionType.CS_KNOWLEDGE && csKnowledgeCount >= csKnowledgeMax) continue;
            if (typeCount.getOrDefault(q.getType(), 0) >= typeLimit) continue;

            Difficulty diff = q.getDifficulty();
            if (!usedIds.contains(q.getId()) && current.get(diff) < target.getOrDefault(diff, 0)) {
                result.add(q);
                usedIds.add(q.getId());
                current.put(diff, current.get(diff) + 1);
                typeCount.put(q.getType(), typeCount.getOrDefault(q.getType(), 0) + 1);

                if (q.getType() == QuestionType.CS_KNOWLEDGE) csKnowledgeCount++;
            }

            if (result.size() >= easyCount + mediumCount + hardCount) break;
        }

        return result;
    }


}
