package com.example.battle_coding;

import com.example.battle_coding.entity.Question;
import com.example.battle_coding.repository.QuestionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.*;

@Profile("dev")
@Component
@RequiredArgsConstructor
public class QuestionJsonLoader {

    private final QuestionRepository questionRepository;
    private final ObjectMapper objectMapper;

    @PostConstruct
    public void loadAllQuestions() {
        System.out.println("[초기화] 문제 삽입 또는 업데이트 시작");

        List<String> files = List.of(
                "questions/normal/fill_in_blank.json",
                "questions/normal/predict_output.json",
                "questions/normal/cs_knowledge.json",
                "questions/normal/word_chain.json",
                "questions/ranking/cs_ranking_only.json",
                "questions/ranking/fill_ranking_only.json",
                "questions/ranking/predict_ranking_only.json"
        );

        Set<Integer> seenIds = new HashSet<>();
        int totalProcessed = 0;

        for (String filePath : files) {
            try (InputStream is = getClass().getClassLoader().getResourceAsStream(filePath)) {
                if (is == null) {
                    System.err.println("[문제 로딩 실패] 파일을 찾을 수 없습니다: " + filePath);
                    continue;
                }

                List<Question> questions = Arrays.asList(objectMapper.readValue(is, Question[].class));
                int processed = 0;

                for (Question newQ : questions) {
                    Integer id = newQ.getId();
                    if (id == null) {
                        throw new IllegalArgumentException("❌ 문제에 ID가 없습니다. 파일: " + filePath + ", 내용: " + newQ);
                    }

                    if (!seenIds.add(id)) {
                        throw new IllegalStateException("❌ 중복된 문제 ID 감지됨: " + id + " (파일: " + filePath + ")");
                    }

                    questionRepository.findById(Long.valueOf(id))
                            .ifPresentOrElse(
                                    existing -> update(existing, newQ),
                                    () -> questionRepository.save(newQ)
                            );
                    processed++;
                }

                totalProcessed += processed;
                System.out.println("[문제 처리 완료] " + filePath + " → " + processed + "개");

            } catch (Exception e) {
                System.err.println("[문제 로딩 에러] " + filePath + " → " + e.getMessage());
            }
        }

        System.out.println("[총 완료] 전체 문제 수: " + totalProcessed + "개");
    }

    private void update(Question existing, Question incoming) {
        existing.setType(incoming.getType());
        existing.setQuestion(incoming.getQuestion());
        existing.setImageUrl(incoming.getImageUrl());
        existing.setAnswers(incoming.getAnswers());
        existing.setDifficulty(incoming.getDifficulty());
        existing.setRankingOnly(incoming.isRankingOnly());
        questionRepository.save(existing);
    }
}
