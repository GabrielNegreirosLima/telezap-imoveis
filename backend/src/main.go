package main

import (
	pgClient "GabrielNegreirosLima/telezap-imoveis/infra/postgres"
	"gorm.io/gorm"

	"fmt"
	"encoding/json"
	"errors"
	"github.com/rs/cors"
	"github.com/jackwhelpton/fasthttp-routing/v2/slash"
	"github.com/valyala/fasthttp/fasthttpadaptor"
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

func main() {

	db, err := pgClient.InitializeConnection()
	if err != nil {
		panic(err)
	}

	// Migrate the schema
	db.AutoMigrate(&House{})
	db.AutoMigrate(&Apartment{})
	db.AutoMigrate(&Immobile{})
	db.AutoMigrate(&Neighborhood{})
	db.AutoMigrate(&Address{})

	var houses []House
	var house House
	var apartments []Apartment
	var neighborhoods []Neighborhood

    house = House{
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


	// Create:
	db.Create(&house)

	// Routes
	c := cors.New(cors.Options{
	AllowedOrigins: []string{"http://localhost", "http://localhost:3000"},
	AllowedHeaders: []string{"*"},
	AllowedMethods: []string{
		http.MethodGet,
		http.MethodPost,
	},
	AllowCredentials: true,
	})

	router := routing.New()
	router.Use(
		routing.RequestHandlerFunc(fasthttpadaptor.NewFastHTTPHandlerFunc(c.HandlerFunc)),
		slash.Remover(fasthttp.StatusMovedPermanently),
	)

	router := routing.New()

	// Return all houses
	router.Get("/houses", adapter.Adapt(func(ctx *routing.Context, args struct{}) error {
		db.Find(&houses)
		jsonResp, err := json.Marshal(houses)
		if err != nil {
			fmt.Println("Error at Marshal: ", err)
			return err
		}

		fmt.Println(string(jsonResp))
		ctx.SetBody(jsonResp)
		return nil
	}))


	// Return a specific house
	router.Get("/houses/<id>", adapter.Adapt(func(ctx *routing.Context, args struct {
		ID	int `path:"id"`
	}) error {

		if(args.ID < 1){
			return errors.New("This isn't a valid ID!")
		}

		db.Find(&houses)

		jsonResp, err := json.Marshal(houses[args.ID-1])
		if err != nil {
			fmt.Println("Error at Marshal: ", err)
			return err
		}

		fmt.Println(string(jsonResp))
		ctx.SetBody(jsonResp)
		return nil
	}))


	// Return all apartments
	router.Get("/apartments", adapter.Adapt(func(ctx *routing.Context, args struct {}) error {

		db.Find(&apartments)
		jsonResp, err := json.Marshal(apartments)
		if err != nil {
			fmt.Println("Error at Marshal: ", err)
			return err
		}

		fmt.Println(string(jsonResp))
		ctx.SetBody(jsonResp)
		return nil
	}))


	// Return a specific apartament
	router.Get("/apartments/<id>", adapter.Adapt(func(ctx *routing.Context, args struct {
		ID	int `path:"id"`
	}) error {

		if(args.ID < 1){
			return errors.New("This isn't a valid ID!")
		}

		db.Find(&apartments)

		jsonResp, err := json.Marshal(apartments[args.ID-1])
		if err != nil {
			fmt.Println("Error at Marshal: ", err)
			return err
		}

		fmt.Println(string(jsonResp))
		ctx.SetBody(jsonResp)
		return nil
	}))

	// Return all neighborhoods
	router.Get("/neighborhoods", adapter.Adapt(func(ctx *routing.Context, args struct {}) error {

		db.Find(&neighborhoods)
		jsonResp, err := json.Marshal(neighborhoods)
		if err != nil {
			fmt.Println("Error at Marshal: ", err)
			return err
		}

		fmt.Println(string(jsonResp))
		ctx.SetBody(jsonResp)
		return nil
	}))

	// POST ROUTES
	router.Post("/houses", adapter.Adapt(func(ctx *routing.Context, args struct {
		Body   House    `content-type:"application/json"`
	}) error {

		result := db.Create(&args.Body)
		if result.Error != nil {
			return errors.New("Could not insert. Check your data structure.")
		}

		fmt.Println("House inserted - ID: ", house.ID)

		return nil
	}))

	router.Post("/apartments", adapter.Adapt(func(ctx *routing.Context, args struct {
		Body   Apartment    `content-type:"application/json"`
	}) error {

		result := db.Create(&args.Body)
		if result.Error != nil {
			return errors.New("Could not insert. Check your data structure.")
		}

		fmt.Println("Apartment inserted - ID: ", house.ID)

		return nil
	}))

	port := "8765"
	// Serve Start
	fmt.Println("listening-and-serve", "server listening at:", port)
	if err := fasthttp.ListenAndServe(":"+port, router.HandleRequest); err != nil {
		fmt.Println("error-serving", err.Error())
	}
}
