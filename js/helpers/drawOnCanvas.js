function drawEllipse(color, ctx, coords, sizes, angle) {
    angle = (angle - 90) * Math.PI / 180;
    color = `rgb(${color.r}, ${color.g}, ${color.b})`;

    ctx.resetTransform();

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.save(); // сохраняем стейт контекста    
    ctx.translate(coords[0] + (sizes[0] - sizes[1] / 4) * Math.cos(angle),
        coords[1] + (sizes[0] - sizes[1] / 4) * Math.sin(angle)); // перемещаем координаты в центр эллипса
    ctx.rotate(angle); // поворачиваем координатную сетку на нужный угол
    ctx.scale(1, sizes[1] / sizes[0]); // сжимаем по вертикали
    ctx.arc(0, 0, sizes[0], 0, Math.PI * 2); // рисуем круг
    ctx.restore(); // восстанавливает стейт, иначе обводка и заливка будут сплющенными и повёрнутыми
    ctx.strokeStyle = color;
    ctx.stroke(); // обводим
    ctx.closePath();
} 

function drawFireZone(color, ctx, coords, sizes, angle) {
    angle = (angle - 90) * Math.PI / 180;
    color = `rgb(${color.r}, ${color.g}, ${color.b})`;

    ctx.resetTransform();

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.save(); // сохраняем стейт контекста    
    ctx.translate(coords[0] + (sizes[0] - sizes[1]) * Math.cos(angle),
        coords[1] + (sizes[0] - sizes[1]) * Math.sin(angle)); // перемещаем координаты в центр эллипса
    ctx.rotate(angle); // поворачиваем координатную сетку на нужный угол
    ctx.scale(1, sizes[1] / sizes[0]); // сжимаем по вертикали
    ctx.arc(0, 0, sizes[0], 0, Math.PI * 2); // рисуем круг
    ctx.restore(); // восстанавливает стейт, иначе обводка и заливка будут сплющенными и повёрнутыми
    ctx.strokeStyle = color;
    ctx.stroke(); // обводим
    ctx.closePath();
}

function drawArc(color, ctx, coords, radius) {
    ctx.resetTransform();
    color = `rgb(${color.r}, ${color.g}, ${color.b})`;

    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.save(); // сохраняем стейт контекста    
    ctx.arc(coords[0], coords[1], radius, 0, Math.PI * 2); // рисуем круг
    ctx.strokeStyle = color;
    ctx.stroke(); // обводим
    ctx.closePath();
}