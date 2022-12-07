package main

import (
	"api/endpoints"
	"api/services"
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	err := services.Connect()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	api := r.Group("/api")
	{
		api.GET("/posts", endpoints.GetPostsEndpoint)
		api.GET("/posts/:id", endpoints.GetPostEndpoint)
		api.GET("/comments", endpoints.GetCommentsEndpoint)
		api.GET("/posts/:id/comments", endpoints.GetCommentOfPostEndpoint)

		api.POST("/posts", endpoints.PostPostsEndpoint)
		api.POST("/posts/:id/comments", endpoints.PostCommentOfPostEndpoint)

		api.PUT("/posts/:id", endpoints.UpdatePostEndpoint)
	}

	r.Run(":4000")
}
