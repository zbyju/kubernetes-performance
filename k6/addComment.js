import http from "k6/http";

export function setup() {
  const payload = JSON.stringify({
    author: generateRandomString(5, 20),
    body: generateRandomString(10, 50),
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  http.post("http://localhost:4000/api/posts", payload, params);
}

function randomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomString(minLen, maxLen) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const length = Math.floor(Math.random() * (maxLen - minLen)) + minLen;
  let string = "";
  for (let i = 0; i < length; ++i) {
    string += randomValue(chars);
  }
  return string;
}

export default function () {
  const payload = JSON.stringify({
    author: generateRandomString(5, 20),
    body: generateRandomString(10, 50),
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  http.post("http://localhost:4000/api/posts/1/comments", payload, params);
}

export function teardown() {}
