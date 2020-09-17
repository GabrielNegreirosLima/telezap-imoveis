include .env
export $(shell sed 's/=.*//' .env)

make:
	@ go run ./src/main.go

deps:
	@ echo
	@ echo "Start downloading dependencies..."
	@ echo 
	@ go get -u ./...

%:
	@:
