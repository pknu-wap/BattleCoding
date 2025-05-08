package com.example.battle_coding.dto.response;

public class UserRankingResponseDto {
    private int rank;
    private String username;
    private int xp;
    private int correct;
    private int wrong;
    private double percent;

    public UserRankingResponseDto(int rank, String username, int xp, int correct, int wrong, double percent) {
        this.rank = rank;
        this.username = username;
        this.xp = xp;
        this.correct = correct;
        this.wrong = wrong;
        this.percent = percent;
    }

    // Getter & Setter
    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getXp() {
        return xp;
    }

    public void setXp(int xp) {
        this.xp = xp;
    }

    public int getCorrect() {
        return correct;
    }

    public void setCorrect(int correct) {
        this.correct = correct;
    }

    public int getWrong() {
        return wrong;
    }

    public void setWrong(int wrong) {
        this.wrong = wrong;
    }

    public double getPercent() {
        return percent;
    }

    public void setPercent(double percent) {
        this.percent = percent;
    }
}
