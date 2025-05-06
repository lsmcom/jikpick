package kr.it.code.main.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // http://localhost:9090/files/uploads/파일명 으로 접근 가능하게 매핑
        registry.addResourceHandler("/files/uploads/**")
                .addResourceLocations("file:C:/files/uploads/");
    }
}
