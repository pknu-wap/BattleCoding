package com.example.battle_coding.repository;

import com.example.battle_coding.entity.Question;
import com.example.battle_coding.entity.Submission;
import com.example.battle_coding.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Integer> {
    boolean existsByUserAndQuestionAndIsCorrectFalse(User user, Question question);

}
