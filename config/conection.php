<?php
    $dbc = mysqli_connect('localhost', 'root', '', 'diploma');

    if ($dbc == false) {
        echo 'Не удалось подключится к бд';
        echo mysqli_connect_error();
        exit();
    }
