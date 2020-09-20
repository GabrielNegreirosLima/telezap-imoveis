package main

import (
	"GabrielNegreirosLima/telezap-imoveis/infra/env"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Immobile struct {
	gorm.Model
	Price		uint
	QtdBedrooms	int
	HaveCloset	bool `gorm:"not null"`
	Area		float32 `gorm:"not null"`
	QtdCarspaces int
	QtdRooms	int
	QtdSuites	int
	Summary		string
	Address
}

type House struct {
	gorm.Model
	Immobile Immobile	`gorm:"not null"`
}

type Apartment struct {
	gorm.Model
	Immobile Immobile `gorm:"not null"`
	Number	int
	QtdDinerRooms	int
	Floor	int
	PriceCondominium	float32
	HasDoorman	bool
}


type Neighborhood struct {
	gorm.Model
	Name	string `gorm:"not null"`
}

type Address struct {
	gorm.Model
	Street	string `gorm:"not null"`
	Number	int `gorm:"not null"`
	Neighborhood Neighborhood
}



func main() {

	dsn := "host=" + env.MustGetString("host") +
		" user=" + env.MustGetString("user") +
		" password=" + env.MustGetString("password") +
		" dbname=" + env.MustGetString("dbname") +
		" port=" + env.MustGetString("port") +
		" sslmode=" + env.MustGetString("sslmode") +
		" TimeZone=" + env.MustGetString("TimeZone")

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	firHouse := House{
		Immobile: Immobile {
			Price: 1100,
			QtdBedrooms: 2,
			HaveCloset: true,
			Area: 82.2,
			QtdCarspaces: 1,
			QtdRooms: 1,
			QtdSuites: 0,
			Summary: "Pets allowed",
			Address: Address {
				Street: "Rua Zurike",
				Number: 123,
				Neighborhood: Neighborhood{
					Name: "Nova Suissa",
				},
			},
		},
	}

	// Migrate the schema
	db.AutoMigrate(&House{})
	db.AutoMigrate(&Apartment{})
	db.AutoMigrate(&Immobile{})
	db.AutoMigrate(&Neighborhood{})
	db.AutoMigrate(&Address{})

	// Create
	db.Create(&firHouse)
}
