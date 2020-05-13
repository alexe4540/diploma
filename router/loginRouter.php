<?
include('./../config/conection.php');
session_start();
$uname = $_POST['uname'];
$pass = $_POST['pass'];

if (!empty($uname) && !empty($pass)) {
    $user = mysqli_query($dbc, "SELECT * FROM users WHERE uname = '$uname'");
    $row = mysqli_fetch_assoc($user);
    if (mysqli_num_rows($user) == 1 && password_verify($pass, $row['pass'])) {
        if ($row['role'] == 'admin') {
           $_SESSION['role'] = 'admin';
           $_SESSION["uname"] = $row['uname'];
           header("Location:" . "./../pages/adminPanel.php");
        } else if ($row['role'] == 'moderator'){
            $_SESSION['role'] = 'moderator';
            $_SESSION["uname"] = $row['uname'];
            header("Location:" . "./../pages/moderPanel.php");
        }
        exit();
    } else {
        $msg = "Ім'я користувача або пароль не вірні!";
        mysqli_close($dbc);
        header("Location:" . $_SERVER['HTTP_REFERER'] . "?msg=$msg");
        exit();
    }
}
