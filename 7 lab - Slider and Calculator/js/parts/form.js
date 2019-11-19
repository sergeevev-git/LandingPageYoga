function form() {
    let message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы c вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    let mainForm = document.querySelector('.main-form'),
        //contactForm = document.querySelector('.form'),
        input = mainForm.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');
        
    mainForm.addEventListener('submit', function(event) {
        event.preventDefault();
        mainForm.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST','cgi/print.py');
        
        //передача в "обычном" формате
        //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //передача в формате JSON
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(mainForm);
        
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
                // console.log(request.responseText);
                //statusMessage.innerHTML = request.responseText;
            } else { 
               statusMessage.innerHTML = message.failure;
            }
        });
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
    });
}

module.exports = form;