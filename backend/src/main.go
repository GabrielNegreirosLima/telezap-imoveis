package main

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Immobile struct {
	ID 			int
	Price 		uint
	QtdBedrooms	int
	gorm.Model
}

func main() {

	dsn := "host=127.0.0.1 user=postgres password=awesomepostgres dbname=postgres port=5432 sslmode=disable TimeZone=America/Sao_Paulo"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	// Migrate the schema
	db.AutoMigrate(&Immobile{})

	// Create
	db.Create(&Immobile{ID: 100})
	fmt.Println("Fim!")
}
