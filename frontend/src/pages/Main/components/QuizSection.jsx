import './QuizSection.scss';

export default function QuizSection() {
    return (
        <section className="quizsection">
            <div className="quizCards">
                <div className="quizCard">
                    <div className="quizEmoji">✏️</div>
                    <div className="quizMain">코드 빈칸 채우기</div>
                    <div className="quizSub">빈칸에 들어갈 코드를 맞혀보세요!</div>
                </div>

                <div className="quizCard">
                    <div className="quizEmoji">🔍</div>
                    <div className="quizMain">결과 예측</div>
                    <div className="quizSub">코드 실행 결과를 예상해보세요!</div>
                </div>

                <div className="quizCard">
                    <div className="quizEmoji">💡</div>
                    <div className="quizMain">CS 지식</div>
                    <div className="quizSub">운영체제, 네트워크, DB, 보안 등</div>
                </div>
            </div>
        </section>
    );
}