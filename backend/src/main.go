package main

import (
	"fmt"
	"GabrielNegreirosLima/telezap-imoveis/infra/env"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// TODO: FK
type Immobile struct {
	ID			int
	Price		uint
	QtdBedrooms	int
	HaveCloset	bool `gorm:"not null"`
	Area		float32 `gorm:"not null"`
	QtdCarspaces int
	QtdRooms	int
	QtdSuites	int
	Summary		string
	gorm.Model
}

// TODO: FK
type House struct {
	ID			int
	QtdBedroom	int
	QtdSuite	int
	QtdRoom		int
	QtdCarspaces int
	Area		float32 `gorm:"not null"`
	HaveCloset	bool `gorm:"not null"`
	Summary string
	gorm.Model
}

// TODO: FK
type Apartment struct {
	ID				int
	QtdDinerRooms	int
	Floor			int
	PriceCondominium float32
	HasDoorman		bool
	gorm.Model
}

// TODO: FK
type Address struct {
	ID		int
	Street	string `gorm:"not null"`
	Number	int `gorm:"not null"`
}

// TODO: FK
type Neighborhood struct {
	ID		int
	name	string `gorm:"not null"`
}

func main() {

	dsn := "host=127.0.0.1 user=postgres password=awesomepostgres dbname=postgres port=5432 sslmode=disable TimeZone=America/Sao_Paulo"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	fmt.Println(env.MustGetInt("dale"))

	// Migrate the schema
	db.AutoMigrate(&Immobile{})

	// Create
	db.Create(&Immobile{ID: 100})
	fmt.Println("Fim!")
}
