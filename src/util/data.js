const fs = require('fs');

globalThis.$ = {};


$.title = "ИНТЕЛ МЕДИС";
$.email = 'intel-medis@ukr.net'
$.subTitle = "Медицинский центр";

$.doc = [1, 2, 3, 4, 5, 6, 7];

$.fil = [
    {
        name: 'Вознесеновский',
        tel: ['0974442416', '0954442446'],
        address: 'ул. Яценко 16',
        service: ['alcohol'],
        frame: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10713.72248826186!2d35.149234!3d47.832238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dc6752b0c8f257%3A0x546fb498b0c48a28!2z0YPQuy4g0K_RhtC10L3QutC-LCAxNiwg0JfQsNC_0L7RgNC-0LbRjNC1LCDQl9Cw0L_QvtGA0L7QttGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCA2OTAwMA!5e0!3m2!1sru!2sua!4v1549852899402'
    },
    {
        name: 'Фестивальный',
        tel: ['0955505382'],
        address: 'пр. Соборный 158, оф. 527',
        service: ['alcohol', 'drug', 'game'],
        frame: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2677.1003890854654!2d35.105044!3d47.857019!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dc66d0425aa5b3%3A0xc148072b86ba1a30!2z0L_RgNC-0YHQvy4g0KHQvtCx0L7RgNC90YvQuSwgMTc3LCDQl9Cw0L_QvtGA0L7QttGM0LUsINCX0LDQv9C-0YDQvtC20YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsIDY5MDAw!5e0!3m2!1sru!2sua!4v1549853531486'
    },
    {
        name: 'Соборный',
        tel: ['0612707703', '0672707703'],
        address: 'пр. Соборный 177',
        service: ['spec'],
        frame: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2678.095290488253!2d35.140347115638455!3d47.8377472792006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dc674b962a15f1%3A0xff0d42c0f3ae53f6!2z0L_RgNC-0YHQvy4g0KHQvtCx0L7RgNC90YvQuSwgMTU4LCDQl9Cw0L_QvtGA0L7QttGM0LUsINCX0LDQv9C-0YDQvtC20YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsIDY5MDAw!5e0!3m2!1sru!2sua!4v1592507320751!5m2!1sru!2sua'
    }
];

$.page = {
    index: {
        to: "",
        name: "Главная"
    },
    drink: {
        to: "drink",
        name: "Выведение из запоя",
        description: "Запой — это патологическое состояние, характеризующееся продолжительным (более суток) употреблением алкогольных напитков, сопровождающееся сильной алкогольной интоксикацией. Запойные состояния относятся к тяжелым формам алкогольной зависимости. Ведущий синдром запоя – сильное, чаще всего непреодолимое влечение к алкогольным напиткам",
        tel: ['0612207213', '0732207213']
    },
    alcohol: {
        to: "alcohol",
        name: "Алкогольная зависимость",
        description: "Лечение алкогольной зависимости представляет собой сложный, многокомпонентный, многоэтапный процесс и он не заключается только в освобождении от острых проявлений болезни (тяжелое похмелье, прерывание запоя и пр.) Основными принципами лечения хронического алкоголизма являются добровольность, индивидуальный подход к каждому пациенту, комплексность и полный отказ от употребления психоактивных веществ.",
        fil: $.fil.filter(({ service }) => service.includes('alcohol'))
    },
    drug:{
        to: "drug",
        name: "Никотиновая зависимость",
        description: "Задача врачей нашего медицинского центра при помощи комплекса лечебных сеансов и процедур свести абстинентные симптомы к минимуму, ускорить процессы детоксикации организма, снизить эмоциональное напряжение, раздражительность. При самостоятельной попытке бросить курить острые абстинентные симптомы и неумолимая тяга закурить обычно становятся причиной срыва.",
        fil: $.fil.filter(({ service }) => service.includes('drug'))
    },
    game:{
        to: "game",
        name: "Игромания",
        description: "Игромания (лудомания или гемблинг) – болезненное патологическое пристрастие к азартным играм (компьютерным играм, игровым автоматам) приводящее к социальной, профессиональной и личностной несостоятельности. Данное состояние характеризуется сильнейшей зависимостью психики от разнообразных игр с последующими эмоциональными срывами и депрессиями.",
        fil: $.fil.filter(({ service }) => service.includes('game'))
    },
    fizeo:{
        to: "fizeo",
        name: "Физиотерапия",
        description: "Область клинической медицины, изучающая лечебные свойства физических факторов и разрабатывающая методы их применения для лечения и профилактики болезней, а также медицинской реабилитации, называется физиотерапией."
    },
    fizeo_info: {
        to: "fizeo_info",
        name: "Физиотерапия",

    },
    contacts: {
        to: "contacts",
        name: "Контакты",
        fil: $.fil 
    },
    documents: {
        to: "documents",
        name: "Документы"
    },
    cost: {
        to: "cost",
        name: "Оплата"
    }
}

