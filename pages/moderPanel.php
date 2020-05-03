<?
    session_start();
    if (!isset($_SESSION['role'])) {
        header("Location: ../index.php");
    }
?>   

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./../css/main.css">
    <link rel="stylesheet" href="./../css/moder.css">
</head>

<body>
    <?php include('./../php/module/header.html'); ?>

    <section>
        <div class="container">            
            <div class="form-container">
                <div id="msg"></div>

                <label for="oname"><b>Назва обєкту</b></label>
                <input type="text" placeholder="Введіть назву обєкту" name="oname" required>

                <label for="latitude"><b>Широта</b></label>
                <input type="number" placeholder="Введіть широту" name="latitude" required>

                <label for="longitude"><b>Довгота</b></label>
                <input type="number" placeholder="Введіть довготу" name="longitude" required>

                <label for="wcount"><b>Кількість працівників</b></label>
                <input type="number" placeholder="Введіть кількість працівників" name="wcount" required>

                <button id="addButton">Додати</button>
            </div>
        </div>
    </section>
    <? include('../php/module/footer.php'); ?>
</body>
<script src="/js/getters/serverGetter.js"></script>
<script src="/js/module/moderPanel.js"></script>

</html>