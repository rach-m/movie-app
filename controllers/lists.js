const database = require("../db");
const uniqid = require("uniqid");
const firebase = require("firebase");


function createUserList(name, userId) {
  const listId = uniqid();
  firebase
    .database()
    .ref("lists/" + listId)
    .set({
      userId: userId,
      name: name,
      movies: [],
    });

  firebase
    .database()
    .ref("users/" + userId)
    .set({
      lists: [listId],
    });
}

// createUserList("watch later", "LEMFtseq29NQze8znU98E0RkoA93");



async function deleteFromUserList(listId, movieId) {
  // find list and movie on list
  const value = await firebase
    .database()
    .ref()
    .child("lists/")
    .child(listId)
    .get();

  // delete movie from list id
  const list = value.val();
  const index = list.movies.indexOf(movieId);
  delete list.movies[index];
}

async function deleteUserList(listId, userId) {
  const lists = await firebase
    .database()
    .ref()
    .child("lists/")
    .child(listId)
    .remove();

  const userLists = await firebase
    .database()
    .ref()
    .child("user/")
    .child(userId)
    .get();
  const values = userLists.val();
  let index = values.lists.indexOf(listId);
  delete values.lists[index];

  console.log("deleted");
}

module.exports = {
  getUserLists,
  createUserList,
  deleteFromUserList,
  deleteUserList,
  writeToUserList,
};
