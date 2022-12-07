package types

type JsonPost struct {
	Body   string `json:"body"`
	Author string `json:"author"`
}

type JsonComment struct {
	PostId int    `json:"postId"`
	Author string `json:"author"`
}
