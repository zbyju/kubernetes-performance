package endpoints

import (
	"api/services"
	"api/types"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetCommentsEndpoint(c *gin.Context) {
	rows, err := services.FindComments()

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, rows)
	}
}

func GetCommentOfPostEndpoint(c *gin.Context) {
	rows, err := services.FindCommentsByPostId(c.Param("id"))

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, rows)
	}
}

func PostCommentOfPostEndpoint(c *gin.Context) {
	var comment types.JsonComment

	if err := c.BindJSON(&comment); err != nil {
		c.String(http.StatusBadRequest, "Bad JSON")
	}

	newComment, err := services.SaveComment(c.Param("id"), comment)

	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, newComment)
	}
}
