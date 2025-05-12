package com.example.battle_coding.repository;

import com.example.battle_coding.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByProviderId(String providerId);
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);

    // 정확도 기준 사용자 정렬 (정답률이 높은 순서, 시도한 문제 수가 1개 이상인 사용자만)
    @Query("SELECT u FROM User u WHERE u.totalAttempts > 0 ORDER BY (1.0 * u.totalCorrect / u.totalAttempts) DESC")
    List<User> findAllByAccuracyDesc(Pageable pageable);
}
