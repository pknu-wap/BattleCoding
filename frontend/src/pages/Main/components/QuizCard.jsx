import './QuizCard.scss';

export default function QuizCard({ title, description }) {
    return (
        <div className='quizcard'>
            <h3 className='quizcardTitle'>{title}</h3>
            <p className='quizcardDesc'>{description}</p>
        </div>
    );
}