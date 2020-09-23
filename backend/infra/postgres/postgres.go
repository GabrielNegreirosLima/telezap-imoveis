package postgres

import(
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"GabrielNegreirosLima/telezap-imoveis/infra/env"
)

func InitializeConnection() (*gorm.DB, error){

	dsn := "host=" + env.MustGetString("host") +
		" user=" + env.MustGetString("user") +
		" password=" + env.MustGetString("password") +
		" dbname=" + env.MustGetString("dbname") +
		" port=" + env.MustGetString("port") +
		" sslmode=" + env.MustGetString("sslmode") +
		" TimeZone=" + env.MustGetString("TimeZone")

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return db, err
}
