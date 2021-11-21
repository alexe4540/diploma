<?php 
    session_start();
    if ($_SESSION['role'] !== 'admin') {
        header("Location: ../index.php");
    }
    include("../config/conection.php"); 
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./../css/moder.css">
    <link rel="stylesheet" href="./../css/main.css">
    <link rel="stylesheet" href="./../css/tabs.css">
</head>

<body>
    <?php include('./../php/module/header.html'); ?>

    <section class="Site-content">
        <div class="container">
            <button class="tablink" onclick="openPage('addModer', this, 'green')">Дадати користувача</button>
            <button class="tablink" onclick="openPage('alterUser', this, 'green')" id="defaultOpen">Управління
                користувачами</button>
            <div id="addModer" class="form-container tabcontent">
                <h1>Додати користувача</h1>
                <div id="msg"></div>

                <label for="uname"><b>Логін</b></label>
                <input type="text" placeholder="Введіть логін користувача" name="uname" required>

                <label for="pass"><b>Пароль</b></label>
                <div style=" display: flex; align-items: center;">
                    <input type="text" placeholder="Введіть пароль" name="pass" required>
                    <button id="generatePassButton">Згенерувати пароль</button>
                </div>

                <label for="role"><b>Роль</b></label>
                <select id='role' name="role">
                    <option value="" disabled selected>Оберіть роль користувача</option>

                    <?php
                        $enum_params = mysqli_fetch_assoc(mysqli_query($dbc, "SHOW COLUMNS FROM users WHERE Field = 'role'"));
                        preg_match("/^enum\(\'(.*)\'\)$/", $enum_params['Type'], $res);
                        $enum = explode("','", $res['1']);

                        for($i = 0; $i < count($enum); $i++){
                    ?>
                    <option value="<?php echo $enum[$i]?>">
                        <?php echo $enum[$i] ?>
                    </option>
                    <?php  
                        }
                    ?>
                </select>


                <button id="addUserButton">Додати</button>
            </div>
            <div id="alterUser" class="form-container tabcontent">
                <table id="bagua-table">
                    <tr>
                        <th>id</th>
                        <th>Логін</th>
                        <th>Роль</th>
                        <th>Пароль</th>
                        <th>Видалити</th>
                    </tr>
                    <?php 
                        $users = mysqli_query($dbc, 'select * from users');

                        while($user = mysqli_fetch_assoc($users)){
                    ?>
                    <tr>
                        <td><?php echo $user['user_id']?></td>
                        <td><?php echo $user['uname']?></td>
                        <td><?php echo $user['role']?></td>
                        <td></td>
                        <td><button name="<?php  echo $user['user_id']?>" onclick="deleteFromDB(<?php  echo $user['user_id']?>)">Видалити</button></td>
                    </tr>    

                    <?php 
                        }


                    ?>
                </table>
            </div>
        </div>
    </section>
    <?php  include('../php/module/footer.php'); ?>
</body>
<script src="/js/module/tabs.js"></script>
<script src="/js/getters/serverGetter.js"></script>
<script src="/js/module/adminPanel.js"></script>

</html>