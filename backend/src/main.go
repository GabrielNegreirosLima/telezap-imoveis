package main

import (
	"GabrielNegreirosLima/telezap-imoveis/infra/env"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"fmt"
	"encoding/json"
	routing "github.com/jackwhelpton/fasthttp-routing/v2"
	"github.com/valyala/fasthttp"
	adapter "github.com/vingarcia/go-adapter"
)

type Immobile struct {
	gorm.Model
	ID	int
	Price	uint
	QtdBedrooms	int
	HaveCloset	bool `gorm:"not null"`
	Area	float32 `gorm:"not null"`
	QtdCarspaces int
	QtdRooms	int
	QtdSuites	int
	Summary	string
	AddressID	int
	Address	Address
}

type House struct {
	gorm.Model
	ID	int
	ImmobileID int
	Immobile Immobile
}

type Apartment struct {
	gorm.Model
	ID	int
	Number	int
	QtdDinerRooms	int
	Floor	int
	PriceCondominium	float32
	HasDoorman	bool
	ImmobileID int
	Immobile Immobile
}


type Neighborhood struct {
	gorm.Model
	ID	int
	Name	string `gorm:"not null"`
}

type Address struct {
	gorm.Model
	ID	int
	Street	string `gorm:"not null"`
	Number	int `gorm:"not null"`
	Neighborhood Neighborhood
	NeighborhoodID int
}

type Foo struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type MyType struct {
	Value string
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

	// Migrate the schema
	db.AutoMigrate(&House{})
	db.AutoMigrate(&Apartment{})
	db.AutoMigrate(&Immobile{})
	db.AutoMigrate(&Neighborhood{})
	db.AutoMigrate(&Address{})

	var firHouse House
    firHouse = House{
		ID: 0,
		Immobile:	Immobile {
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

	// Create
	db.Create(&firHouse)


	router := routing.New()

	router.Post("/adapted/<id>", adapter.Adapt(func(ctx *routing.Context, args struct {
		ID       uint64 `path:"id"`
		Brand    string `header:"brand,optional"`
		Qparam   string `query:"qparam,required"`
		//MyType   MyType `uservalue:"my_type"`
		JSONBody Foo
	}) error {
		jsonResp, _ := json.Marshal(map[string]interface{}{
			"ID":        args.ID,
			"Brand":     args.Brand,
			"Query":     args.Qparam,
			"Body":      args.JSONBody,
		//	"UserValue": args.MyType,
		})
		fmt.Println(string(jsonResp))
		ctx.SetBody(jsonResp)

		return nil
	}))

	port := "8765"
	// Serve Start
	fmt.Println("listening-and-serve", "server listening at:", port)
	if err := fasthttp.ListenAndServe(":"+port, router.HandleRequest); err != nil {
		fmt.Println("error-serving", err.Error())
	}
}
