import http from "k6/http";

export function setup() {}

export default function () {
  http.get("http://localhost/");
}

export function teardown() {}
