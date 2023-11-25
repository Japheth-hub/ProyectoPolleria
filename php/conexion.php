<?php
// Hacemos la conexion a la base de datos y confirmamos que tenga exito la conexion
$conexion = new mysqli("localhost", "root", "", "blog_master");
if($conexion->connect_error){
    die("". $conexion->connect_error);
} 

?>