<?
session_start();
include("../config/conection.php");

$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

if ($_GET["func"] == "saveNHRInitData") {
    $f_id = $data['f_id'];
    $nhr_name = $data['nhr_name'];
    $nhr_quantity = $data['nhr_quantity'];
    $prov_gas_mask = $data['prov_gas_mask'];

    $insertResult = insertCommonCatData($data, $dbc);

    if ($insertResult) {
        $insertResult =  mysqli_query($dbc, 
        "INSERT INTO nhr_initial_data ( f_id, id_cat, nhr_name, nhr_quantity, prov_gas_mask )
        select  '" . $f_id . "', cat_initial_data.id_cat,'" . $nhr_name . "','" . $nhr_quantity . "','" . $prov_gas_mask . "'
        from cat_initial_data
        order by id_cat desc limit 1");
    }

    echo $insertResult;
}

if ($_GET["func"] == "saveEarthInitData") {
    $longitude = $data['longitude'];
    $latitude = $data['latitude'];
    $magnitude = $data['magnitude'];
    $depth = $data['depth'];

    $insertResult = insertCommonCatData($data, $dbc);

    if ($insertResult) {
        $insertResult =  mysqli_query($dbc, 
        "INSERT INTO earth_initial_data ( id_cat, longitude, latitude, magnitude, depth)
        select  cat_initial_data.id_cat,'" . $longitude . "','" . $latitude . "','" . $magnitude . "','" . $depth . "'
        from cat_initial_data
        order by id_cat desc limit 1");
    }

    echo $insertResult;
}

if ($_GET["func"] == "saveFireInitData") {
    $longitude = $data['longitude'];
    $latitude = $data['latitude'];
    $fire_type = $data['fire_type'];
    $burnability_class = $data['burnability_class'];
    $avg_heght_carbon = $data['avg_heght_carbon'];
    $avg_tree_diameter = $data['avg_tree_diameter'];
    $start_perimeter = $data['start_perimeter'];

    $insertResult = insertCommonCatData($data, $dbc);

    if ($insertResult) {
        $insertResult =  mysqli_query($dbc, 
        "INSERT INTO fire_initial_data ( id_cat, longitude, latitude, fire_type, burnability_class, avg_heght_carbon, avg_tree_diameter, start_perimeter)
        select  cat_initial_data.id_cat,'" . $longitude . "','" . $latitude . "','" . $fire_type . "','" . $burnability_class . "','" . $avg_heght_carbon . "','" . $avg_tree_diameter . "','" . $start_perimeter . "'
        from cat_initial_data
        order by id_cat desc limit 1");
    }

    echo $insertResult;
}

function insertCommonCatData($data, $dbc) {
    $id_cat_type = $data['id_cat_type'];
    $cat_date = $data['cat_date'];
    $zone_pic = $data['zone_pic'];
    $user_id = isset($_SESSION['user_id']) ? $_SESSION["user_id"] : 'null';

    return mysqli_query($dbc, 
        "INSERT INTO cat_initial_data (user_id, id_cat_type, cat_date, zone_pic)
        VALUES (" . $user_id . ",'" . $id_cat_type . "','" . $cat_date . "','" . $zone_pic . "')"
    );
}