import http from "k6/http";

export function setup() {}

export default function () {
  http.get("http://localhost:4000/api/posts");
}

export function teardown() {}
