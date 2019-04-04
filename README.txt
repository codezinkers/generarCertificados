En este script se emplea Node.js para al carga de datos contenidos en un fichero CSV a una base de datos MySQL.
La explicaci�n del set up va dirigida a su instalacion en una distribuci�n GNU/Linux.
En Windows ser�a muy similar. Para abrir la consola pulsar windows + r y escribir cmd. Solo hay que omitir el paso 1

1. Actualizacion de los paquetes
sudo apt-get update
sudo apt-get upgrade

2. Instalacion de Node.js
sudo apt-get install nodejs (v.8.10.0) Una versi�n superior no deber�a afectar.
(En windows) Se puede instalar Node.js mediante su instalador --> https://nodejs.org/es/ Descargar la estable

3. Instalacion del modulo convert-csv-to-array
npm i convert-csv-to-array -S (v.1.0.3)

4. Instalacion modulo MySQL
npm install mysql (v.5.7.25)

5. Para acceder a la base de datos se utiliza sudo mysql -u root -p
Hay que crear un usuario, pues no es seguro trabajar con root. El comando es GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' IDENTIFIED BY 'password';
Para salir se usa \q. Si no, exit y se realiza la conexion como en el siguiente paso

6. Se accede con el usuario
mysql -u username -p

7. Para crear una tabla hay que crear una base de datos nueva. Para ello se usa:

CREATE DATABASE dbname;
USE dbname;

El script de creacion de la tabla se adjunta en el repositorio. Copiar y pegar en el prompt mysql

8. A continuaci�n hay que poscionarse en la carpeta donde se encuentre el script. Para ello empleamos el comando 
cd rutaDirectorio para posicionaros sobre �l.

Una vez en la carpeta raiz, ejecutamos el script con el comando node nombreScript.js

Si se quiere comprobar la subida, en la base de datos:
SELECT * FROM certificados;

Para comprobar si se han cargado correctamente, en la consola aparecen los nombres de los alumnos junto a una URL que redirije al certificado.
Copiar la URL y pegarla en el navegador

IMPORTANTE
==========================
Antes de ejecutarlo, acceder al script y modificar los valores de la funcion crearConexion para el acceso a la base de datos. Adem�s, en la sentencia SQL,
comprobar sobre qu� tabla se est� trabajando. Comprobar tambi�n la ruta de acceso de la variable fichero, definida en la parte superior del script.
Seguir los comentarios explicativos del script
==========================
