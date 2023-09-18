const database = require("../db")

function getUserLists(userId, listId){

}

function createUserList(listId, userId, name) {
   return firebase.database().ref('lists/' + listId).set({
      userId: userId,
      name: name
    });
  }

function writeToUserList(listId, movieId){

}

function deleteFromUserList(listId, movieId){

}

function deleteUserList(listId){

}