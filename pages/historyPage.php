<?php
session_start();
include("../config/conection.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
    <link rel="stylesheet" href="./../css/main.css">
    <link rel="stylesheet" href="./../css/history.css">
    <title>Document</title>
</head>

<body>
    <?php include('./../php/module/header.html'); ?>

    <div class="Site-content">
        <section>
            <div class="history-map-container">
                <div id="map" class=""></div>
            </div>
        </section>
    </div>

    <?php include('../php/module/footer.php'); ?>
    
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/skycons/1396634940/skycons.min.js'></script>
    <script src="../js/helpers/readJSON.js"></script>
    <script src="../js/getters/serverGetter.js"></script>
    <script src="../js/calc/historyMap.js"></script>
</body>

</html>