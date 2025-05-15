package database
import (
	"fmt"
	"log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectToDB(host,user, pass, dbname,port,sslmode string) *gorm.DB {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		host, user, pass, dbname, port, sslmode,
	)
	var err error
	var DB *gorm.DB
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if(err!=nil){
		log.Fatal("failed to connect to the database",err)
	}
	fmt.Println("Connected to postgres database using Gorm")
	return DB
}
