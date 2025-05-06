package com.example.battle_coding;

import com.example.battle_coding.entity.Question;
import com.example.battle_coding.entity.QuestionType;
import com.example.battle_coding.repository.QuestionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

@Profile("dev")
@Component
@RequiredArgsConstructor
public class QuestionJsonLoader {

    private final QuestionRepository questionRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostConstruct
    public void loadAllQuestions() {
        loadFromJson("questions/fill_in_blank.json");
        loadFromJson("questions/predict_output.json");
        loadFromJson("questions/cs_knowledge.json");
        loadFromJson("questions/cs_ranking_only.json");
        loadFromJson("questions/fill_ranking_only.json");
        loadFromJson("questions/predict_ranking_only.json");
    }

    private void loadFromJson(String filePath) {
        try {
            InputStream is = getClass().getClassLoader().getResourceAsStream(filePath);
            if (is == null) {
                System.err.println("[문제 로딩 실패] 파일을 찾을 수 없습니다: " + filePath);
                return;
            }

            List<Question> questions = Arrays.asList(
                    objectMapper.readValue(is, Question[].class)
            );
            int savedCount = 0;

            for (Question q : questions) {
                if (q.getType() == QuestionType.CS_KNOWLEDGE) {
                    if (q.getQuestion() == null) continue;
                    if (!questionRepository.existsByTypeAndQuestion(q.getType(), q.getQuestion())) {
                        questionRepository.save(q);
                        savedCount++;
                    }
                } else {
                    if (q.getImageUrl() == null) continue;
                    if (!questionRepository.existsByTypeAndImageUrl(q.getType(), q.getImageUrl())) {
                        questionRepository.save(q);
                        savedCount++;
                    }
                }
            }

            System.out.println("[문제 추가 완료] " + filePath + " → " + savedCount + "개 저장됨");

        } catch (Exception e) {
            System.err.println("[문제 로딩 에러] " + filePath + " → " + e.getMessage());
        }
    }
}
