package types

type JsonPost struct {
	Body      string `json:"body"`
	Author    string `json:"author"`
	Upvotes   int    `json:"upvotes,omitempty"`
	Downvotes int    `json:"downvotes,omitempty"`
}

type JsonComment struct {
	PostId int    `json:"postId"`
	Author string `json:"author"`
}
