# COMANDOS GIT

```
git init
git add .
git commit -m "Proyecto Base"

git remote add origin <direccion remota github>

git remote -v

git push origin master
```

## Creamos la rama develop
```
git checkout -b develop
git branch
git checkout master
git push -u origin develop
```

## Git Flow
```
git flow init

```

## Crear una nueva funcionalidad
```
git flow feature start add-config-rest

```