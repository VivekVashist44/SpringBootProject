package com.portfolio.journalApp.service;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.portfolio.journalApp.entity.User;
import com.portfolio.journalApp.repository.UserRepository;

@Component
public class UserService {
	
	@Autowired
	private UserRepository userRepository; 
	
	public void saveEntry(User user) {
		userRepository.save(user);
	}
	
	public List<User> getAll(){
		return userRepository.findAll();	
		
	} 
	
	public Optional<User> getById(ObjectId id){
		return userRepository.findById(id);
	}
	
	public void deleteUserName(String userName) {
		userRepository.deleteByUserName(userName);
	}
	
	public User findByUserName(String userName) {
		return userRepository.findByUserName(userName);
	}
}
