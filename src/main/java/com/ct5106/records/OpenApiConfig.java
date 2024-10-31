package com.ct5106.records;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
@Configuration
public class OpenApiConfig
{
    @Bean
    public OpenAPI recordsOpenAPI()
    {
        return new OpenAPI().info(new Info()
                .title("Record REST API").description("My record stock").version("1.0"));
    }
}
