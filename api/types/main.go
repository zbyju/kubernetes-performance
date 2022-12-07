package types

import "time"

type Post struct {
	Id         int
	Created_at time.Time
	Body       string
	Author     string
	Upvotes    string
	Downvotes  string
}

type Comment struct {
	Id         int
	Post_id    int
	Created_at time.Time
	Author     string
}
