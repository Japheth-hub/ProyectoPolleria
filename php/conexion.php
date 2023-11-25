<?php
// Hacemos la conexion a la base de datos y confirmamos que tenga exito la conexion
$conexion = new mysqli("localhost", "root", "", "blog_master");
// $conexion = new mysqli("sql104.infinityfree.com", "if0_35495231", "DvU2gXbZTu", "if0_35495231_polleria");
if($conexion->connect_error){
    die("". $conexion->connect_error);
} 

?>