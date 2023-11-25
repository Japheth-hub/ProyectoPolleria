<?php

require_once "conexion.php";

// Creamos las query para las consultas de nuestra database -----------------------
$tablaClientes = "SELECT id, CONCAT(calle,' #int:', numero_int,' #ext:',IFNULL(numero_ext,' '),' col.', colonia) AS direccion, numero_celular FROM clientes ORDER BY direccion ASC";
// $tablaClientes = "SELECT * FROM clientes";
$tablaInventario = "SELECT * FROM inventario";
$tablaPrecio = "SELECT * FROM lista_precios";
$tablaPedidos = "SELECT p.fecha, p.cliente_id, p.pedido, p.precio, p.estado, c.numero_celular, CONCAT(calle,' #int:', numero_int,' #ext:',IFNULL(numero_ext,' '),' col.', colonia) AS direccion from pedidos p INNER JOIN clientes c ON c.id = p.cliente_id ORDER BY p.id DESC";
// $tablaPedidos = "SELECT * FROM pedidos";

// Convertimos los datos en arreglos asociativos con el fetch_assoc-----------------
    $consultaClientes = $conexion->query($tablaClientes);
    if($consultaClientes->num_rows > 0){
        $clientes = array();
        while($row = $consultaClientes->fetch_assoc()){
            $clientes[] = $row;
        }
    }
    $consultaInventario = $conexion->query($tablaInventario);
    if($consultaInventario->num_rows > 0){
        $inventario = array();
        while($row = $consultaInventario->fetch_assoc()){
            $inventario[] = $row;
        }
    }
    $consultaPrecio = $conexion->query($tablaPrecio);
    if($consultaPrecio->num_rows > 0){
        $precio = array();
        while($row = $consultaPrecio->fetch_assoc()){
            $precio[] = $row;
        }
    }
    $consultaPedidos = $conexion->query($tablaPedidos);
    if($consultaPedidos->num_rows > 0){
        $pedidos = array();
        while($row = $consultaPedidos->fetch_assoc()){
            $pedidos[] = $row;
        }
    }
// -------------------------------------------------------------------------------------

// Creamos nuestra clase para poder retornar un objeto con nuestras consultas
    class Datos{
        public $datosClientes;
        public $datosInventario;
        public $datosPrecio;
        public $datosPedidos;

        public function __construct($clientes, $inventario, $precio, $pedidos){
            $this->datosClientes = $clientes;
            $this->datosInventario = $inventario;
            $this->datosPrecio = $precio;
            $this->datosPedidos = $pedidos;
        }
    }
// Creamos un nuevo objeto con la clase anterior pasandole como parametros los datos de las consultas en forma de arreglos
    $respuesta = new Datos($clientes, $inventario, $precio, $pedidos);

// Enviamos nuestros datos en formato json para que en el archivo de js se puedan obtener
    echo json_encode($respuesta);


?>