package com.example.battle_coding;

import com.example.battle_coding.entity.Question;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class QuestionJsonTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testDeserializeQuestion() throws Exception {
        String json = """
            {
                "type": "CS_KNOWLEDGE",
                "question": "테스트 질문",
                "imageUrl": null,
                "answers": ["정답1", "정답2"],
                "difficulty": "MEDIUM",
                "isRankingOnly": true
            }
            """;

        Question q = objectMapper.readValue(json, Question.class);

        assertTrue(q.isRankingOnly()); // 여기서 확인
    }
}
