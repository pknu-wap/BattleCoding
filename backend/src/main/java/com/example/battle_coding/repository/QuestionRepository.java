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
    @Query(value = "SELECT * FROM questions WHERE type = :type ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<Question> findRandomByType(@Param("type") String type, @Param("count") int count);

    @Query(value = "SELECT * FROM questions WHERE difficulty = :difficulty ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<Question> findRandomByDifficulty(@Param("difficulty") String difficulty, @Param("count") int count);

    @Query(value = "SELECT * FROM questions WHERE type = :type AND difficulty = :difficulty ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<Question> findRandomByTypeAndDifficulty(
            @Param("type") String type,
            @Param("difficulty") String difficulty,
            @Param("count") int count
    );

    List<Question> findAllByIsRankingOnly(boolean isRankingOnly);

    boolean existsByTypeAndQuestion(QuestionType type, String question);
    boolean existsByTypeAndImageUrl(QuestionType type, String imageUrl);

}

