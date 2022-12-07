package services

import (
	"api/types"
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

var pool *pgxpool.Pool

func Connect() error {
	var err error
	pool, err = pgxpool.New(context.Background(), "postgresql://username:password@dab-p3-database/database?sslmode=disable")

	if err != nil {
		return err
	}

	return nil
}

func FindPosts() ([]types.Post, error) {
	rows, err := pool.Query(context.Background(), "SELECT * FROM posts")

	if err != nil {
		return []types.Post{}, err
	}
	posts := []types.Post{}
	for rows.Next() {
		var post types.Post
		err := rows.Scan(&post.Id, &post.Created_at, &post.Body, &post.Author, &post.Upvotes, &post.Downvotes)

		if err != nil {
			return []types.Post{}, err
		}
		posts = append(posts, post)
	}

	return posts, nil
}

func FindPostById(id int) (types.Post, error) {
	query := fmt.Sprintf("SELECT * FROM posts WHERE id=%d", id)
	var post types.Post
	err := pool.QueryRow(context.Background(), query).Scan(&post.Id, &post.Created_at, &post.Body, &post.Author, &post.Upvotes, &post.Downvotes)

	if err != nil {
		return types.Post{}, err
	}
	return post, nil
}

func SavePost(post types.JsonPost) (types.Post, error) {
	query := fmt.Sprintf("INSERT INTO posts(body, author) VALUES('%s', '%s') RETURNING (id, created_at, body, author, upvotes, downvotes)", post.Body, post.Author)

	var row types.Post

	err := pool.QueryRow(context.Background(), query).Scan(&row)
	if err != nil {
		return types.Post{}, err
	}
	return row, nil
}

func UpdatePost(id string, post types.JsonPost) (types.Post, error) {
	var row types.Post
	query := fmt.Sprintf("UPDATE posts SET body='%s', upvotes='%d', downvotes='%d' WHERE id=%s RETURNING (id, created_at, body, author, upvotes, downvotes)", post.Body, post.Upvotes, post.Downvotes, id)
	err := pool.QueryRow(context.Background(), query).Scan(&row)

	if err != nil {
		return types.Post{}, err
	}
	return row, nil
}
