package endpoints

import (
	"api/services"
	"api/types"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
)

func GenericEndpoint(c *gin.Context) {
	c.String(http.StatusOK, "Ok")
}

func GetPostsEndpoint(c *gin.Context) {
	rows, err := services.FindPosts()

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, rows)
	}
}

func GetPostEndpoint(c *gin.Context) {
	post, err := services.FindPostById(c.Param("id"))

	if err != nil {
		fmt.Println(err)
		if err == pgx.ErrNoRows {
			c.String(http.StatusNotFound, "Not found")
		} else {
			c.JSON(http.StatusInternalServerError, err)
		}
	} else {
		c.JSON(http.StatusOK, post)
	}
}

func PostPostsEndpoint(c *gin.Context) {
	var post types.JsonPost

	if err := c.BindJSON(&post); err != nil {
		c.String(http.StatusBadRequest, "Bad JSON")
		return
	}

	newPost, err := services.SavePost(post)

	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, newPost)
	}
}

func UpdatePostEndpoint(c *gin.Context) {
	var post types.JsonPost

	if err := c.BindJSON(&post); err != nil {
		c.String(http.StatusBadRequest, "Bad JSON")
	}

	newPost, err := services.UpdatePost(c.Param("id"), post)

	if err != nil {
		if err == pgx.ErrNoRows {
			c.String(http.StatusNotFound, "Not found")
		} else {
			c.JSON(http.StatusInternalServerError, err)
		}
	} else {
		c.JSON(http.StatusOK, newPost)
	}
}

func UpvotePostEndpoint(c *gin.Context) {
	err := services.UpvotePost(c.Param("id"))

	if err != nil {
		if err == pgx.ErrNoRows {
			c.String(http.StatusNotFound, "Not found")
		} else {
			c.JSON(http.StatusInternalServerError, err)
		}
	} else {
		c.String(http.StatusOK, "Ok")
	}
}

func DownvotePostEndpoint(c *gin.Context) {
	err := services.DownvotePost(c.Param("id"))

	if err != nil {
		if err == pgx.ErrNoRows {
			c.String(http.StatusNotFound, "Not found")
		} else {
			c.JSON(http.StatusInternalServerError, err)
		}
	} else {
		c.String(http.StatusOK, "Ok")
	}
}
