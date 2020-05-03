<?
    include("../config/conection.php");

    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    if($_GET["func"] == "insert"){
        $oname = $data['oname'];
        $longitude = $data['longitude'];
        $latitude = $data['latitude'];
        $wcount = $data['wcount'];

        $insertResult = mysqli_query($dbc, "INSERT INTO factory (fname, longitude, latitude, wcount) VALUES ('" . $oname . "','" . $longitude . "','" . $latitude . "','" . $wcount . "')");

        echo $insertResult;
    }