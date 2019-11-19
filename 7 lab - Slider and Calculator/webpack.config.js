'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/script.js', //можно указывать несколько файлов-источников(для этого надо сделать это свойство объектом)
  output: {
    filename: 'bundle.js', //финальный файл
    path: __dirname + '/dist/js' //расположение файла
  },
  watch: true, //автоотслеживание изменений файлов

  devtool: "source-map" //карта исходников
};
