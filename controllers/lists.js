const database = require("../db");
const uniqid = require("uniqid");
const firebase = require("firebase");

function getUserLists(userId, listId){
    return firebase.database().ref('lists/').get()
}

// getUserLists()

function createUserList(name) {
   return firebase.database().ref('lists/' + uniqid()).set({
      userId: uniqid(),
      name: name
    });
  }

  createUserList("watch later")

function writeToUserList(listId, movieId){

}

function deleteFromUserList(listId, movieId){

}

function deleteUserList(listId){

}

module.exports = {
    getUserLists,
    createUserList
}