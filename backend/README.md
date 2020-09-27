# README.md

The back-end of Telezap Imóveis is built in Go. The infrastructure (env vars and postgres connection) is in `./infra/` and the API is in `./src/`.

# Prepare infrastructure

---

- Pre-requisites:
    - Docker
    - Docker Compose

- Make sure to go back to telezap-imoveis root folder: `cd ..`
- Run the containers in background with: `docker-compose up -d`

# Running the API

---

Makefiles FTW!

- Inside `backend/` type: `make`

# Requests

---

## GET Routes

### /houses

Returns all the houses stored

```bash
curl -i -X GET localhost:8765/houses
```

### /houses/<id>

Return the specific house with the ID provided

```bash
curl -i -X GET localhost:8765/houses/1
```

### /apartments

Returns all the apartments stored

```bash
curl -i -X GET localhost:8765/apartments
```

### /apartments/<id>

Return the specific apartment with the ID provided

```bash
curl -i -X GET localhost:8765/apartments/1
```

## POST Routes

### /houses

Inserts an house

```bash
curl -i -X POST localhost:8765/houses -d '{    
  "Immobile": {
    "Price": 89898,
    "QtdBedrooms": 4,
    "HaveCloset": true,
    "Area": 91,
    "QtdCarspaces": 2,
    "QtdRooms": 1,
    "QtdSuites": 3,
    "Summary": "Dahora demais bixô suco de cevada mêu",
    "Address": {
      "Street": "Sao Paulo meu",
      "Number": 12,
      "Neighborhood": {
        "Name": "Mêu"
      }     
    }                       
  }              
}'
```

### /apartments

Inserts an apartment

- **ID ISN'T NECESSARY.** You can just remove it and the API will insert it sequentially, as in the example above.

```bash
curl -i -X POST localhost:8765/apartments -d '{
  "ID": 98,
  "Number": 401,
  "QtdDinerRooms": 1,
  "Floor": 4,
  "PriceCondominium": 500,
  "HasDoorman": true,
  "Immobile": {
    "Price": 89898,
    "QtdBedrooms": 4,
    "HaveCloset": true,
    "Area": 91,
    "QtdCarspaces": 2,
    "QtdRooms": 1,
    "QtdSuites": 3,
    "Summary": "Dahora demais bixô suco de cevada mêu",
    "Address": {
      "Street": "Sao Paulo meu",
      "Number": 12,
      "Neighborhood": {
        "Name": "Mêu"
      }
    }
  }
}'
```
