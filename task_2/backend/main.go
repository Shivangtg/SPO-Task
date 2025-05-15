package main

import (
	controllers "placement_insigths/Controllers"
	database "placement_insigths/Database"
	models "placement_insigths/Models"
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main(){
	err:=godotenv.Load()
	if err!=nil{
		log.Fatal("Error loading .env file")
	}
	// DB_User_Name:=os.Getenv("USER_NAME")
	// DB_User_Password:=os.Getenv("USER_PASSWORD")
	// DB_Name:=os.Getenv("DB_NAME")
	// ssl_Mode:=os.Getenv("SSL_MODE")
	// // frontendURL:=os.Getenv("FRONTEND_URL")
	authSecretKey:=os.Getenv("AUTH_SECRET_KEY")
	listeningPort:=os.Getenv("PORT")
	host:=os.Getenv("DB_HOST")
	user:=os.Getenv("DB_USER")
	pass:=os.Getenv("DB_PASSWORD")
	dbname:=os.Getenv("DB_NAME")
	port:=os.Getenv("DB_PORT")
	sslmode:=os.Getenv("DB_SSLMODE")
	frontendURL:=os.Getenv("FRONTEND_URL")
	frontendURL1:=os.Getenv("FRONTEND_URL_1")
	frontendURL2:=os.Getenv("FRONTEND_URL_1")

	r := gin.Default()

	// CORS middleware configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{frontendURL,frontendURL1,frontendURL2}, // Frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length","Set-Cookie"},
		AllowCredentials: true, // Allow cookies & authentication headers
		MaxAge:           12 * time.Hour,
	}))

	db:=database.ConnectToDB(host,user,pass,dbname,port,sslmode)

	db.AutoMigrate(&models.User{},&models.InsightPlacement{},&models.InsightIntern{})

	r.POST("/login",controllers.Login(db,authSecretKey))
	r.POST("/signup",controllers.Signup(db,authSecretKey))
	r.POST("/uploadInsightIntern",controllers.WriteToDBForIntern(db,authSecretKey))
	r.POST("/uploadInsightPlacements",controllers.WriteToDBForPlacement(db,authSecretKey))
	r.POST("/getInsightsPlacements",controllers.SendingDataPlacement(db,authSecretKey))
	r.POST("/getInsightsIntern",controllers.SendingDataIntern(db,authSecretKey))
	r.Run(":"+listeningPort)
}