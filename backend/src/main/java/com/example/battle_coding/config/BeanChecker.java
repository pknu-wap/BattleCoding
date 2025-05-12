package com.example.battle_coding.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("dev")
@Component
public class BeanChecker implements CommandLineRunner {

    private final ApplicationContext applicationContext;

    public BeanChecker(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void run(String... args) {
        for (String beanName : applicationContext.getBeanDefinitionNames()) {

                System.out.println("등록된 Bean: " + beanName);

        }
    }
}
