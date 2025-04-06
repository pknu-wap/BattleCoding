package com.example.battle_coding;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing

public class BattleCodingApplication {

	public static void main(String[] args) {
		SpringApplication.run(BattleCodingApplication.class, args);
	}

}
