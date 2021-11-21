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
                <div class="form-container" style="height: 512px; overflow-y: auto;">
                    <div id="msg"></div>

                    <label for="fname"><b>Варіант вводу координат землетрусу</b></label>
                    <select name="inputType" id="inputType">
                        <option value="" disabled selected>--Оберіть варіант вводу--</option>
                        <option value="marker">Маркер на мапі</option>
                        <option value="coordinates">Координати місця винекнення</option>
                    </select>

                    <label for="latitude"><b>Широта</b></label>
                    <input type="number" placeholder="Введіть широту" name="latitude" required disabled>

                    <label for="longitude"><b>Довгота</b></label>
                    <input type="number" placeholder="Введіть довготу" name="longitude" required disabled>

                    <label for="fireType"><b>Вид пожежі</b></label>
                    <select id="fireType" name="fireType">
                        <option value="" disabled selected>--Оберіть вид пожежі--</option>
                        <option value="1">Верховий стійкий</option>
                        <option value="2">Верховий побіжний</option>
                        <option value="3">Низовий</option>
                    </select>
                    
                    <label for="burnabilityClass"><b>Клас горимості лісових насаджень</b></label>
                    <select id="burnabilityClass" name="burnabilityClass">
                        <option value="" disabled selected>--Оберіть клас горимості--</option>
                        <option value="1">Чисті і з домішкою листяних порід хвойні насадження (крім модринових)</option>
                        <option value="2">Чисті з домішкою хвойних порід листяні насадження, а також модринові насадження</option>
                    </select>

                    <label for="avgHeghtCarbon"><b>Середня висота нагару</b></label>
                    <select id='avgHeghtCarbon' name="avgHeghtCarbon">
                        <option value="" disabled selected>Оберіть середню висоту нагару</option>

                        <?php 
                        $enum_params = mysqli_fetch_assoc(mysqli_query($dbc, "SHOW COLUMNS FROM wood_damage WHERE Field = 'height'"));
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
                    
                    <label for="avgTreeDiameter"><b>Середній діаметр деревостою</b></label>
                    <select id='avgTreeDiameter' name="avgTreeDiameter">
                        <option value="" disabled selected>Оберіть середній діаметр деревостою</option>

                        <?php 
                        $enum_params = mysqli_fetch_assoc(mysqli_query($dbc, "SHOW COLUMNS FROM wood_damage WHERE Field = 'diameter'"));
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

                    <label for="startPerimeter"><b>Початковий периметр зони загорання, м</b></label>
                    <input type="number" placeholder="Введіть початковий периметр загорання" name="startPerimeter" required>


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

    <?php  include('../php/module/footer.php'); ?>

    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/skycons/1396634940/skycons.min.js'></script>
    <script src="/js/helpers/readJSON.js"></script>
    <script src="/js/calc/getWether.js"></script>
    <script src="/js/helpers/readJSON.js"></script>
    <script src="/js/getters/serverGetter.js"></script>
    <script src="/js/helpers/drawOnCanvas.js"></script>
    <script src="/js/helpers/drawTable.js"></script>
    <script src="/js/lib/html2canvas.min.js"></script>
    <script src="/js/calc/workWIthMap.js"></script>
    <script src="/js/module/forestFire.js"></script>
    <script src="/js/calc/forestfire.js"></script>
</body>

</html>