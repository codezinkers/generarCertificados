/**
 * @Author: Héctor Lozano Sandoval
 * @Date:   2019-03-29T11:30:20+01:00
 * @Email:  hector.lozsando@codezink.es
 * @Last modified by:   Héctor Lozano Sandoval
 * @Last modified time: 2019-04-04T12:22:11+02:00
 * @Copyright: Copyright (C) 2019 Hector Lozano
 * @Descripcion: Script que introduce los datos de un fichero CSV a una base de datos MySQL

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

 // TODO: Cambiar la ruta, si procede
 // Fichero a cargar
 var fichero = '/home/ubuntu/certificados/certficados.csv'; //Fichero a cargar

 // Carga de los modulos
 var fs = require('fs'); //Modulo de ficheros;
 var mysql = require('mysql'); //Modulo de mysql
 var cifrado = require('crypto'); // Modulo de hash

 // Constantes de las librerias para la conversion de ficheros csv en array
 const { convertCSVToArray } = require('convert-csv-to-array');
 const converter = require('convert-csv-to-array');

 function crearConexion(){
   //Creacion de la conexion
   // TODO: Modificar los parametros según el acceso
   return mysql.createConnection({
     host: "localhost",
     user: "usuario",
     password: "contraseña",
     database: "db",
     //multipleStatements: true   Para multiples sentencias
   });
 }

// Creacion de la conexion
 var con = crearConexion();

 // Funcion que insertar los datos del fichero en la base de datos
 function escribir(listado){
   con = crearConexion();
   // Si el fichero no es null se ejecuta la sentencia
   if (listado != null){
     con.connect(function (err){
       if (err) throw err;
       // Omision de la primera fila, pues son las columnas.
       // Se iteran las filas totales del fichero para su inclusion
       for (i = 1; i < listado.length; i++){
         let nombre = listado[i][0];
         // El dni se inserta cifrado mediante la libreria md5
         let dni = cifrado.createHash('md5').update(listado[i][1]+""+listado[i][3]).digest("hex");
         let fechas = listado[i][2];
         let programa = listado[i][3];
         let horas = listado[i][4];
         let centro = listado[i][5];
         // Sentencia SQL en la tabla cursos
         let today = new Date();
         let dd = String(today.getDate()).padStart(2, '0');
         let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
         let yyyy = today.getFullYear();

         today = dd + '/' + mm + '/' + yyyy;

         // TODO: Cambiar la tabla, si procede
        // Se insertan todos los datos manualmente, excepto ID que es autoincrementado, mediante una sentencia preparda
         const sql = "INSERT INTO certificados (nombre, dni, fechas, programa, horas, centro, fecha_exp) VALUES (?, ?, ?, ?, ?, ?, ?)";
         const datos = [nombre,dni,fechas,programa,horas,centro,today];

         // Log con URL dinamica para acceder al certificado
         console.log(nombre +";"+"https://www.devacademy.es/certificado/?"+dni);

         // Consulta SQL. Recibe la sentencia y el array con los datos
         con.query(sql, datos, function (err, result){
           if (err) throw err;
         });
       }
       con.end();
     });
   }
 }

 // Funcion que lee un fichero csv recibido por parametro y lo transforma en un array
 function leerarchivo(fichero){
   fs.readFile(fichero, 'utf-8', (err, datos) => {
     if(err) {
       console.log('error: ', err);
     } else {
       // Creacion de la constante
       const listado = convertCSVToArray(datos, {
         type: 'array',
         separator: ';', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
       });
       // Llamada a la funcion de escritura en la base de datos
       escribir(listado);
     }
   });
 }

 // Invocacion a la funcion de lectura
 leerarchivo(fichero);
