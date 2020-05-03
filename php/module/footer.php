<link rel="stylesheet" href="/css/login.css">
<footer>
        <div class='container'>
            <div class="dev-info">Розробив Шишкін Олексій</div>
            <?
            if (!isset($_SESSION['role'])) {
                ?>            
            <button onclick="document.querySelector('#loginModal').style.display='block'" style="width:auto;">Вхід</button>
                <? 
            } 
            if (isset($_SESSION['role'])) {
                ?>
            <div>
                <a href="/pages/moderPanel.php">Панель модератора</a>
                <a href="/router/out.php">Вихід</a>
            </div>
                <?
            }
            ?>
        </div>
</footer>
<?php
    include('D:/Program/OSerwer/OSPanel/domains/diploma/php/module/login.php');
?>