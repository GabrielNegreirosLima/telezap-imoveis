package main

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Immobile struct {
	gorm.Model
	ID int
	Price uint
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
	db.Create(&Immobile{ID: 100, Price: 123})
	fmt.Println("Fim!")
}
