package com.example.battle_coding.repository;

import com.example.battle_coding.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByProviderId(String providerId);
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);

    // XP 기준 사용자 정렬 (XP 높은 순서로 상위 N명)
    List<User> findAllByOrderByXpDesc(Pageable pageable);
}
