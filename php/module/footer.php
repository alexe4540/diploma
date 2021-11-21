<link rel="stylesheet" href="/css/login.css">
<footer>
    <div class='container'>
        <div class="dev-info">Розробив Шишкін Олексій</div>
        <?php
            if (!isset($_SESSION['role'])) {
                ?>
        <button onclick="document.querySelector('#loginModal').style.display='block'" style="width:auto;">Вхід</button>
            <?php 
            } 
            if (isset($_SESSION['role'])) {
            ?>
        <div>
            <?php
                    if($_SESSION['role'] == 'admin'){
            ?>

            <a href="/pages/adminPanel.php">Панель адміністратора</a>
            <?php
                    }
                ?>


            <a href="/pages/moderPanel.php">Панель модератора</a>
            <a href="/router/out.php">Вихід</a>
        </div>
        <?php
            }
        ?>
    </div>
</footer>
<?php
    include('login.php');
?>