<? 
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
    <title>Document</title>
</head>

<body>
    <?php include('./../php/module/header.html'); ?>
    <div class="Site-content">
        <section>
            <div class="nhr-container container">
                <div id="map" class="pagePart"></div>
                <div class="form-container">
                    <div id="msg"></div>

                    <label for="fname"><b>Варіант вводу координат землетрусу</b></label>
                    <select name="inputType" id="inputType" required>
                        <option value="" disabled selected>--Оберіть варіант вводу--</option>
                        <option value="marker">Маркер на мапі</option>
                        <option value="coordinates">Координати місця винекнення</option>
                    </select>

                    <label for="latitude"><b>Широта</b></label>
                    <input type="number" placeholder="Введіть широту" name="latitude" required disabled>

                    <label for="longitude"><b>Довгота</b></label>
                    <input type="number" placeholder="Введіть довготу" name="longitude" required disabled>

                    <label for="magnitude"><b>Магнітуду</b></label>
                    <input type="number" placeholder="Введіть магнітуду" name="magnitude" required>

                    <label for="depth"><b>Глибина гіпоцентру</b></label>
                    <input type="number" placeholder="Введіть глибину гіпоцентру" name="depth" required>

                    <button id="calculateButton">Розрахувати</button>
                </div>
            </div>
        </section>
        <section id="resultSection" style="display: none">
            <div class="nhr-container container">
                <div id="mapImg" class="pagePart"></div>
                <div id="resultTable" class="vertical"></div>
            </div>
            <div class="nhr-container container">
                <div id="damageTable" class="vertical"></div>
                <div id="lifeSupportSystems" class="vertical"></div>
            </div>
        </section>
    </div>

    <? include('../php/module/footer.php'); ?>

    <script src="/js/helpers/readJSON.js"></script>
    <script src="/js/getters/serverGetter.js"></script>
    <script src="/js/helpers/drawOnCanvas.js"></script>
    <script src="/js/helpers/drawTable.js"></script>
    <script src="/js/lib/html2canvas.min.js"></script>
    <script src="/js/calc/workWIthMap.js"></script>
    <script src="/js/module/earthquake.js"></script>
    <script src="/js/calc/earthquake.js"></script>
</body>

</html>