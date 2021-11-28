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
   
   function getWoodDamageChar($dbc, $data){
      $woodDamage = $data['woodDamage'];

      $valueCity = mysqli_query($dbc, "SELECT description, damage_percent FROM wood_damage_char WHERE d_class = '$woodDamage'");

      $resArr = mysqli_fetch_all($valueCity);
      $res = json_encode($resArr, JSON_UNESCAPED_UNICODE);
      
      echo $res;
   }

   function getWoodDamage($dbc, $data){
      $height = $data['avgHeghtCarbon'];
      $wood_type = $data['burnabilityClass'];
      $diameter = $data['avgTreeDiameter'];

      $valueCity = mysqli_query($dbc, "SELECT d_class FROM wood_damage WHERE height = '$height' AND wood_type = '$wood_type' AND diameter = '$diameter'");
      $res = mysqli_fetch_assoc($valueCity);

      echo $res["d_class"];
   }

   function getCatList($dbc, $data) {
      $id_cat_type = $data['id_cat_type'];
      $from_date = $data['from_date'];
      $to_date = $data['to_date'];
      
      $nhr_query = "select cid.id_cat, ct.id_cat_type, u.uname, ct.name, cid.cat_date, cid.zone_pic, f.longitude, f.latitude
      from cat_initial_data cid
      left join users u on (cid.user_id = u.user_id)
      join cat_type ct on (cid.id_cat_type = ct.id_cat_type)
      join nhr_initial_data nid on (cid.id_cat = nid.id_cat)
      join factory f on (nid.f_id = f.f_id)";

      $earth_query = "select cid.id_cat, ct.id_cat_type, u.uname, ct.name, cid.cat_date, cid.zone_pic, eid.longitude, eid.latitude
      from cat_initial_data cid
      left join users u on (cid.user_id = u.user_id)
      join cat_type ct on (cid.id_cat_type = ct.id_cat_type)
      join earth_initial_data eid on (cid.id_cat = eid.id_cat)"; 

      $forest_query = "select cid.id_cat, ct.id_cat_type, u.uname, ct.name, cid.cat_date, cid.zone_pic, fid.longitude, fid.latitude
      from cat_initial_data cid
      left join users u on (cid.user_id = u.user_id)
      join cat_type ct on (cid.id_cat_type = ct.id_cat_type)
      join fire_initial_data fid on (cid.id_cat = fid.id_cat)"; 

      if(isset($from_date) and isset($to_date)) {
         $where = " where (cid.cat_date between '" . $from_date ."' and '" . $to_date . "')";
         $nhr_query = $nhr_query . $where;
         $earth_query = $earth_query . $where;
         $forest_query = $forest_query . $where;
      }

      $req = "";

      switch ($id_cat_type) {
         case 0:
            $req = $nhr_query .  " union all " . $earth_query . " union all " . $forest_query;
            break;
         case 1:
            $req = $nhr_query;
            break;
         case 2:
            $req = $earth_query;
            break;
         case 3:
            $req = $forest_query;
            break;
     }

      $list =  mysqli_query($dbc, $req);
      
      $rows = array();
      while($row = mysqli_fetch_object($list)) {
         array_push($rows, $row);
      }
      echo json_encode($rows);
   }

   function getNhrData($dbc, $data) {
      $id_cat = $data['id_cat'];

      $nhrData = mysqli_query($dbc, 
         "select *
         from cat_initial_data cid
         join nhr_initial_data nid on (cid.id_cat = nid.id_cat)
         where cid.id_cat = '$id_cat'"
      );
      $res = mysqli_fetch_assoc($nhrData);

      return json_encode($res);
   }

   function getEarthData($dbc, $data) {
      $id_cat = $data['id_cat'];

      $earthData = mysqli_query($dbc, 
         "select *
         from cat_initial_data cid
         join earth_initial_data eid on (cid.id_cat = eid.id_cat)
         where cid.id_cat = '$id_cat'"
      );
      $res = mysqli_fetch_assoc($earthData);

      return json_encode($res);
   }

   function getFireData($dbc, $data) {
      $id_cat = $data['id_cat'];

      $fireData = mysqli_query($dbc, 
         "select *
         from cat_initial_data cid
         join fire_initial_data fid on (cid.id_cat = fid.id_cat)
         where cid.id_cat = '$id_cat'"
      );
      $res = mysqli_fetch_assoc($fireData);

      return json_encode($res);
   }
