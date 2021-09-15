# kuepa-chat

Aplicacion de chat tipo zoom, realizada con las siguientes technologias:

-Javascript

-React

-Redux

-Socket.io

-MongoDb

-Express

-Css

# DESCRIPCION

La aplicacion permite el registro y logueo de usuarios los cuales ingresan a una transmision con chat abierto en tiempo real,
todos los mensajes son guardados en la base de datos y pueden ser pedidos por un administrador,
es responsive y cuenta con una simple autenticacion mediante la base de datos y session web

# INSTALACION

Para poder utilizar la app:

-La aplicacion utiliza mongoDb como base de datos, por lo tanto hay que tener atlas o una instancia local para poder
correr la app. Si se utiliza mongoDb de forma local de debe tener abierto powershell ejecutando el commando = mongod

-Clonar repositorio, en tu terminal de preferencia: git clone https://github.com/enodrac/kuepa-chat

-Se deve realizar npm i tanto en client como en server

-Crear un archivo .env en la carpeta server en el cual se deven de tener dos variables

    -PORT = 5000
    
    para instancia local 
    -CONECTION_URL = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
    
    *solo se tiene que poner una variable dependiendo si es local o atlas
    
    para atlas usuario gratis(cluster0)
    -CONECTION_URL = "mongodb+srv://user:password@cluster0.w1gmk.mongodb.net/NAME?retryWrites=true&w=majority"
    reemplazar user y password por el user y password de atlas, NAME por el nombre que que quieras darle a la base de datos

-CONECTION_URL es el link con el cual conecta a la base de datos

-Al finalizar los pasos anterior se deben abrir dos terminales una en server y otra en client en las cuales
hay que ingresar el comando npm start para que inicie su funcionamiento
    
-Para poder utilizar todas las funciones de la app debe crearse un usuario como administrador

# SCREENSHOTS

![alt text](https://cdn.discordapp.com/attachments/887586717475958806/887586739995160656/unknown.png)
![alt text](https://cdn.discordapp.com/attachments/887586717475958806/887586821322715176/unknown.png)
![alt text](https://cdn.discordapp.com/attachments/887586717475958806/887590328608129045/unknown.png)
![alt text](https://cdn.discordapp.com/attachments/887586717475958806/887589310214320148/unknown.png)
![alt text](https://cdn.discordapp.com/attachments/887586717475958806/887601671545434132/unknown.png)
![alt text](https://cdn.discordapp.com/attachments/887586717475958806/887601756484292700/unknown.png)
