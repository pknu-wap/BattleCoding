package com.example.battle_coding;

import com.example.battle_coding.entity.Question;
import com.example.battle_coding.repository.QuestionRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class QuestionJsonLoader {

    private final QuestionRepository questionRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostConstruct
    public void loadAllQuestions() {
        questionRepository.deleteAll();  // 테스트 시, 매번 지우고 다시 삽입
        loadFromJson("questions/fill_in_blank.json");
        loadFromJson("questions/predict_output.json");
        loadFromJson("questions/cs_knowledge.json");
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
            questionRepository.saveAll(questions);
            System.out.println("[문제 로딩 성공] " + filePath + " → " + questions.size() + "개 저장됨");

        } catch (Exception e) {
            System.err.println("[문제 로딩 에러] " + filePath + " → " + e.getMessage());
        }
    }
}
