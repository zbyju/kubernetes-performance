import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function UserId() {
  const [userId, setUserId] = useState<string>("");
  const userText = userId === "" ? "Loading user" : userId;

  useEffect(() => {
    const id = window.localStorage.getItem("userToken");
    if (!id) {
      const id = uuidv4();
      setUserId(id);
      window.localStorage.setItem("userId", id);
    } else {
      setUserId(id);
    }
  });

  return (
    <>
      <p>User: {userText}</p>
    </>
  );
}
