package com.example.battle_coding.repository;

import com.example.battle_coding.entity.ProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileImageRepository extends JpaRepository<ProfileImage, Long> {
    boolean existsByImageUrl(String imageUrl);

    @Query("SELECT i.imageUrl FROM ProfileImage i ORDER BY i.id ASC")
    List<String> findAllOrderedById();
}

