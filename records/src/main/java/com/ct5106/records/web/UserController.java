package com.ct5106.records.web;

import com.ct5106.records.domain.AppUser;
import com.ct5106.records.domain.AppUserRepository;
import com.ct5106.records.domain.Artist;
import com.ct5106.records.domain.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final AppUserRepository appUserRepository;

    @Autowired
    public UserController(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    // Get all artists
    @GetMapping
    public List<AppUser> getAllUsers() {
        return (List<AppUser>) appUserRepository.findAll();
    }

    // Get an artist by ID
    @GetMapping("/{id}")
    public ResponseEntity<AppUser> getUserById(@PathVariable Long id) {
        Optional<AppUser> user = appUserRepository.findById(id);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new artist
    @PostMapping
    public AppUser createUser(@RequestBody AppUser user) {
        return appUserRepository.save(user);
    }

//    // Update an existing artist
//    @PutMapping("/{id}")
//    public ResponseEntity<Artist> updateArtist(@PathVariable Long id, @RequestBody Artist artistDetails) {
//        Optional<Artist> artistOptional = artistRepository.findById(id);
//        if (!artistOptional.isPresent()) {
//            return ResponseEntity.notFound().build();
//        }
//        Artist artist = artistOptional.get();
//        artist.setName(artistDetails.getName());
//        artist.setYearEstablished(artistDetails.getYearEstablished());
//        artist.setCountry(artistDetails.getCountry());
//        artist.setAlbums(artistDetails.getAlbums()); // If you have a setter for albums
//        Artist updatedArtist = artistRepository.save(artist);
//        return ResponseEntity.ok(updatedArtist);
//    }

    // Delete an artist
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!appUserRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        appUserRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}