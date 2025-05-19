export function getBonusRatio(timeTaken) {
    if (timeTaken >= 10) return 0;
    return (10 - timeTaken) * (0.5 / 10);
}

export function calculateFinalScore(baseScore, timeTaken) {
    return baseScore * (1 + getBonusRatio(timeTaken));
}