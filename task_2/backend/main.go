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
)

func mustGetEnv(key string) string {
	val := os.Getenv(key)
	if val == "" {
		log.Fatalf("Missing required environment variable %s", key)
	}
	return val
}


func main(){
	// DB_User_Name:=os.Getenv("USER_NAME")
	// DB_User_Password:=os.Getenv("USER_PASSWORD")
	// DB_Name:=os.Getenv("DB_NAME")
	// ssl_Mode:=os.Getenv("SSL_MODE")
	// // frontendURL:=os.Getenv("FRONTEND_URL")
	authSecretKey:=mustGetEnv("AUTH_SECRET_KEY")
	listeningPort:=mustGetEnv("PORT")
	host:=mustGetEnv("DB_HOST")
	user:=mustGetEnv("DB_USER")
	pass:=mustGetEnv("DB_PASSWORD")
	dbname:=mustGetEnv("DB_NAME")
	port:=mustGetEnv("DB_PORT")
	sslmode:=mustGetEnv("DB_SSLMODE")
	frontendURL:=mustGetEnv("FRONTEND_URL")
	frontendURL1:=mustGetEnv("FRONTEND_URL_1")
	frontendURL2:=mustGetEnv("FRONTEND_URL_1")

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