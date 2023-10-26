'use client';
import { useState } from "react";
import Login from "./login";
export default function Home() {
    const [userInfo, setUserInfo] = useState(null);
    return (<main><Login /></main>);
}
