package com.example.battle_coding.controller;

import com.example.battle_coding.entity.ProfileImage;
import com.example.battle_coding.repository.ProfileImageRepository;
import com.example.battle_coding.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileImageController {

    private final ProfileImageRepository profileImageRepository;
    private final UserService userService;

    @GetMapping("/images")
    public ResponseEntity<List<String>> getAllProfileImages() {
        List<String> imageUrls = profileImageRepository.findAllOrderedById();
        return ResponseEntity.ok(imageUrls);
    }

}