$.nav = [
    $.page.index,
    $.page.contacts,
    $.page.documents,
    $.page.cost,
];

$.drower = [
    $.page.drink,
    $.page.alcohol,
    $.page.drug,
    $.page.game,
    $.page.fizeo,
];

$.subNav = $.drower

$.carusel = [
    $.page.drink,
    $.page.drug,
    $.page.game,
    $.page.contacts,
].map((el) => {
    el.title = $.title;
    return el;
})

$.page.index.data = [
    $.page.drink,
    $.page.alcohol,
    $.page.drug,
    $.page.game,
    $.page.fizeo,
];

$.page.drink.data = [
    {
        data: fs.readFileSync('./src/util/drink.0.txt', 'utf8'),
        to: $.page.drink.to
    },
    {
        data: fs.readFileSync('./src/util/drink.1.txt', 'utf8'),
        to: $.page.drink.to

    },
    {
        data: fs.readFileSync('./src/util/drink.2.txt', 'utf8'),
        to: $.page.drink.to

    },
];

$.page.alcohol.data = [
    {
        data: fs.readFileSync('./src/util/alcohol.0.txt', 'utf8'),
        to: $.page.alcohol.to

    },
    {
        data: fs.readFileSync('./src/util/alcohol.1.txt', 'utf8'),
        to: $.page.alcohol.to

    },
    {
        data: fs.readFileSync('./src/util/alcohol.2.txt', 'utf8'),
        to: $.page.alcohol.to

    },
    {
        data: fs.readFileSync('./src/util/alcohol.3.txt', 'utf8'),
        to: $.page.alcohol.to
    },
];

$.page.drug.data = [
    {
        data: fs.readFileSync('./src/util/drug.0.txt', 'utf8'),
        to: $.page.drug.to
    },
    {
        data: fs.readFileSync('./src/util/drug.1.txt', 'utf8'),
        to: $.page.drug.to
    },
    {
        data: fs.readFileSync('./src/util/drug.2.txt', 'utf8'),
        to: $.page.drug.to
    },
];

$.page.game.data = [
    {
        img: '/test.jpg',
        data: fs.readFileSync('./src/util/game.0.txt', 'utf8'),
        to: $.page.game.to
    },
    {
        img: '/test.jpg',
        data: fs.readFileSync('./src/util/game.1.txt', 'utf8'),
        to: $.page.game.to
    },
    {
        img: '/test.jpg',
        data: fs.readFileSync('./src/util/game.2.txt', 'utf8'),
        to: $.page.game.to
    },
];

$.page.fizeo_info.data = [
    {
        data: fs.readFileSync('./src/util/fizeo_info.0.txt', 'utf8'),
        to: $.page.fizeo_info.to
    },
    {
        data: fs.readFileSync('./src/util/fizeo_info.1.txt', 'utf8'),
        to: $.page.fizeo_info.to
    },
];