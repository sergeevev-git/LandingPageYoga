function modal() {
    let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');


    // 1st option - просто обработчик событий массива кнопок
    let tabBtn = document.querySelectorAll('.description-btn');

    //отображение модального окна
    let showModal = (a) => {
        overlay.style.display = 'block';
        a.classList.add('more-splash'); //анимация нажатой кнопки
        document.body.style.overflow = 'hidden'; //отключения скроллинга страницы
    };

    tabBtn.forEach(function(item, i) {
        item.addEventListener('click', function() {
            showModal(tabBtn[i]);
        });
    });    

    more.addEventListener('click', function () {
        showModal(more);
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
        statusMessage.innerHTML = '';
    });
}

module.exports = modal;