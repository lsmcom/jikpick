package kr.it.code.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;


@Controller
@Slf4j
public class HomeCotroller {

	@GetMapping("/home")
	public String home() {
		log.info("=================하이 =====================");
		return "views/home";
	}
}
