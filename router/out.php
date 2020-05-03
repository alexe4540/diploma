<?php
session_start(); //1
if (isset($_SESSION['role'])) { //2
    unset($_SESSION['role']); //3
} else {
    unset($_SESSION['uname']); //5
}
session_destroy(); //6
header("Location:" . $_SERVER['HTTP_REFERER']); //7