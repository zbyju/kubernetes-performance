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

func FindPosts() ([]any, error) {
	pgxRows, err := pool.Query(context.Background(), "SELECT * FROM posts")

	if err != nil {
		return []any{}, err
	}

	rows, err := pgxRows.Values()

	if err != nil {
		return []any{}, err
	}

	return rows, nil
}

func FindPostById(id int) (any, error) {
	var post any
	err := pool.QueryRow(context.Background(), "SELECT * FROM posts WHERE id='"+fmt.Sprint(id)+"'").Scan(&post)

	if err != nil {
		return []any{}, err
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
