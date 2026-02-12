

docker exec -it node-ts sh


docker compose down -v
docker compose build --no-cache
docker compose up

si cassé

docker system prune -a
docker volume prune


Ctrl + b  ←

Ctrl + b  " hori

Ctrl + b  % verti


docker exec -it cart-postgres psql -U postgres -d cart

CREATE TABLE cart_storage (
    name TEXT PRIMARY KEY,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0)
);