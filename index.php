<? session_start() ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/mainpage.css">
</head>

<body>
    <?php include('./php/module/header.html'); ?>

    <div class="Site-content">
        <section>
            <div class="">
                <div class="img-bg">
                    <div class="box">
                        <h1>Аналіз збитків від природніх <br>
                            та техногенних катастроф</h1>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="container">
                <div class="decription-block">
                    <img src="/img/main-img-1.jpg" alt="#">
                    <div class="decription">
                        <h1>Аварія з викидом НХР</h1>
                        <p> — це подія техногенного характеру, що
                            сталася на хімічно небезпечному об'єкті
                            внаслідок виробничих, конструктивних, технологічних чи експлуатаційних причин або від
                            випадкових зовнішніх впливів, що призвела до пошкодження технологічного обладнання,
                            пристроїв, споруд, транспортних засобів з виливом (викидом) НХР в атмосферу і реально
                            загрожує життю, здоров'ю людей.</p>
                        <a href="/pages/nhrCalculator.php">Перейти до розрахунку</a>

                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="container">
                <div class="decription-block">
                    <img src="/img/main-img-2.jpg" alt="#">
                    <div class="decription">
                        <h1>Землетрус</h1>
                        <p> - це високочастотне в геологічному відношенні коливання земної кори, внаслідок
                            якого виникають сейсми</p>
                        <a href="earthquakeCalculator.php">Перейти до розрахунку</a>

                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="container">
                <div class="decription-block">
                    <img src="/img/main-img-3.jpg" alt="#">
                    <div class="decription">
                        <h1>Лісова пожежа</h1>
                        <p>- стихійне поширення вогню територією лісового фонду. Пожежа вважається
                            лісовою, коли горять не тільки насадження, але й ділянки чагарників, захаращені вирубки,
                            сухий травостій на прогалинах і вирубках, стерня на ділянках тимчасового
                            сільськогосподарського користування на території лісових господарств</p>
                        <a href="fireCalculator.php">Перейти до розрахунку</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <? include('./php/module/footer.php'); ?>
</body>

</html>