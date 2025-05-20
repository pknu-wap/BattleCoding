package com.example.battle_coding.controller;

import com.example.battle_coding.repository.ProfileImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.battle_coding.entity.ProfileImage;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileImageController {

    private final ProfileImageRepository profileImageRepository;

    @GetMapping("/images")
    public ResponseEntity<List<String>> getAllProfileImages() {
        List<String> imageUrls = profileImageRepository.findAll()
                .stream()
                .map(ProfileImage::getImageUrl)
                .toList();
        return ResponseEntity.ok(imageUrls);
    }
}
