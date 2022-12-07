package endpoints

import (
	"api/services"
	"api/types"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetCommentsEndpoint(c *gin.Context) {

}

func GetCommentOfPostEndpoint(c *gin.Context) {

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
