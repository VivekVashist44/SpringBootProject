package com.portfolio.journalApp.service;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.portfolio.journalApp.entity.JournalEntry;
import com.portfolio.journalApp.entity.User;
import com.portfolio.journalApp.repository.JournalEntryRepository;

@Component
public class JournalEntryService {
	
	@Autowired
	private JournalEntryRepository journalEntryRepository; 
	
	@Autowired
	private UserService userService;
	
	@Transactional
	public void saveEntry(JournalEntry journalEntry, String userName) {
		User user=userService.findByUserName(userName);
		JournalEntry saved=journalEntryRepository.save(journalEntry);
		user.getJournalEntries().add(saved);
		userService.saveEntry(user);
	}
	
	public List<JournalEntry> getAll(){
		return journalEntryRepository.findAll();
		
	} 
	
	public Optional<JournalEntry> getById(ObjectId id){
		return journalEntryRepository.findById(id);
	}
	
	public void deleteById(ObjectId id, String userName) {
		User user=userService.findByUserName(userName);
		user.getJournalEntries().removeIf(x -> x.getId().equals(id));
		userService.saveEntry(user);
		journalEntryRepository.deleteById(id);
	}

	public void saveEntry(JournalEntry journalEntry) {
		// TODO Auto-generated method stub
		journalEntryRepository.save(journalEntry);
		
	}
}
