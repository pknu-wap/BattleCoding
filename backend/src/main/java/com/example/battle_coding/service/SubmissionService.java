package com.example.battle_coding.service;

import com.example.battle_coding.dto.request.SubmissionRequestDto;
import com.example.battle_coding.dto.response.SubmissionResponseDto;
import com.example.battle_coding.entity.Question;
import com.example.battle_coding.entity.QuestionType;
import com.example.battle_coding.entity.User;
import com.example.battle_coding.repository.QuestionRepository;
import com.example.battle_coding.repository.SubmissionRepository;
import com.example.battle_coding.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final SubmissionRepository submissionRepository;

    public SubmissionResponseDto submit(SubmissionRequestDto request, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalArgumentException("로그인이 필요합니다.");
        }

        String email = (String) authentication.getPrincipal();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("유저 정보를 찾을 수 없습니다."));

        Question question = questionRepository.findById(request.questionId().longValue())
                .orElseThrow(() -> new IllegalArgumentException("해당 문제를 찾을 수 없습니다."));

        QuestionType type = question.getType();
        String userAnswer = request.userAnswer();

        boolean isCorrect = question.getAnswers().stream().anyMatch(answer -> {
            if (type == QuestionType.CS_KNOWLEDGE) {
                // 공백 제거 + 대소문자 무시
                return answer.replaceAll("\\s", "")
                        .equalsIgnoreCase(userAnswer.replaceAll("\\s", ""));
            } else {
                // 완전 일치 (대소문자 & 공백 포함)
                return answer.equals(userAnswer);
            }
        });

        int xpEarned = 0;

        // 랭킹 모드라면 사용자의 경험치를 증가
//        if (isCorrect) {
//            if (request.isRanking()) {
//                xpEarned = calculateXp(question.getDifficulty().name, request.timeTaken());
//            }
//
//            user.updateAndCorrect(xpEarned, true);
//        }
        return null;
    }
}
