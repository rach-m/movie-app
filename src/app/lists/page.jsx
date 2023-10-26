"use client";

import Header from "../Header";
import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { onValue, ref, query, equalTo, orderByChild } from "firebase/database";
import Link from "next/link";
function Lists() {
  const [userInfo, setUserInfo] = useState(null);
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

  return (
    <div>
      <Header setUserInfo={setUserInfo} userInfo={userInfo} />
      <h1>My Lists</h1>
      {JSON.stringify(lists) !== "{}" && lists
        ? Object.keys(lists).map((list, index) => {
            return (
              <Link
                key={index}
                href={{
                  pathname: `/lists/${list}`,
                  query: { uid: userInfo.uid },
                }}
              >
                <div>{lists[list].name}</div>
              </Link>
            );
          })
        : null}
    </div>
  );
}

export default Lists;
