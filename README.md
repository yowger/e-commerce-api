## Running the Application

### Prerequisites
- Docker & Docker Compose installed  

### Start in Development Mode
```sh
docker compose up -d app-dev db dbmate
```

### Stopping the Services
```sh
docker compose down
```

### Viewing Logs
```sh
docker compose logs -f app-dev db dbmate
```

### Drop & Recreate the Database
```sh
docker compose run --rm dbmate drop
docker compose run --rm dbmate up
```

### Roll Back & Reapply Last Migration
```sh
docker compose run --rm dbmate down
docker compose run --rm dbmate up
```
