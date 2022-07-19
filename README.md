# United-Dogs

Aplicación web para la visualización de las distintas razas de perros en el mundo, ademas de la creacion de nuevas razas con distintos atributos y temperamentos. Consumiendo The Dog API
```
https://thedogapi.com/
```
Esta aplicación Full Stack fue desarrollada con ReactJS y Redux en la parte del Frontend y NodeJS, Express, Sequelize y PostgreSQL en la parte del Backend.

```
https://front-dogs.vercel.app/
```

## instructuvo para correr el proyecto:

### IMPORTANTE:
Se debe crear un archivo .env en la ruta /api y agregarle las siguientes variables de entorno:
- __PORT__ para que el puerto sea dinámico
- __DB_USER__ usuario de la base de datos
- __DB_PASSWORD__ password de la base de datos
- __DB_HOST__ host de la base de datos
- __DB_NAME__ nombre de la base de datos

Se debe crear un archivo .env en la ruta /client y agregarle la siguiente variable de entorno:
- __REACT_APP_BACK__ el endpoint local del backend

Luego de esto ingresar los siguientes comandos en la tanto en la ruta /api como en la ruta /client de la app:

`$ npm install`

`$ npm start`

`$ npm test`

# Pantallas de la web

### Pantalla principal

![](https://res.cloudinary.com/dc3i4vyci/image/upload/v1658249326/w8fyldxqtjctd2pvxws2.png)

### Home

![](https://res.cloudinary.com/dc3i4vyci/image/upload/v1658249423/oh5nabalrdoxdmexnfdw.png)

### Creacion de raza

![](https://res.cloudinary.com/dc3i4vyci/image/upload/v1658249447/wl0a4ijleioadlwgklyc.png)
