package controllers

import (
	"fmt"
	"io"
	"net/http"
	models "placement_insigths/Models"
	utility "placement_insigths/Utility"
	"time"

	// utility "placement_insigths/Utility"
	"strings"
	// "time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

//commented part can be used when implementing login sign up

func WriteToDBForPlacement(db *gorm.DB, authSecretKey string) func(c *gin.Context) {
	return (func (c *gin.Context) {
		
		var req models.InsightPlacement
		var err error

						toDecode,err:=c.Request.Cookie("authToken")
						if(err!=nil){
							fmt.Println("error getting the authToken",err.Error());
							c.JSON(http.StatusBadRequest,gin.H{"message":"error getting the authToken","error":err.Error()})
							return
						}

						decoded,er:=utility.DecodingToken(string(toDecode.Value),authSecretKey)
						if er!=nil{
							fmt.Println(er)
							return 
						}
						fmt.Println(decoded,decoded["username"])
						
						username, ok := decoded["username"].(string)
						if !ok {
							fmt.Println("username is not a string")
							c.JSON(http.StatusBadRequest, gin.H{"error": "invalid token structure"})
							return
						}
						var user models.User
					
						db.Where("username=?",username).First(&user)
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		        //getting body for the 
		        // resolutiuon of issue
		        if err=c.BindJSON(&req);err!=nil{
		        	fmt.Println("can't get the body of request")
		        	c.JSON(http.StatusInternalServerError,gin.H{"message":"can't get the body of request",
		        	"error":"can't get the body of request"})
		        }
				var user_exists models.User
				var user_found models.InsightPlacement
				if db.Where("username=?",req.Username).First(&user_found).RowsAffected>0{
					c.JSON(http.StatusConflict,gin.H{"error":"You have already given your insights for placement"})
					return 
				}
				if db.Where("username=?",req.Username).First(&user_exists).RowsAffected<1{
					c.JSON(http.StatusBadRequest,gin.H{"error":"No such user is registered to our database first register to our database"})
					return 
				}
									if(req.Username!=decoded["username"]){
										
										authTokenString,err:=utility.GenerateAuthToken(user.Useremail,username,authSecretKey,time.Now().Add(time.Hour*24))
										if err!=nil{
											fmt.Println("error in generating auth token")
											c.JSON(http.StatusBadRequest,gin.H{"message":"error in generating auth token","error":err})
											return
										}
										c.SetCookie("authToken",authTokenString,24*3600,"/","localhost",false,false)
									}
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		db.Create(&req)
		c.JSON(http.StatusCreated,gin.H{"message":"Your placement insights are successfully uploaded"})
	})
}

func WriteToDBForIntern(db *gorm.DB, authSecretKey string) func(c *gin.Context) {
	return (func (c *gin.Context) {
		
		var req models.InsightIntern
		var err error

						toDecode,err:=c.Request.Cookie("authToken")
						if(err!=nil){
							fmt.Println("error getting the authToken",err.Error());
							c.JSON(http.StatusBadRequest,gin.H{"message":"error getting the authToken","error":err.Error()})
							return
						}

						decoded,er:=utility.DecodingToken(string(toDecode.Value),authSecretKey)
						if er!=nil{
							fmt.Println(er)
							return 
						}
						fmt.Println(decoded,decoded["username"])
						
						username, ok := decoded["username"].(string)
						if !ok {
							fmt.Println("username is not a string")
							c.JSON(http.StatusBadRequest, gin.H{"error": "invalid token structure"})
							return
						}
						var user models.User
					
						db.Where("username=?",username).First(&user)
		
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		        //getting body for the 
		        // resolutiuon of issue
		        if err=c.BindJSON(&req);err!=nil{
		        	fmt.Println("can't get the body of request")
		        	c.JSON(http.StatusInternalServerError,gin.H{"message":"can't get the body of request",
		        	"error":"can't get the body of request"})
		        }
				var user_found models.InsightIntern
				var user_exists models.User
				if db.Where("username=?",req.Username).First(&user_found).RowsAffected>0{
					c.JSON(http.StatusConflict,gin.H{"error":"You have already given your insights for intern"})
					return 
				}
				if db.Where("username=?",req.Username).First(&user_exists).RowsAffected<1{
					c.JSON(http.StatusBadRequest,gin.H{"error":"No such user is registered to our database first register to our database"})
					return 
				}
									if(req.Username!=decoded["username"]){
										
										authTokenString,err:=utility.GenerateAuthToken(user.Useremail,username,authSecretKey,time.Now().Add(time.Hour*24))
										if err!=nil{
											fmt.Println("error in generating auth token")
											c.JSON(http.StatusBadRequest,gin.H{"message":"error in generating auth token","error":err})
											return
										}
										c.SetCookie("authToken",authTokenString,24*3600,"/","localhost",false,false)
									}
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		db.Create(&req)
		c.JSON(http.StatusCreated,gin.H{"message":"Your intern insights are successfully uploaded"})

	})
}

func SendingDataPlacement(db *gorm.DB, authSecretKey string) func(c *gin.Context) {
	return (func (c *gin.Context) {
			body, err := io.ReadAll(c.Request.Body) // Read the raw body
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to read body", "error": err.Error()})
				return
			}
			
			var insights []models.InsightPlacement
			var final_output []models.InsightPlacement
			db.Find(&insights)
			
			var stringStore []string
			

			if string(body)!=""{
			for _,row:= range insights{
				advices:=""
				insights_:=""
				interviewQuestions:="" 
				resources:=""   
				selectionProcesses:="" 
				shortlistedfor:="" 
				for _,advice:= range row.Advice{
					advices+=strings.ToLower(advice)+" "
				}
				for _,insight:= range row.Insight{
					insights_+=strings.ToLower(insight)+" "
				}
				for _,interviewQuestion:= range row.InterviewQuestion{
					interviewQuestions+=strings.ToLower(interviewQuestion)+" "
				}
				for _,resource:= range row.Resources{
					resources+=strings.ToLower(resource)+" "
				}
				for _,selectionProcess:= range row.SelectionProcess{
					selectionProcesses+=strings.ToLower(selectionProcess)+" "
				}
				for _,company:= range row.Shortlisted{
					shortlistedfor+=strings.ToLower(company)+" "
				}
				stringStore = append(stringStore, advices+ " "+insights_+" "+interviewQuestions+" "+resources+" "+selectionProcesses+" "+shortlistedfor+" "+strings.ToLower(row.Username)+" ")

			}
			var index int ;
			var indexes []int ;
			var row string ;
			for index,row= range stringStore{
				if strings.Contains(row,strings.ToLower(string(body))) {
					indexes = append(indexes, index)
				}
			}
			
			for _,data:= range indexes{
				final_output=append(final_output, insights[data])
			}

			c.JSON(http.StatusOK,gin.H{"final":final_output})
			}else{
				fmt.Println("hola",insights)
				c.JSON(http.StatusOK,gin.H{"final":insights})
			}
		})
}


