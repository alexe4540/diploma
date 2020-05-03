function drawEllipse(ctx, coords, sizes, angle) {
    angle = (angle - 90) * Math.PI / 180;

    ctx.beginPath();
    ctx.fillRect(coords[0], coords[1], 2, 2);
    ctx.arc(coords[0], coords[1], sizes[1] / 4, 0, Math.PI * 2);
    ctx.strokeStyle = 'blue';
    ctx.stroke(); // обводим
    ctx.closePath();

    ctx.beginPath();
    ctx.save(); // сохраняем стейт контекста    
    ctx.translate(coords[0] + (sizes[0] - sizes[1] / 4) * Math.cos(angle),
        coords[1] + (sizes[0] - sizes[1] / 4) * Math.sin(angle)); // перемещаем координаты в центр эллипса
    ctx.rotate(angle); // поворачиваем координатную сетку на нужный угол
    ctx.scale(1, sizes[1] / sizes[0]); // сжимаем по вертикали
    ctx.arc(0, 0, sizes[0], 0, Math.PI * 2); // рисуем круг
    ctx.restore(); // восстанавливает стейт, иначе обводка и заливка будут сплющенными и повёрнутыми
    ctx.strokeStyle = 'green';
    ctx.stroke(); // обводим
    ctx.closePath();
}