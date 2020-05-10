<?
   function getDegreeOfVerticalStability($dbc, $data){
      $windSpeed = $data["windSpeed"];

      if($windSpeed < 0.5) { $windSpeed = 0; }
      else if($windSpeed < 1.5) { $windSpeed = 0.5; }
      else if($windSpeed < 3) { $windSpeed = 2; }
      else if($windSpeed >= 3) { $windSpeed = 4; }

      $timeOfDay = $data["timeOfDay"];
      $cloudiness = $data["cloudiness"];

      $degreeOfVerticalStability = mysqli_query($dbc, "SELECT vs_value FROM vertical_stability WHERE v_wind = '$windSpeed' AND time_of_day = '$timeOfDay' AND cloudiness = '$cloudiness'");

      $res = mysqli_fetch_assoc($degreeOfVerticalStability);

      echo $res["vs_value"];
   };

   function getTableDeptValue($dbc, $data){
      $nhrQuantity = $data["nhrQuantity"];

      if($nhrQuantity < 1) { $nhrQuantity = 0.5; }
      else if($nhrQuantity < 2) { $nhrQuantity = 1; }
      else if($nhrQuantity < 4) { $nhrQuantity = 3; }
      else if($nhrQuantity < 7.5) { $nhrQuantity = 5; }
      else if($nhrQuantity < 15) { $nhrQuantity = 10; }
      else if($nhrQuantity < 25) { $nhrQuantity = 20; }
      else if($nhrQuantity < 40) { $nhrQuantity = 30; }
      else if($nhrQuantity < 60) { $nhrQuantity = 50; }
      else if($nhrQuantity < 85) { $nhrQuantity = 70; }
      else if($nhrQuantity < 150) { $nhrQuantity = 100; }
      else if($nhrQuantity >= 150) { $nhrQuantity = 300; }

      $nhrType = $data["nhrType"];
      $degreeOfVerticalStability = $data["degreeOfVerticalStability"];
      $temperature = $data["temperature"];

      if($temperature < -10) { $temperature = -20; }
      else if($temperature < 10) {$temperature = 0; }
      else if($temperature >= 10) {$temperature = 20; }

      $windSpeed = $data["windSpeed"];

      if($windSpeed < 1.5) { $windSpeed = 1; }
      else if($windSpeed < 2.5) { $windSpeed = 2; }
      else if($windSpeed < 3.5) { $windSpeed = 3; }
      else if($windSpeed >= 3.5) { $windSpeed = 4; }

      $deptValue = mysqli_query($dbc, "SELECT d_value FROM tabledeptvalue WHERE  SVSP = '$degreeOfVerticalStability' AND name_NHR = '$nhrType' AND h_quantity = '$nhrQuantity'
         AND wind_speed = '$windSpeed' AND temperature = '$temperature'");

      $res = mysqli_fetch_assoc($deptValue);

      echo $res["d_value"];
   };

   function getKsx($dbc, $data){
      $nhrType = $data["nhrType"];
      $height = $data["height"];

      $ksx = mysqli_query($dbc, "SELECT value_NHR FROM nhr_cloud WHERE name_NHR = '$nhrType' AND height = '$height'");

      $res = mysqli_fetch_assoc($ksx);

      echo $res["value_NHR"];
   };

   function getKzm($dbc, $data){
      $degreeOfVerticalStability = $data["degreeOfVerticalStability"];
      $palce = $data["palce"];

      $kzm = mysqli_query($dbc, "SELECT koef_value FROM koef_kzm WHERE SVSP = '$degreeOfVerticalStability' AND palce_type = '$palce'");

      $res = mysqli_fetch_assoc($kzm);

      echo $res["koef_value"];
   };

   function getW($dbc, $data){
      $windSpeed = $data["windSpeed"];

      if($windSpeed < 1.5) { $windSpeed = 1; }
      else if($windSpeed < 2.5) { $windSpeed = 2; }
      else if($windSpeed < 3.5) { $windSpeed = 3; }
      else if($windSpeed >= 3.5) { $windSpeed = 4; }

      $degreeOfVerticalStability = $data["degreeOfVerticalStability"];

      $WValue = mysqli_query($dbc, "SELECT value_v_transfer FROM v_transfer WHERE SVSP = '$degreeOfVerticalStability' AND v_wind = '$windSpeed'");

      $res = mysqli_fetch_assoc($WValue);
      
      echo $res["value_v_transfer"];
   };

   function getPollutionDuration($dbc, $data){
      $nhrType = $data["nhrType"];
      $height = $data["height"];
      $windSpeed = $data["windSpeed"];

      if($windSpeed < 1.5) { $windSpeed = 1; }
      else if($windSpeed < 2.5) { $windSpeed = 2; }
      else if($windSpeed < 3.5) { $windSpeed = 3; }
      else if($windSpeed < 4.5) { $windSpeed = 4; }
      else if($windSpeed < 7.5) { $windSpeed = 5; }
      else if($windSpeed >= 7.5) { $windSpeed = 10; }

      $temperature = $data["temperature"];

      if($temperature < -10) { $temperature = -20; }
      else if($temperature < 10) {$temperature = 0; }
      else if($temperature >= 10) {$temperature = 20; }

      $durationValue = mysqli_query($dbc, "SELECT d_value FROM pollution_duration WHERE name_NHR = '$nhrType' AND temperature = '$temperature' AND wind_speed = '$windSpeed' AND height = '$height'");

      $res = mysqli_fetch_assoc($durationValue);
      
      echo $res["d_value"];
   };

   function getPopulationLoss($dbc, $data){
      $location = $data["place"];
      $gas_masks = $data["provGasMasl"];

      if($gas_masks < 10) { $gas_masks = 0; }
      else if($gas_masks < 25) { $gas_masks = 20; }
      else if($gas_masks < 35) { $gas_masks = 30; }
      else if($gas_masks < 45) { $gas_masks = 40; }
      else if($gas_masks < 55) { $gas_masks = 50; }
      else if($gas_masks < 65) { $gas_masks = 60; }
      else if($gas_masks < 75) { $gas_masks = 70; }
      else if($gas_masks < 85) { $gas_masks = 80; }
      else if($gas_masks < 95) { $gas_masks = 90; }
      else if($gas_masks <= 100) { $gas_masks = 100; }

      $valueLoss = mysqli_query($dbc, "SELECT value_loss FROM population_loss WHERE location = '$location' AND gas_masks = '$gas_masks'");

      $res = mysqli_fetch_assoc($valueLoss);
      
      echo $res["value_loss"];
   };
   
   function getAgriculture($dbc, $data){
      $city = $data['city'];

      $valueCity = mysqli_query($dbc, "SELECT productivity, avg_cost, normDamageForest  FROM agriculture WHERE city = '$city'");

      $res = mysqli_fetch_assoc($valueCity);
      
      echo $res["productivity"] . '|' . $res["avg_cost"] . '|' . $res['normDamageForest'];
   }

   function getFactory($dbc, $data){
      $id = $data['id'];

      $valueCity = mysqli_query($dbc, "SELECT latitude, longitude, wcount, city  FROM factory WHERE f_id = '$id'");

      $res = mysqli_fetch_assoc($valueCity);
      
      echo $res["latitude"] . '|' . $res["longitude"] . '|' . $res['wcount'] . '|' . $res['city'];
   }

   function getEffects($dbc, $data){
      $id = $data['intensity'];

      $valueCity = mysqli_query($dbc, "SELECT effects  FROM earthquakeeffects WHERE intensity = '$id'");

      $res = mysqli_fetch_assoc($valueCity);
      
      echo $res["effects"];
   }

   function getDeathPercent($dbc, $data){
      $intensity = $data['intensity'];

      $valueCity = mysqli_query($dbc, "SELECT buildingType, deathPercent FROM earthqueakedeath WHERE intensity = '$intensity'");

      $resArr = mysqli_fetch_all($valueCity);
      $res = json_encode($resArr, JSON_UNESCAPED_UNICODE);
      
      echo $res;
   }

   function getSystemPercent($dbc, $data){
      $intensity = $data['intensity'];

      $valueCity = mysqli_query($dbc, "SELECT system_type, value FROM earthquake_life_support_system WHERE intensity = '$intensity'");

      $resArr = mysqli_fetch_all($valueCity);
      $res = json_encode($resArr, JSON_UNESCAPED_UNICODE);
      
      echo $res;
   }