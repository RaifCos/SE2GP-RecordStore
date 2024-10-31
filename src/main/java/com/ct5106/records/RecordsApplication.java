package com.ct5106.records;

import com.ct5106.records.domain.*;
import com.ct5106.records.domain.Record;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class RecordsApplication implements CommandLineRunner{
	private final RecordRepository repository;
	private final ArtistRepository arepository;
	private final AppUserRepository urepository;
	private final CartRepository crepository;

	private static final Logger logger = LoggerFactory.getLogger(RecordsApplication.class);


	public RecordsApplication(RecordRepository repository, ArtistRepository arepository, AppUserRepository urepository, CartRepository crepository)
	{
		this.repository = repository;
		this.arepository = arepository;
		this.urepository = urepository;
        this.crepository = crepository;
    }

	public static void main(String[] args) {
		SpringApplication.run(RecordsApplication.class, args);
		logger.info("Records Application started");
	}

	@Override
	public void run(String... args) throws Exception
	{
		AppUser user1 = urepository.save(new AppUser("user", "$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue", "USER"));
		// username, password, role
// "user", "user", "USER"
		//urepository.save(new
		//		AppUser("user","$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue","USER"))
		;
// "admin", "admin", ADMIN"
		urepository.save(new
				AppUser("admin","$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", "ADMIN"));

		for (AppUser user : urepository.findAll()) {
			logger.info("User: {} with Role: {} and password: {}", user.getUsername(), user.getRole(), user.getPassword());
		}


		Artist artist1 = new Artist("Taylor Swift",1);
		Artist artist2 = new Artist("Belle and Sebastian", 6);
		Artist artist3 = new Artist("Sweet Trip", 2);
		Artist artist4 = new Artist("Kendrick Lamar", 1);
		Artist artist5 = new Artist("Olivia Rodrigo", 1);
		arepository.save(artist1);
		arepository.save(artist2);
		arepository.save(artist3);
		arepository.save(artist4);
		arepository.save(artist5);


		Record r1 = repository.save(new Record("Speak Now", artist1, "Pop", 2010, 30));
		Record r2 = repository.save(new Record("If You're Feeling Sinister", artist2, "Folk", 1996, 25));
		repository.save(new Record("You Will Never Know Why", artist3, "Pop", 2009, 20));
		repository.save(new Record("To Pimp A Butterfly", artist4, "Rap", 2015, 35));
		repository.save(new Record("Sour", artist5, "Pop", 2021, 20));
		repository.save(new Record("Damn", null, "Rap", 2017, 20));

		List<Record> recordsList = new ArrayList<>();

		// Add records to the ArrayList
		recordsList.add(r1);
		recordsList.add(r2);

		Cart cart = new Cart(user1, recordsList);
		cart.setTotal();  // Calculate and set total
		crepository.save(cart);

		//Fetch all records and log to console
		for (Record record : repository.findAll())
		{
			logger.info("name: {}, price: {}", record.getName(), record.getPrice());
		}
	}
}
