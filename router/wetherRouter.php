<?php

//$url = 'https://api.darksky.net/forecast/199cb0b508acd58820ca7ed8fea3afb3/50.937656,34.671799';

if(isset($_POST['url']))
// or else if(!empty($_GET))
{
    echo file_get_contents($_POST['url']);
    //may be some error handeling if you want
}
?>