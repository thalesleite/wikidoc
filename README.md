# wikidoc
This app is a SaaS to allow the indexation of documents and search on the content of the same.

# Github
Github repo: https://github.com/thalesleite/wikify 

# DataBase - MongoDB
This project is using MongoDB as database.
In order to run the dabase locally you must follow the next steps:

1. Install MongoDB
2. Install Docker and run the command:

docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=password mongo

3. Install MongoDB Compass to facilitate and then create a database named "wikidoc" and a collection named "documents"

URI String: mongodb://root:password@localhost:27017

# Docker - Starting the app
In order to run and start the project follow below:

After have cloned the project, inside the folder /wikify run the command(You must have installed Docker in your machine):

docker build . -t wikify

This will build the project and then run the command below to start the project:

docker run -it -p 3000:3000 wikify


# Kubernetes
Run the command to create the kubernetes:

kubectl apply -f deployment.yaml

The following command shows the kubernetes running:

kubectl get pods -A