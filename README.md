# Control_Remote_Computer_Backend

You can run this with docker compose file and then run it after setting up your env file.
```js
version: '2'

services:
  postgresql:
    image: bitnami/postgresql:latest
    ports:
      - '${DB_PORT}:5432'
    volumes:
      - 'postgresql_data:/bitnami/postgresql'
    environment:
      - POSTGRESQL_USERNAME=${DB_USER}
      - POSTGRESQL_PASSWORD=${DB_PASS}
      - POSTGRESQL_DATABASE=${DB_NAME}

volumes:
  postgresql_data:
    driver: local


```

## Run Command
```js
npm run start

```
