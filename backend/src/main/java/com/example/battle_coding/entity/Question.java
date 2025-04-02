package com.example.battle_coding.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionType type;  // 예: FILL_IN_BLANK, PREDICT_OUTPUT, CODING_TRIVIA

    @Column(columnDefinition = "TEXT", nullable = true)
    private String question;  // 텍스트 문제 (코딩 상식 퀴즈용)

    @Column(length = 500, nullable = true)
    private String imageUrl;  // 코드 관련 문제는 이미지로 저장

    @Column(nullable = false)
    private String answer;  // 정답 (사용자가 입력할 정답)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty;  // EASY, MEDIUM, HARD

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
