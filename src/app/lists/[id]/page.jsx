"use client";

import { useEffect, useState } from "react";
import { db } from "../../../services/firebase";
import { onValue, ref, query, equalTo, orderByChild } from "firebase/database";
import MovieCard from "../../MovieCard";
import Header from "../../Header";
import { useSearchParams } from "next/navigation";

function Page({ params }) {
  const [movies, setMovies] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");

  useEffect(() => {
    if (uid) {
      const listQuery = ref(db, "lists/");
      return onValue(
        query(listQuery, orderByChild("userId"), equalTo(uid)),
        (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          if (snapshot.exists()) {
            setMovies(data[params.id].movies);
          }
        }
      );
    }
  }, [userInfo]);

  useEffect(() => {
    const query = ref(db, "users/" + uid);
    onValue(
      query,
      (snapshot) => {
        if (snapshot.exists()) {
          setUserInfo(snapshot.val());
        } else {
          set(ref(db, "users/" + user.uid), {
            userId: user.uid,
          });
        }
      },
      {
        onlyOnce: true,
      }
    );
  }, []);

  return (
    <div>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      {movies
        ? movies.map((movie, index) => {
            return <MovieCard page={"list"} key={index} movie={movie} />;
          })
        : null}
    </div>
  );
}

export default Page;
