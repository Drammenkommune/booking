# dk-booking

Bookingløsning for Drammen Kommune

## Development

First time? Use `docker-compose build --pull` to pull images from docker registry and save some initial build time.

Launch services using

    docker-compose up

## Services

| Name                      | Type                 | Description              | Default development port mapping               |
|---------------------------|----------------------|--------------------------|------------------------------------------------|
| [public](public/)         | React                | Public booking app       | http://localhost                               |
| [admin](admin/)           | React                | Booking admin app        | http://localhost/admin                         |
| [graphql](graphql/)       | express.js / GraphQL | GraphQL and API          | http://localhost/graphql, http://localhost/api |
| PostgreSQL                | external             | Database used by graphql | tcp://localhost:5432                           |

## Deployment

### Demo

To deploy to the demo environment:

    docker-compose build; and docker-compose push

### Production

To deploy to the production environment:

    env TAG=:production docker-compose build; and env TAG=:production docker-compose push
