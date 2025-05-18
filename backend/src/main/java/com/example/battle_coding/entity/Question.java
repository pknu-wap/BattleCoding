package com.example.battle_coding.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "questions")
public class Question {
    @Id
    private Integer id;

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(length = 50, nullable = false)
    private QuestionType type;  // 예: FILL_IN_BLANK, PREDICT_OUTPUT, CS_KNOWLEDGE

    @Setter
    @Column(columnDefinition = "TEXT", nullable = true)
    private String question;  // 텍스트 문제 (코딩 상식 퀴즈용)

    @Setter
    @Column(length = 500, nullable = true)
    private String imageUrl;  // 코드 관련 문제는 이미지로 저장

    // 다중 정답 허용
    @Setter
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name="question_answers", joinColumns = @JoinColumn(name="question_id"))
    @Column(name="answer", nullable = false)
    private List<String> answers = new ArrayList<>();

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty;  // EASY, MEDIUM, HARD

    // 연습모드 출제 여부 설정
    @Column(name = "is_ranking_only", nullable = false)
    @JsonProperty("isRankingOnly")
    private boolean isRankingOnly = false;

    @Column(name = "is_deleted", nullable = false)
    @JsonProperty("isDeleted")
    private boolean isDeleted = false;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // question과 imageUrl 둘 다 null 일 수는 없음
    @PrePersist
    @PreUpdate
    private void validateQuestion() {
        if ((question == null || question.trim().isEmpty()) && (imageUrl == null || imageUrl.trim().isEmpty())) {
            throw new IllegalStateException("문제는 텍스트 또는 이미지 중 하나는 반드시 포함해야 합니다.");
        }
    }

}
