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
    <script src="https://kit.fontawesome.com/461af6709f.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="./../css/main.css">
    <link rel="stylesheet" href="./../css/history.css">
    <link rel="stylesheet" href="./../css/lib/leaflet.awesome-markers.css">
    <title>Document</title>
</head>

<body>
    <?php include('./../php/module/header.html'); ?>

    <div class="Site-content">
        <section>
            <div class="history-map-container">
                <div id="map" class=""></div>
                <div class="filter-container">
                    <label for="catType"><b>Вид катастрофи</b></label>
                    <select name="catType" id="catType">
                        <option value="" disabled selected>--Оберіть вид катастрофи--</option>
                        <option value="0">Всі</option>
                        <option value="1">Викид НХР</option>
                        <option value="2">Землетрус</option>
                        <option value="3">Пожежа</option>
                    </select>

                    <h3>Часовий проміжок</h3>

                    <div class="checkbox">
                        <input type="checkbox" id="allTime" name="allTime">
                        <label for="allTime" style="display: inline">За весь час</label>
                    </div>

                    <label for="fromDate"><b>Від</b></label>
                    <input id="fromDate"  name="fromDate" type="datetime-local">

                    <label for="toDate"><b>До</b></label>
                    <div class="checkbox">
                        <input type="checkbox" id="dateNow" name="dateNow">
                        <label for="dateNow" style="display: inline">До поточного моменту</label>
                    </div>
                    <input id="toDate"  name="toDate" type="datetime-local">

                    <button id="applyFilterButton">Застосувати фільтр</button>
                </div>
            </div>

        </section>
    </div>

    <?php include('../php/module/footer.php'); ?>

    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/skycons/1396634940/skycons.min.js'></script>
    <script src="../js/lib/leaflet.awesome-markers.min.js"></script>
    <script src="../js/helpers/readJSON.js"></script>
    <script src="../js/getters/serverGetter.js"></script>
    <script src="../js/calc/historyMap.js"></script>
</body>

</html>