func SendingDataIntern(db *gorm.DB, authSecretKey string) func(c *gin.Context) {
	return (func (c *gin.Context) {
			body, err := io.ReadAll(c.Request.Body) // Read the raw body
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"message": "Failed to read body", "error": err.Error()})
				return
			}
			
			var insights []models.InsightIntern
			var final_output []models.InsightIntern
			db.Find(&insights)
			
			var stringStore []string
			

			if string(body)!=""{
			for _,row:= range insights{
				advices:=""
				resources:=""   
				selectionProcesses:="" 
				shortlistedfor:="" 
				for _,advice:= range row.Advice{
					advices+=strings.ToLower(advice)+" "
				}
				for _,resource:= range row.Resources{
					resources+=strings.ToLower(resource)+" "
				}
				for _,selectionProcess:= range row.SelectionProcess{
					selectionProcesses+=strings.ToLower(selectionProcess)+" "
				}
				for _,company:= range row.Shortlisted{
					shortlistedfor+=strings.ToLower(company)+" "
				}
				stringStore = append(stringStore, advices+" "+resources+" "+selectionProcesses+" "+shortlistedfor+" "+strings.ToLower(row.Username)+" ")

			}
			var index int ;
			var indexes []int ;
			var row string ;
			for index,row= range stringStore{
				if strings.Contains(row,strings.ToLower(string(body))) {
					indexes = append(indexes, index)
				}
			}
			
			for _,data:= range indexes{
				final_output=append(final_output, insights[data])
			}

			c.JSON(http.StatusOK,gin.H{"final":final_output})
			}else{
				fmt.Println("hola",insights)
				c.JSON(http.StatusOK,gin.H{"final":insights})
			}
		})
}


