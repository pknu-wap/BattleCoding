import QuizCard from "./QuizCard";
import './QuizSection.scss';

export default function QuizSection() {
    return (
        <section className="quizsection">
            <div className="quizsectionGrid">
                <QuizCard
                    title="빈칸 삽입"
                    description="코드를 완성해보세요!"
                />
                <QuizCard
                    title="결과 예측"
                    description="결과가 무엇일까요?"
                />
                <QuizCard
                    title="CS 지식"
                    description="알아두면 유용한 지식!"
                />
            </div>
        </section>
    );
}