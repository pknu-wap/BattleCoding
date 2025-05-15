package com.example.battle_coding.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = true)
    private String email;

    @Column(nullable = true)
    private String password;

    @Column(unique = true, nullable = false, length = 25)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private LoginProvider provider = LoginProvider.LOCAL;

    @Column(unique = true, nullable = false)
    private String providerId;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int totalCorrect = 0;

//    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
//    private int totalAttempts = 0;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int totalSubmitted = 0;  // totalSubmitted 필드 추가

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int xp = 0;

    @Column(length = 500)
    private String refreshToken;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // XP와 정답 수를 업데이트하는 메서드
    public void updateXpAndCorrect(int xp, boolean correct) {
        this.xp += xp;
//        this.totalAttempts += 1;
        this.totalSubmitted += 1;  // 문제를 제출할 때마다 totalSubmitted 증가
        if (correct) this.totalCorrect += 1;
    }
}
