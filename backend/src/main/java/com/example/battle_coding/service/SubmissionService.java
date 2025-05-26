package com.example.battle_coding.service;

import com.example.battle_coding.dto.request.SubmissionRequestDto;
import com.example.battle_coding.dto.response.CorrectAnswerResponseDto;
import com.example.battle_coding.dto.response.SubmissionResponseDto;
import com.example.battle_coding.entity.Question;
import com.example.battle_coding.entity.QuestionType;
import com.example.battle_coding.entity.Submission;
import com.example.battle_coding.entity.User;
import com.example.battle_coding.repository.QuestionRepository;
import com.example.battle_coding.repository.SubmissionRepository;
import com.example.battle_coding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final SubmissionRepository submissionRepository;

    private static final int XP_EASY = 10;
    private static final int XP_MEDIUM = 20;
    private static final int XP_HARD = 30;

    private static final int PENALTY_EASY = 5;
    private static final int PENALTY_MEDIUM = 10;
    private static final int PENALTY_HARD = 15;

    private static final int MAX_TIME = 15; // 한 문제 제한 시간 (초)
    private static final int BONUS_TIME_LIMIT = 10; // 보너스 적용 가능한 최대 시간 (초)
    private static final double MAX_BONUS_RATIO = 0.6; // 최대 보너스 비율

    public SubmissionResponseDto submit(SubmissionRequestDto request, Authentication authentication) {
        User user = getUserFromAuth(authentication);
        Question question = getQuestionById(request.questionId());
        boolean isCorrect = checkAnswer(question, request.userAnswer());
        int timeTaken = request.timeTaken() != null ? request.timeTaken() : 0;
        int xpEarned = 0;

        // 답이 맞았고 랭킹 모드라면 xpEarned를 계산
        // 랭킹 모드인데 오답 제출 시 xp 감점
        if (Boolean.TRUE.equals(request.isRanking())) {
            if (isCorrect) {
                xpEarned = calculateXp(question.getDifficulty().name(), timeTaken);
            } else {
                xpEarned = -getPenaltyXp(question.getDifficulty().name());
            }
        }

        // ✅ 랭킹 여부와 무관하게 정답/제출 기록 반영
        // 일반 모드는 xpEarned = 0
        user.updateXpAndCorrect(xpEarned, isCorrect);


        Submission submission = Submission.builder()
                .user(user)
                .question(question)
                .userAnswer(request.userAnswer())
                .isCorrect(isCorrect)
                .timeTaken(timeTaken)
                .xpEarned(xpEarned)
                .isRanking(Boolean.TRUE.equals(request.isRanking()))
                .submittedAt(LocalDateTime.now())
                .build();

        submissionRepository.save(submission);

        return new SubmissionResponseDto(
                isCorrect,
                xpEarned,
                generateMessage(isCorrect),
                user.getXp(),
                user.getTotalCorrect(),
                user.getTotalSubmitted(),
                question.getId(),
                question.getDifficulty().name(),
                question.getType().name(),
                question.isRankingOnly(),
                request.userAnswer()
        );

    }

    private User getUserFromAuth(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        String email = (String) authentication.getPrincipal();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("유저 정보를 찾을 수 없습니다."));
    }

    private Question getQuestionById(Integer questionId) {
        return questionRepository.findById(questionId.longValue())
                .orElseThrow(() -> new IllegalArgumentException("해당 문제를 찾을 수 없습니다."));
    }

    private boolean checkAnswer(Question question, String userAnswer) {
        QuestionType type = question.getType();

        // CS 지식 문제는 공백과 대소문자를 구분하지 않음
        return question.getAnswers().stream().anyMatch(answer -> {
            if (type == QuestionType.CS_KNOWLEDGE) {
                return answer.replaceAll("\\s", "")
                        .equalsIgnoreCase(userAnswer.replaceAll("\\s", ""));
            } else {
                return answer.equals(userAnswer); // 나머지 유형은 대소문자 + 공백 포함해서 비교
            }
        });
    }

    private String generateMessage(boolean isCorrect) {
        return isCorrect ? "정답입니다!" : "오답입니다.";
    }

    private int calculateXp(String difficulty, int timeTaken) {
        int base = switch (difficulty) {
            case "EASY" -> XP_EASY;
            case "MEDIUM" -> XP_MEDIUM;
            case "HARD" -> XP_HARD;
            default -> 0;
        };

        base += calculateBonus(base, timeTaken);

        return base;
    }

    private int calculateBonus(int baseXp, int timeTaken) {
        if (timeTaken > BONUS_TIME_LIMIT) return 0;
        double bonusRatio = (BONUS_TIME_LIMIT - timeTaken) * (MAX_BONUS_RATIO / BONUS_TIME_LIMIT);
        return (int) Math.round(baseXp * bonusRatio);
    }

    private int getPenaltyXp(String difficulty) {
        return switch (difficulty) {
            case "EASY" -> PENALTY_EASY;
            case "MEDIUM" -> PENALTY_MEDIUM;
            case "HARD" -> PENALTY_HARD;
            default -> 0;
        };
    }

    public CorrectAnswerResponseDto getCorrectAnswersForWrongAttempt(String email, Long questionId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("해당 문제를 찾을 수 없습니다."));

        // 랭킹 전용 문제인 경우 차단
        if (question.isRankingOnly()) {
            return CorrectAnswerResponseDto.fail("연습 모드 문제에만 정답을 제공할 수 있습니다.");
        }

        // 오답 제출 여부 확인
        boolean hasWrongAttempt = submissionRepository.existsByUserAndQuestionAndIsCorrectFalse(user, question);

        if (!hasWrongAttempt) {
            return CorrectAnswerResponseDto.fail("해당 문제에 대한 오답 제출 이력이 없습니다.");
        }

        return CorrectAnswerResponseDto.success(question.getAnswers());
    }

}
