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
    
    if($_GET["func"] == "pollution_duration"){
        echo getPollutionDuration($dbc, $data);
    }

    if($_GET["func"] == "population_loss"){
        echo getPopulationLoss($dbc, $data);
    }
    
    if($_GET["func"] == "agriculture"){
        echo getAgriculture($dbc, $data);
    }
    
    if($_GET["func"] == "factory"){
        echo getFactory($dbc, $data);
    }
    
    if($_GET["func"] == "earthquakeeffects"){
        echo getEffects($dbc, $data);
    }

    if($_GET["func"] == "earthqueakedeath"){
        echo getDeathPercent($dbc, $data);
    }

    if($_GET["func"] == "earthqueakesystem"){
        echo getSystemPercent($dbc, $data);
    }
  
    if($_GET["func"] == "wood_damage"){
        echo getWoodDamage($dbc, $data);
    }
   
    if($_GET["func"] == "wood_damage_char"){
        echo getWoodDamageChar($dbc, $data);
    }

    if($_GET["func"] == "cat_list"){
        echo getCatList($dbc);
    }

    if($_GET["func"] == "getNhrData"){
        echo getNhrData($dbc, $data);
    }
    
    if($_GET["func"] == "getEarthData"){
        echo getEarthData($dbc, $data);
    }

    if($_GET["func"] == "getFireData"){
        echo getFireData($dbc, $data);
    }
