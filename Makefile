
.PHONY: help

help: ## Helpful commands
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

build: ## Build the docker image in local
	@echo 'build docker image'
	docker build -t statuspage .

run: ## Spin up the project in local
	@echo 'run the project'
	docker run -d -p3000:3000 --name statuspage  statuspage

clean: ## Clear docker artifacts from local machine
	@echo 'clear project containers'
	docker stop statuspage && docker rm statuspage

dev: build run ## Build and deploy docker image in local machine
