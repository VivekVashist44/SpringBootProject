package com.portfolio.journalApp.controller;

import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.HashMap;
import java.util.List;
//import java.util.Map;
 
import com.portfolio.journalApp.entity.JournalEntry;
import com.portfolio.journalApp.service.JournalEntryService;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RequestMapping("/journal")
public class JournalEntryControllerV2 {
	
	@Autowired
	private JournalEntryService journalEntryService;
	
	@PostMapping
	public JournalEntry createEntry(@RequestBody JournalEntry myEntry) {
		myEntry.setDate(LocalDateTime.now());
		journalEntryService.saveEntry(myEntry);
		return myEntry;
	}
	
	@GetMapping
	public List<JournalEntry> getAll(){
		return journalEntryService.getAll();
	}
	
	@GetMapping("id/{myId}")
	public JournalEntry getJournalEntryById(@PathVariable ObjectId myId){
		return journalEntryService.getById(myId).orElse(null);
	}
	
	
	@DeleteMapping("id/{myId}")
	public boolean deleteEntrybyId(@PathVariable ObjectId myId){
		journalEntryService.deleteById(myId);
		return true;
	}
	
	@PutMapping("id/{id}")
	public JournalEntry updatejournalEntry(@PathVariable ObjectId id,@RequestBody JournalEntry newEntry) {
		JournalEntry old= journalEntryService.getById(id).orElse(null);
		if(old!=null) {
			old.setTitle(newEntry.getTitle() != null && !newEntry.getTitle().equals("")? newEntry.getTitle():old.getTitle());
			old.setContent(newEntry.getContent() != null && !newEntry.getContent().equals("")? newEntry.getContent():old.getContent());
		}
		journalEntryService.saveEntry(old);
		return old;
	}
	
}
