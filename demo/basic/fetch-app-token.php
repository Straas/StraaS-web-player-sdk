<?php
  header("Content-Type: application/json");
  // fetch-app-token.php
  try {
    $clientId = '8b8dcc8ace6f64a8';
    $clientSecret = '7iqrkrc9LByXYmDR';

    $curlSession = curl_init("https://app.straas.net/api/v1/app/token");

    curl_setopt($curlSession, CURLOPT_POST, true);
    curl_setopt($curlSession, CURLOPT_POSTFIELDS, "client_id=${clientId}&client_secret=${clientSecret}");

    if( curl_exec($curlSession) === FALSE ) {
      $arr = array("error" => "test");
      echo json_encode($arr);
    }


    curl_close($curlSession);
  }
  catch(Exception $e) {
    $arr = array("error" => $e->getMessage());
    echo json_encode($arr);
  }

?>