// ожидает ПОЛНОЙ закгрузки страницы, вплоть до последней картинки
// window.addEventListener('load')
//
//ожидает загрузки ДОМ дерева страницы
window.addEventListener('DOMContentLoaded', function() {
    
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');

        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

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

    let deadline = '2019-09-22';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()), //deadline minus cuurent time
        //let t = Date.parse(endtime) - Date.parse(new Date()) - (5*3600*1000), //поправка на часовой пояс +5
            seconds = '0',
            minutes = '0',
            hours = '0',
            days = '0';
        if (t > 0 ) {
            seconds = String(Math.floor((t/1000) % 60)),
            minutes = String(Math.floor((t/1000/60) % 60)),
            hours = String(Math.floor(t/(1000*60*60) % 24)),
            days = String(Math.floor(t/(1000*60*60*24)));
        }
        return {
            'total' : t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            if (t.days.length < 2) {
                days.textContent = '0' + t.days;
            } else {
                days.textContent = t.days;
            }                
        
            if (t.hours.length < 2) {
                hours.textContent = '0' + t.hours;
            } else {
                hours.textContent = t.hours;
            }

            if (t.minutes.length < 2) {
                minutes.textContent = '0' + t.minutes;
            } else {
                minutes.textContent = t.minutes;
            }

            if (t.seconds.length < 2) {
                seconds.textContent = '0' + t.seconds;
            } else {
                seconds.textContent = t.seconds;
            }
            
            if (t.total <=0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('timer', deadline);
});