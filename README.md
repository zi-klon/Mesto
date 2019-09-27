# Mesto
## v.0.0.1

Учебный проект, в котором реализована возможность размещать картинки, проставлять им лайки, свои картинки можно удалять.
Есть возможность изменять свои пользовательские данные: имя, инфо о себе и аватар.
Взаимодействие с сервером организовано через fetch-запросы к API и последущей обработкой ответов.

## Как развернуть проект
* Скачайте репозиторий к себе на компьютер 
`git clone https://github.com/zi-klon/Mesto.git *ваша директория*`;
* Вам потребуется библиотека пакетов *npm*. Скачать можно по [ссылке](https://nodejs.org/en/download/). 
Находясь в папке проекта, запустите команду `npm init`;
* Установите вебпак `npm i webpack --save-dev`;
* Для работы с вебпаком потребуется установить эти пакеты:

`npm i webpack-dev-server --save-dev`

`npm i babel-loader --save-dev`

`npm i @babel/cli --save-dev`

`npm i @babel/core --save-dev`

`npm i @babel/preset-env --save-dev`

`npm i core-js@3.1.4 --save`

`npm install --save babel-polyfill`

`npm i mini-css-extract-plugin --save-dev`

`npm i css-loader --save-dev`

`npm install html-webpack-plugin --save-dev`

`npm i webpack-md5-hash --save-dev`

`npm i postcss-loader --save-dev`

`npm i autoprefixer --save-dev`

`npm i cssnano --save-dev`

`npm i style-loader --save-dev`

`npm i optimize-css-assets-webpack-plugin --save-dev`

В проекте существует три вида сборки:
1. dev-сборка - для разработки. Запускается командой `npm run dev`;
2. build-сборка - продакшн сборка. Запускается командой `npm run build`;
3. deploy-сборка - для опубликования на Github pages. Запускается командой `npm run build`;

## Перейти на сайт можно по ссылке <https://zi-klon.github.io/Mesto/>