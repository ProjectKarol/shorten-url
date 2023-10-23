
# shorten-url

Application to convert URL to shorten version

## Fist run

```bash
cp .env.example .env  
```

## Running the project the simple way

To simply run the project and start hacking away, just run

```bash
docker-compose up
```

This will build the project and start it together with an instance of Postgres Database.

Changing the files in the project will reload the server, too.

## Advanced

To start the project separately, you need to set up your .env file based on .env.example file.
You need a postgres and  running to be able to start the project.

Start database

### Explanation

```bash
start:dev
```

This script will run your TypeScript project without transpiling it to JavaScript. It's good for development purposes.

```bash
serve
```

 This script will transpile your TypeScript files into JavaScript files using the TypeScript compiler (tsc). The transpiled files will be saved in the dist directory as specified in your tsconfig.json.

```bash
build
```

This script will run your transpiled JavaScript files from the dist directory.

```bash
prod
```

This script will build your project for production by running the build script, and then serve the built project using the serve script.

### Migration

___

To generate a new migration you can simply call:

```bash
npm run migration:generate -- ./src/migration/<NAME_OF_NEW_MIGRATION>
```

This will create a new migration file in `./src/migration/` folder.
After that you can run `migration:run` script to update the database:

```bash
npm run migration:run
```

See more information in docs: [Typeorm.io/migrations](https://typeorm.io/migrations#migrations)
typeorm migration:run

## Testing

Tests cover the controllers, to run them use:

```bash
npm test
```

### To test endpoint run in console

Create Deep Link

```bash
curl --location 'http://localhost:8081/v1/convert/url-to-deeplink' \
--header 'Content-Type: application/json' \
--data '{
  "url" : "https://www.washmen.com/finery/blouse-p-1925865?cityId=994892-asda0-123-asdqw&clusterId=439892"
}'
```

Get Deep Link

```bash
curl --location 'http://localhost:8081/v1/convert/deeplink-to-url?deeplink=washmen%3A%2F%2F%3FPage%3DProduct%26ContentId%3D1925865'
```

### VS Code debugging

To run  debugger in VS Code go to "debugger" tab and run  debug app

## To Do

1. Add Dependency Injection
