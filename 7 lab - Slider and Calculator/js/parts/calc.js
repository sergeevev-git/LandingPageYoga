function calc() {
    let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personsSum = 0,
    daysSum = 0,
    total = 0;

    totalValue.innerHTML = total;

    persons.addEventListener('change', function() {
        if (this.value != '') {
            personsSum = +this.value;
            total = (daysSum + personsSum) * 4000; //абстрактная формула в вакууме
        } else {
            total = 0;
        }
        if (restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function() {
        if (this.value != '') {
            daysSum = +this.value;
            total = (daysSum + personsSum) * 4000; //абстрактная формула в вакууме
        } else {
            total = 0;
        }
        if (persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function() {
        if (persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * place.options[place.selectedIndex].value;
            
            
        }
    });
}

module.exports = calc;