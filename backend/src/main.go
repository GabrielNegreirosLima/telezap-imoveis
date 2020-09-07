package main

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Immobile struct {
	gorm.Model
	Id int
}

func main() {

	dsn := "user= passwoord= dbname=test port=5432 sslmode=disable TimeZone=America/Sao_Paulo"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	// Migrate the schema
	db.AutoMigrate(&Product{})

	// Create
	db.Create(&Product{Code: "D42", Price: 100})

}
