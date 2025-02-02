package com.portfolio.journalApp.controller;

import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.HashMap;
import java.util.List;
//import java.util.Map;
import java.util.Optional;

import com.portfolio.journalApp.entity.JournalEntry;
import com.portfolio.journalApp.entity.User;
import com.portfolio.journalApp.service.JournalEntryService;
import com.portfolio.journalApp.service.UserService;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	
	@Autowired 
	private UserService userService; 
	
	@PostMapping("{userName}")
	public ResponseEntity<JournalEntry> createEntry(@RequestBody JournalEntry myEntry,@PathVariable String userName) {
		try {
			myEntry.setDate(LocalDateTime.now());
			journalEntryService.saveEntry(myEntry,userName);
			return new ResponseEntity<>(myEntry,HttpStatus.CREATED);
		}
		catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@GetMapping("{userName}")
	public ResponseEntity<?> getAllJournalEntriesOfUser(@PathVariable String userName){
		User user =userService.findByUserName(userName);
		List<JournalEntry> all = user.getJournalEntries();
		if(all!=null && !all.isEmpty()) {
			return new ResponseEntity<>(all,HttpStatus.OK);
		}
		return new ResponseEntity<>(all,HttpStatus.NOT_FOUND );
	}
	
	@GetMapping("id/{myId}")
	public  ResponseEntity<JournalEntry> getJournalEntryById(@PathVariable ObjectId myId){
		Optional<JournalEntry> journalEntry=  journalEntryService.getById(myId);
		if(journalEntry.isPresent()) {
			return new ResponseEntity<>(journalEntry.get(),HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	
	@DeleteMapping("id/{userName}/{myId}")
	public ResponseEntity<?> deleteEntrybyId(@PathVariable ObjectId myId,@PathVariable String userName){
		journalEntryService.deleteById(myId,userName);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@PutMapping("id/{userName}/{id}")
	public ResponseEntity<?> updatejournalEntry(@PathVariable ObjectId id,@RequestBody JournalEntry newEntry,@PathVariable String userName) {
		JournalEntry old= journalEntryService.getById(id).orElse(null);
		if(old!=null) {
			old.setTitle(newEntry.getTitle() != null && !newEntry.getTitle().equals("")? newEntry.getTitle():old.getTitle());
			old.setContent(newEntry.getContent() != null && !newEntry.getContent().equals("")? newEntry.getContent():old.getContent());
			journalEntryService.saveEntry(old);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		
	}
	
}
