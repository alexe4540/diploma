<?
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    if($_GET["func"] == "saveImg"){        
        $img_name = $data['img_name'];
        $img_data_url = $data['img_data_url'];
        $uri = substr($img_data_url, strpos($img_data_url, ",") + 1);

        $file = "../saved_img/" . $img_name;
        $result = file_put_contents($file, base64_decode($uri));
        echo $result;
    }
