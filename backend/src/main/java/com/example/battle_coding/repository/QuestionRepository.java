package com.example.battle_coding.repository;

import com.example.battle_coding.entity.Question;
import com.example.battle_coding.entity.QuestionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    // 일반 문제 - 유형 기반
    @Query(value = "SELECT * FROM questions WHERE is_deleted = false AND is_ranking_only = false AND type = :type ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<Question> findRandomGeneralQuestionsByType(@Param("type") String type, @Param("count") int count);

    // 일반 문제 - 난이도 기반
    @Query(value = "SELECT * FROM questions WHERE is_deleted = false AND is_ranking_only = false AND difficulty = :difficulty ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<Question> findRandomGeneralQuestionsByDifficulty(@Param("difficulty") String difficulty, @Param("count") int count);

    // 일반 문제 - 유형 + 난이도 필터
    @Query(value = "SELECT * FROM questions WHERE is_deleted = false AND is_ranking_only = false AND type = :type AND difficulty = :difficulty ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<Question> findRandomGeneralQuestionsByTypeAndDifficulty(
            @Param("type") String type,
            @Param("difficulty") String difficulty,
            @Param("count") int count
    );

    // 랭킹 전용 문제 - 유형 + 난이도
    @Query(value = "SELECT * FROM questions WHERE is_deleted = false AND is_ranking_only = true AND type = :type AND difficulty = :difficulty ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<Question> findRandomRankingQuestionsByTypeAndDifficulty(
            @Param("type") String type,
            @Param("difficulty") String difficulty,
            @Param("count") int count
    );

    List<Question> findAllByIsRankingOnly(boolean isRankingOnly);

    boolean existsByTypeAndQuestion(QuestionType type, String question);
    boolean existsByTypeAndImageUrl(QuestionType type, String imageUrl);

}

