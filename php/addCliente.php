<?php
    require_once "conexion.php";

    if(isset($_POST)) {
        $nombre = !empty($_POST["nombre"]) ? $_POST["nombre"] : null;
        $apellido = !empty($_POST["apellido"]) ? $_POST["apellido"] : null;
        $celular = intval($_POST["celular"]);
        $calle = $_POST["calle"];
        $int = $_POST["numInt"];
        $ext = !empty($_POST["numExt"]) ? $_POST["numExt"] : null;
        $colonia = $_POST["colonia"];
        $referencia = !empty($_POST["nombre"]) ? $_POST["nombre"] : null;
    } else {
        header("Location: index.html");
    }       

    $sql = "INSERT INTO clientes VALUES (null, '$nombre', '$apellido', $celular, '$calle', '$int', '$ext', '$colonia', '$referencia');";
    $add = mysqli_query($conexion, $sql);

    if($add){
        $respuesta = "Exito";
    } else {
        $respuesta = "Fallido ".mysqli_error($conexion);
    }

    echo json_encode($respuesta);
?>