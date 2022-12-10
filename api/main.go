package main

import (
	"api/endpoints"
	"api/services"
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	err := services.Connect()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type,access-control-allow-origin, access-control-allow-headers"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	{
		api.GET("/", endpoints.GenericEndpoint)

		api.GET("/posts", endpoints.GetPostsEndpoint)
		api.GET("/posts/:id", endpoints.GetPostEndpoint)
		api.GET("/comments", endpoints.GetCommentsEndpoint)
		api.GET("/posts/:id/comments", endpoints.GetCommentOfPostEndpoint)

		api.POST("/posts", endpoints.PostPostsEndpoint)
		api.POST("/posts/:id/comments", endpoints.PostCommentOfPostEndpoint)

		api.PUT("/posts/:id", endpoints.UpdatePostEndpoint)
		api.PUT("/posts/:id/upvote", endpoints.UpvotePostEndpoint)
		api.PUT("/posts/:id/downvote", endpoints.DownvotePostEndpoint)
	}

	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})

	r.Run(":4000")
}
