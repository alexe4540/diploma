async function getJSONWether(url) {
    let result;

    await $.ajax({
        type : "POST",  //type of method
        url  : "/router/wetherRouter.php",  //your page
        data : { url : url},// passing the values
        success:  function(res){  
                     result =  res;
                     }
    });

    return result;   
}
