package com.example.battle_coding.service;

import com.example.battle_coding.dto.request.SubmissionRequestDto;
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

    public SubmissionResponseDto submit(SubmissionRequestDto request, Authentication authentication) {
        User user = getUserFromAuth(authentication);
        Question question = getQuestionById(request.questionId());
        boolean isCorrect = checkAnswer(question, request.userAnswer());
        int timeTaken = request.timeTaken() != null ? request.timeTaken() : 0;
        int xpEarned = 0;

        // 답이 맞았고 랭킹 모드라면 xpEarned를 계산
        if (isCorrect) {
            if (request.isRanking()) {
                xpEarned = calculateXp(question.getDifficulty().name(), timeTaken);
            }
            user.updateXpAndCorrect(xpEarned, true);
        }

        Submission submission = Submission.builder()
                .user(user)
                .question(question)
                .userAnswer(request.userAnswer())
                .isCorrect(isCorrect)
                .timeTaken(timeTaken)
                .xpEarned(xpEarned)
                .isRanking(request.isRanking())
                .submittedAt(LocalDateTime.now())
                .build();

        submissionRepository.save(submission);

        return new SubmissionResponseDto(
                isCorrect,
                xpEarned,
                generateMessage(isCorrect),
                user.getXp()
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
            case "EASY" -> 10;
            case "MEDIUM" -> 20;
            case "HARD" -> 30;
            default -> 0;
        };

        // 5초 이내에 맞출 경우, 최대 50% 까지 보너스 비율 증가
        if (timeTaken <= 5) {
            double bonusRatio = (6 - timeTaken) * 0.1; // 1초: 0.5, 5초: 0.1
            base = (int) Math.round(base * (1 + bonusRatio));
        }

        return base;
    }
}
