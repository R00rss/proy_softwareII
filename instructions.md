# LINUX
## Para inicializar el backend (FASTAPI-PYTHON)

```
cd proyBE
python3 -m venv venv #si no se tiene creado venv
./venv/bin/activate
pip3 install -r requirements/base.txt && pip3 install -r requirements/dev.txt
python3 main.py
```

## Para inicializar el frontend (ANGULAR-TYPESCRIPT)

```
cd proyFE
npm i && ng serve
```

## Para inicializar la DB (POSTGRESQL-PGADMIN-DOCKERCOMPOSE)

```
cd DB
docker-compose up -d
# para ingresar a pgadmin revisar credenciales en docker-compose.yml
```