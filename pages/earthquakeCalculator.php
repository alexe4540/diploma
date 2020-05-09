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

                    <label for="fname"><b>Місце аварії</b></label>
                    <select id="fname" name="fname">
                        <option value="0" slected>Оберіть обьект на якому сталася аварія</option>
                    </select>

                    <label for="latitude"><b>Тип викинутої речовини</b></label>
                    <select id='substance' name="substance">
                        <option value="0" slected>Оберіть тип викинутої речовини</option>
                    </select>

                    <label for="countSub"><b>Кількість викинутої речовини, т</b></label>
                    <input type="number" placeholder="Введіть кількість викинутої речовини" name="countSub" required>

                    <label for="wcount"><b>Відсоток працівників забезпечених протигазами</b></label>
                    <input type="number" placeholder="Введіть відсоток працівників" name="wcount" required>

                    <button id="calculateButton">Розрахувати</button>
                </div>
            </div>
        </section>
        <section id="resultSection" style="display: block">
            <div class="nhr-container container">
                <div id="mapImg" class="pagePart"></div>
                <div id="resultTable" class="vertical"></div>
            </div>
            <div class="nhr-container container">
                <div id="damageTable" class="vertical"></div>
            </div>
        </section>
    </div>

    <? include('../php/module/footer.php'); ?>

    <script src="/js/helpers/drawOnCanvas.js"></script>
    <script src="/js/lib/html2canvas.min.js"></script>
    <script src="/js/calc/workWIthMap.js"></script>
    <script src="/js/calc/earthquake.js"></script>
</body>

</html>