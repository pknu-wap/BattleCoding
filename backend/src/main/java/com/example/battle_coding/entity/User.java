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
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = true)
    private String email;  // 소셜 로그인 사용자는 이메일이 없을 수도 있음

    @Column(nullable = true)
    private String password;  // 소셜 로그인 사용자는 비밀번호가 없을 수도 있음

    @Column(unique = true, nullable = false, length = 25)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private LoginProvider provider = LoginProvider.LOCAL;  // 기본값 LOCAL

    @Column(unique = true, nullable = false)
    private String providerId;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int totalCorrect = 0;  // 맞춘 문제 개수

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int xp = 0;  // 경험치, 랭킹 계산에 사용

    @Column(length = 500)
    private String refreshToken;  // JWT Refresh Token 저장

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

}
