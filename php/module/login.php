<div id="loginModal" class="modal" <?php if (isset($_GET['msg']))
                echo 'style="display:block"';
        ?>>
  <form class="modal-content animate" action="../../router/loginRouter.php" method="post">
    <div class="imgcontainer">
      <span class="close" title="Close Modal" id="closeX">&times;</span>
      <img src="../../img/img_avatar1.png" alt="Avatar" class="avatar">
    </div>

    <div class="modal-container">
      <div class="error" id="error-msg">
        <?php if (isset($_GET['msg']))
                echo $_GET['msg'];
        ?>
      </div>
      <label for="uname"><b>Ім'я користувача</b></label>
      <input type="text" placeholder="Введіть ім'я користувача" name="uname" required>

      <label for="pass"><b>Пароль</b></label>
      <input type="password" placeholder="Введіть пароль" name="pass" required>

      <button type="submit">Увійти</button>
    </div>
  </form>
</div>

<script src="/js/module/login.js"> </script>