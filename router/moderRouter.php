<?
    include("../config/conection.php");

    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    if($_GET["func"] == "insert"){
        $oname = $data['oname'];
        $longitude = $data['longitude'];
        $latitude = $data['latitude'];
        $wcount = $data['wcount'];
        $city = $data['city'];

        $insertResult = mysqli_query($dbc, "INSERT INTO factory (fname, longitude, latitude, wcount, city) VALUES ('" . $oname . "','" . $longitude . "','" . $latitude . "','" . $wcount . "','" . $city . "')");

        echo $insertResult;
    }

    if($_GET["func"] == "insertUser"){
        $uname = $data['uname'];
        $pass = $data['pass'];
        $role = $data['role'];

        $insertResult = mysqli_query($dbc, "INSERT INTO users (uname, pass, role) VALUES ('" . $uname . "','" . password_hash($pass, PASSWORD_DEFAULT) . "','" . $role . "')");

        echo $insertResult;
    }

    if($_GET["func"] == "deleteUser"){
        $id = $data["user_id"];

        $deleteResult = mysqli_query($dbc, "DELETE FROM users WHERE user_id = " . $id);

        echo $deleteResult;
    }

    if($_GET["func"] == "users"){
        $users = mysqli_query($dbc, "select * from users");

        $resArr = mysqli_fetch_all($users);
        $res = json_encode($resArr, JSON_UNESCAPED_UNICODE);
      
        echo $res;
    }