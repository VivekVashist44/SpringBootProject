package com.portfolio.journalApp.entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NonNull;

import java.time.LocalDateTime;

@Document
@Data
public class JournalEntry {

	@Id
	private ObjectId id;
	@NonNull
	private String title;
	
	private String content;
	
	private LocalDateTime date;
	

		
}
