package com.example.battle_coding.entity;

import com.example.battle_coding.dto.response.RankingResponseDto;
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

    private static String DEFAULT_IMAGE = "https://res.cloudinary.com/dmby7fmvo/image/upload/v1747656353/%EA%B8%B0%EB%B3%B8_%ED%94%84%EB%A1%9C%ED%95%84_o4xxyn.png";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = true)
    private String email;

    @Setter
    @Column(nullable = true)
    private String password;

    @Setter
    @Column(unique = true, nullable = false, length = 25)
    private String nickname;

    @Builder.Default
    @Setter
    @Column(name = "profile_image", length = 500)
    private String profileImage = DEFAULT_IMAGE;

    @Setter
    @Column(nullable = false)
    private boolean nicknameChanged = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private LoginProvider provider = LoginProvider.LOCAL;

    @Column(unique = true, nullable = false)
    private String providerId;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int totalCorrect = 0;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int totalSubmitted = 0;

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
        if (this.xp < 0) this.xp = 0;
        this.totalSubmitted += 1;
        if (correct) this.totalCorrect += 1;
    }

    // 랭킹 DTO로 변환하는 메서드 (순위 포함)
    public RankingResponseDto toRankingResponseDto(int rank) {
        return new RankingResponseDto(
                this.nickname,
                this.xp,
                this.totalSubmitted,
                this.totalCorrect,
                this.totalSubmitted - this.totalCorrect, // wrong 계산
                rank
        );
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

}
