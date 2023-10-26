import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Popover, TextField } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { db } from "../services/firebase";
import {
  onValue,
  ref,
  set,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import uniqid from "uniqid";

function MovieCard({ movie, userInfo, page }) {
  const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [popEl, setPopEl] = useState(null);
  const openPop = Boolean(popEl);
  const id = openPop ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setPopEl(null);
  };

  const openPopover = (event) => {
    setPopEl(event.currentTarget);
  };
  const [lists, setLists] = useState({});

  useEffect(() => {
    if (userInfo) {
      const listQuery = ref(db, "lists/");
      return onValue(
        query(listQuery, orderByChild("userId"), equalTo(userInfo.uid)),
        (snapshot) => {
          const data = snapshot.val();
          if (snapshot.exists()) {
            setLists(data);
          }
        }
      );
    }
  }, [userInfo]);

  function addToList(event, list) {
    if (lists[list] && lists[list].movies) {
      lists[list].movies.push(movie);
    } else {
      lists[list].movies = [movie];
    }
    set(ref(db, "lists/" + list), lists[list]);
    handleClose();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const listId = uniqid();
    let newList = {
      userId: userInfo.uid,
      name: event.target[0].value,
      movies: [movie],
    };
    set(ref(db, "lists/" + listId), newList);
    const userRef = ref(db, "users/" + userInfo.uid);

    let prevState = lists;
    prevState.listId = newList;
    setLists(prevState);

    set(userRef, {
      userId: userInfo.uid,
      lists: lists,
    });

    setPopEl(false);
    setAnchorEl(false);
  }
  return (
    <Card sx={{ maxWidth: 275, padding: "15px", margin: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>{movie.original_title}</h3>
        {page === "main" ? (
          <div>
            <IconButton onClick={handleClick} aria-label="add to list">
              <AddIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {JSON.stringify(lists) !== "{}" && lists
                ? Object.keys(lists).map((list, index) => {
                    console.log(list);
                    return (
                      <MenuItem key={index} onClick={(e) => addToList(e, list)}>
                        {lists[list].name}
                      </MenuItem>
                    );
                  })
                : null}
              <MenuItem onClick={openPopover}>Add to New List</MenuItem>
              <Popover
                id={id}
                open={openPop}
                anchorEl={popEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    autoFocus={false}
                  />
                </form>
              </Popover>
            </Menu>
          </div>
        ) : null}
      </div>
      <h5>
        {movie.genre_ids.map((genre, index) => {
          return <div key={index}>{genres[genre]}</div>;
        })}
      </h5>
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average}/10</p>
    </Card>
  );
}

export default MovieCard;
