// ожидает ПОЛНОЙ закгрузки страницы, вплоть до последней картинки
// window.addEventListener('load')
//
//ожидает загрузки ДОМ дерева страницы
window.addEventListener('DOMContentLoaded', function() {
    
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    let hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');

        }
    };

    hideTabContent(1);

    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    };

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

//TIMER

    let deadline = '2019-10-5';

    let getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - Date.parse(new Date()), //deadline minus cuurent time
        //let t = Date.parse(endtime) - Date.parse(new Date()) - (5*3600*1000), //поправка на часовой пояс +5
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor(t/(1000*60*60) % 24),
            days = Math.floor(t/(1000*60*60*24));
        return {
            'total' : t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    let setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            let addZero = (time) =>{
                if (time <= 9) {
                    return '0' + time;
                } else return time;
            };

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
          
            if (t.total <=0) {
                clearInterval(timeInterval);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    };

    setClock('timer', deadline);

    // modal window

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


// FORM lab 5

    let message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы c вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    let //mainForm = document.querySelector('.main-form'),
        form = document.querySelectorAll('form'),
        //input = mainForm.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');
        
    form.forEach(function(item, i) {
        item.addEventListener('submit', function(event) {
            event.preventDefault();
            form[i].appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open('POST','server.php');
            
            //передача в "обычном" формате
            //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            //передача в формате JSON
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            console.log(form[i]);
            let formData = new FormData(form[i]);
            console.log(formData);
            
            //для передачи данных формы в JSON файл необходимо сначала поместить эти данные в некий объект
            //ниже мы создаем этот объект и заполняем его нашими данными из формы
            let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            console.log(obj);
            let json = JSON.stringify(obj);

            //сделали  объект и отправляем его вместо formData
            request.send(json);
            //request.send(formData);


            request.addEventListener('readystatechange', function() {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.success;
                    //console.log(request.responseText);
                    //statusMessage.innerHTML = request.responseText; //ответ от сервера
                } else { 
                statusMessage.innerHTML = message.failure;
                }
            });

            let input = form[i].getElementsByTagName('input');
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
        });
    });

});

// Второе задание

// let age = document.getElementById('age');
 
// function showUser(surname, name) {
//          alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
// }
 
// showUser.apply(age, ["Горький","Максим"]);



