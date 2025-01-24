package com.portfolio.journalApp.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.portfolio.journalApp.entity.JournalEntry;

public interface JournalEntryRepository extends MongoRepository<JournalEntry,ObjectId>{

}
