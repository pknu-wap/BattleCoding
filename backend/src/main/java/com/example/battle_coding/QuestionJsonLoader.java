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
        // 기존 문제 전체 삭제
        questionRepository.deleteAll();
        System.out.println("[초기화] 기존 문제 삭제 완료");

        // JSON 파일 목록
        List<String> files = List.of(
                "questions/fill_in_blank.json",
                "questions/predict_output.json",
                "questions/cs_knowledge.json",
                "questions/cs_ranking_only.json",
                "questions/fill_ranking_only.json",
                "questions/predict_ranking_only.json"
        );

        // 중복 체크용 ID 저장소
        Set<Integer> seenIds = new HashSet<>();

        int totalSaved = 0;

        for (String filePath : files) {
            try {
                InputStream is = getClass().getClassLoader().getResourceAsStream(filePath);
                if (is == null) {
                    System.err.println("[문제 로딩 실패] 파일을 찾을 수 없습니다: " + filePath);
                    continue;
                }

                List<Question> questions = Arrays.asList(objectMapper.readValue(is, Question[].class));
                int savedCount = 0;

                for (Question q : questions) {
                    Integer id = q.getId();
                    if (id == null) {
                        throw new IllegalArgumentException("❌ 문제에 ID가 없습니다. 파일: " + filePath + ", 내용: " + q);
                    }

                    if (!seenIds.add(id)) {
                        throw new IllegalStateException("❌ 중복된 문제 ID 감지됨: " + id + " (파일: " + filePath + ")");
                    }

                    questionRepository.save(q);
                    savedCount++;
                }

                totalSaved += savedCount;
                System.out.println("[문제 추가 완료] " + filePath + " → " + savedCount + "개 저장됨");

            } catch (Exception e) {
                System.err.println("[문제 로딩 에러] " + filePath + " → " + e.getMessage());
            }
        }

        System.out.println("[총 완료] 전체 문제 수: " + totalSaved + "개");
    }
}
