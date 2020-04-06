<?
    include("../config/conection.php");
    include("../php/getters/dbGetter.php");

    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    if($_GET["func"] == "vertical"){
        echo getDegreeOfVerticalStability($dbc, $data);
    }

    if($_GET["func"] == "tabledeptvalue"){
        echo getTableDeptValue($dbc, $data);
    }

    if($_GET["func"] == "nhr_cloud"){
        echo getKsx($dbc, $data);
    }

    if($_GET["func"] == "koef_kzm"){
        echo getKzm($dbc, $data);
    }
    if($_GET["func"] == "v_transfer"){
        echo getW($dbc, $data);
    }

    