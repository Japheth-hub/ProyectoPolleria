<?php
require_once "conexion.php";

if($_SERVER['REQUEST_METHOD']==='POST'){
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data["id"];
    $productos = $data["productos"];
    $total = $data["total"];
    $estado = $data["estado"];

    if(isset($id) && isset($productos) && isset($total) && isset($estado)){
        
        $sql = "INSERT INTO pedidos VALUES (null, CURDATE(), $id, '$productos', $total, '$estado')";
        $agregarPedido = mysqli_query($conexion,$sql);
        if($agregarPedido){
            $respuesta = "Completado";
        } else {
            $respuesta = "Fallo al guardar";
        }
        // echo json_encode($respuesta);
    }
}





?>