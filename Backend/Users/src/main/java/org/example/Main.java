package org.example;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "API Exemplo", version = "1.0", description = "Documentação da API"))
@CrossOrigin()
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}