#Chatters

* Still not sure what all this will do. Please update this file.

##Features

###Implemented:
 - Create user
 - Create room
 - Join room
 - Track users in a room (Roster)

###To be implemented:
 - Save chat history
 - Display chat history upon joining room

##Paths: 
 - /
 - /:username
 - /:username/profile
 - /:username/profile/edit
 - /:username/:roomname
 - /login
 - /register

##Chat data format example

```
chat {
	name: 'chatname',
	owner: 'user1',
	messages: [{
			name: 'user1',
			message: 'Hello, world!',
			timestamp: date,
		},{
			name: 'world',
			message: 'Hello to you too!',
			timestamp: date,
		}],
	members: ['user1','user2','user3',user4','world'],
	private: true,
	mods: ['user1','user2'],
	bans: []
}
```