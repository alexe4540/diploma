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

                    <label for="fdate"><b>Час виникнення аварії</b></label>
                    <div class="checkbox">
                        <input type="checkbox" id="dateNow" name="dateNow">
                        <label for="dateNow" style="display: inline">На момент розрахунку</label>
                    </div>
                    <input name="fdate" type="datetime-local" required>


                    <label for="fname"><b>Місце аварії</b></label>
                    <select id="fname" name="fname">
                        <option value="0" slected>Оберіть обьект на якому сталася аварія</option>

                        <?php
                        $factorys = mysqli_query($dbc, "SELECT f_id, fname FROM factory");
                        while ($factory = mysqli_fetch_assoc($factorys)) {

                        ?>
                            <option value="<?php echo $factory['f_id']; ?>">
                                <?php echo $factory['fname']; ?>
                            </option>

                        <?php  } ?>
                    </select>

                    <label for="substance"><b>Тип викинутої речовини</b></label>
                    <select id='substance' name="substance">
                        <option value="0" slected>Оберіть тип викинутої речовини</option>

                        <?php
                        $enum_params = mysqli_fetch_assoc(mysqli_query($dbc, "SHOW COLUMNS FROM tabledeptvalue WHERE Field = 'name_NHR'"));
                        preg_match("/^enum\(\'(.*)\'\)$/", $enum_params['Type'], $res);
                        $enum = explode("','", $res['1']);

                        for ($i = 0; $i < count($enum); $i++) {
                        ?>
                            <option value="<?php echo $enum[$i] ?>">
                                <?php echo $enum[$i] ?>
                            </option>
                        <?php
                        }
                        ?>
                    </select>

                    <label for="countSub"><b>Кількість викинутої речовини, т</b></label>
                    <input type="number" placeholder="Введіть кількість викинутої речовини" name="countSub" required>

                    <label for="wcount"><b>Відсоток працівників забезпечених протигазами</b></label>
                    <input type="number" placeholder="Введіть відсоток працівників" name="wcount" required>

                    <button id="calculateButton">Розрахувати</button>
                </div>
            </div>
        </section>
        <section id="resultSection">
            <div class="nhr-container container">
                <div id="mapImg" class="pagePart"></div>
                <div id="resultTable" class="vertical"></div>
            </div>
            <div class="nhr-container container">
                <div id="damageTable" class="vertical"></div>
            </div>
        </section>
    </div>

    <?php include('../php/module/footer.php'); ?>

    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/skycons/1396634940/skycons.min.js'></script>
    <script src="../js/helpers/readJSON.js"></script>
    <script src="../js/calc/getWether.js"></script>
    <script src="../js/getters/localGetter.js"></script>
    <script src="../js/getters/serverGetter.js"></script>
    <script src="../js/helpers/drawOnCanvas.js"></script>
    <script src="../js/helpers/drawTable.js"></script>
    <script src="../js/calc/workWIthMap.js"></script>
    <script src="../js/calc/parceCanvas.js"></script>
    <script src="../js/lib/html2canvas.min.js"></script>
    <script src="../js/calc/nhr.js"></script>
    <script src="../js/module/nhr.js"></script>
</body>

</html>