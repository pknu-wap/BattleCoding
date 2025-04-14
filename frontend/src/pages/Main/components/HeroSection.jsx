import './HeroSection.scss';

export default function HeroSection() {
    return (
        <section className='hero'>
            <div className='heroContent'>
                <h1 className='heroTitle'>Battle Coding</h1>
                <p className='heroSubtitle'>게임처럼 즐기는 코딩 퀴즈 플랫폼</p>
                <button className='heroBtn'>지금 시작하기</button>
            </div>
        </section>
    )
}