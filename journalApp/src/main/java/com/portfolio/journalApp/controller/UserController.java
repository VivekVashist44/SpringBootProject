package com.portfolio.journalApp.controller;

//import java.util.ArrayList;
//import java.util.HashMap;
import java.util.List;
//import java.util.Map;

import com.portfolio.journalApp.entity.User;
import com.portfolio.journalApp.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*; 

@SpringBootApplication
@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping
	private List<User> getAllUsers(){
		return userService.getAll();
	}
	
	@PostMapping
	public void createUser(@RequestBody User user ) {
		userService.saveEntry(user);
	}
	
	@PutMapping("{userName}")
	public ResponseEntity<?> updateUser(@RequestBody User user, @PathVariable String userName){
		User userInDb=userService.findByUserName(userName);
		if(userInDb!=null) {
			userInDb.setUserName(user.getUserName());
			userInDb.setPassword(user.getPassword());
			userService.saveEntry(userInDb);
		}
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	@DeleteMapping("uname/{uname}")
	public ResponseEntity<?> deleteUser(@PathVariable String uname) {

	    User userInDb = userService.findByUserName(uname);
	    if (userInDb == null) {
	        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
	    }
	    userService.deleteUserName(uname);
	    return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
	}

}
