package com.ct5106.records;

import com.ct5106.records.domain.Artist;
import com.ct5106.records.domain.ArtistRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.ct5106.records.domain.Record;
import com.ct5106.records.domain.RecordRepository;
import org.springframework.boot.CommandLineRunner;

@SpringBootApplication
public class RecordsApplication implements CommandLineRunner{
	private final RecordRepository repository;
	private final ArtistRepository arepository;


	private static final Logger logger = LoggerFactory.getLogger(RecordsApplication.class);

	public RecordsApplication(RecordRepository repository, ArtistRepository arepository)
	{
		this.repository = repository;
		this.arepository = arepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(RecordsApplication.class, args);
		logger.info("Records Application started");
	}

	@Override
	public void run(String... args) throws Exception
	{
		Artist artist1 = new Artist("Taylor Swift");
		Artist artist2 = new Artist("Belle and Sebastian");
		Artist artist3 = new Artist("Sweet Trip");
		Artist artist4 = new Artist("Kendrick Lamar");
		Artist artist5 = new Artist("Olivia Rodrigo");
		arepository.save(artist1);
		arepository.save(artist2);
		arepository.save(artist3);
		arepository.save(artist4);
		arepository.save(artist5);


		repository.save(new Record("Speak Now", artist1, "Pop", 2010, 30));
		repository.save(new Record("If You're Feeling Sinister", artist2, "Folk", 1996, 25));
		repository.save(new Record("You Will Never Know Why", artist3, "Pop", 2009, 20));
		repository.save(new Record("To Pimp A Butterfly", artist4, "Rap", 2015, 35));
		repository.save(new Record("Sour", artist5, "Pop", 2021, 20));

		//Fetch all records and log to console
		for (Record record : repository.findAll())
		{
			logger.info("name: {}, price: {}", record.getName(), record.getPrice());
		}
	}
}
