<?
   function getDegreeOfVerticalStability($dbc, $data){
      $windSpeed = $data["windSpeed"];
      $timeOfDay = $data["timeOfDay"];
      $cloudiness = $data["cloudiness"];

      $degreeOfVerticalStability = mysqli_query($dbc, "SELECT vs_value FROM vertical_stability WHERE v_wind = '$windSpeed' AND time_of_day = '$timeOfDay' AND cloudiness = '$cloudiness'");

      $res = mysqli_fetch_assoc($degreeOfVerticalStability);

      echo $res["vs_value"];
   };

   function getTableDeptValue($dbc, $data){
      $nhrQuantity = $data["nhrQuantity"];
      $nhrType = $data["nhrType"];
      $degreeOfVerticalStability = $data["degreeOfVerticalStability"];
      $temperature = $data["temperature"];
      $windSpeed = $data["windSpeed"];

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
      $degreeOfVerticalStability = $data["degreeOfVerticalStability"];

      $WValue = mysqli_query($dbc, "SELECT value_v_transfer FROM v_transfer WHERE SVSP = '$degreeOfVerticalStability' AND v_wind = '$windSpeed'");

      $res = mysqli_fetch_assoc($WValue);
      
      echo $res["value_v_transfer"];
   };