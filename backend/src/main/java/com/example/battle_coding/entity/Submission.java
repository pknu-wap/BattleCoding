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
@Table(name = "submissions")
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String userAnswer;  // 사용자가 제출한 답안

    @Column(nullable = false)
    private Boolean isCorrect;  // 정답 여부

    @Column(nullable = false)
    private Integer timeTaken;  // 문제 풀이에 걸린 시간 (초 단위)

    @Column(nullable = false)
    private Integer xpEarned;  // 사용자가 해당 제출에서 얻은 경험치

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime submittedAt = LocalDateTime.now();
}
