window.addEventListener('DOMContentLoaded', function() {
    
    'use strict';
    let calc = require('./parts/calc.js'),
        slider = require('./parts/slider.js'),
        form = require('./parts/form.js'),
        modal = require('./parts/modal.js'),
        timer = require('./parts/timer.js'),
        tabs = require('./parts/tabs.js');

        calc();
        slider();
        form();
        modal();
        timer();
        tabs();

});