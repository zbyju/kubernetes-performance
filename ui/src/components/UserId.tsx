import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { generateUserId } from "../services/user";

export default function UserId() {
  const [userId, setUserId] = useState<string>("");
  const userText = userId === "" ? "Loading user" : userId;

  useEffect(() => {
    const id = window.localStorage.getItem("userId");
    if (!id) {
      const id = generateUserId();
      setUserId(id);
      window.localStorage.setItem("userId", id);
    } else {
      setUserId(id);
    }
  }, []);

  return (
    <>
      <p>User: {userText}</p>
    </>
  );
}
