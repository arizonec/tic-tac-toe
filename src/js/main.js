import '../index.html';
import '../assets/style.css';

const field = document.querySelector('.field');
const items = document.querySelectorAll('.cell');
const modal = document.querySelector('.modal');
const modalWindow = document.querySelector('.modal__window');
const resetBtn = document.querySelector('.reset');
const playerBtn = document.querySelector('.player');
const botBtn = document.querySelector('.bot');

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

let mode = true;
let movePlayer = true;
let first = [];
let second = [];
let bot = [];


field.addEventListener('click', ({ target }) => {
    if (target.classList.contains('cell')) {
        let collection = document.querySelectorAll(".cell:not(.active)");
        if (collection.length == 1 && !found) {
            modal.style.visibility = 'visible';
            modalWindow.innerHTML = `нет победителя`;
        }

        if (!target.classList.contains("active") && mode) {
            if (movePlayer) {
                firstPlayer(target);
            } else {
                secondPlayer(target);
            }
        }


        if (!target.classList.contains("active") && !mode) {
            if (movePlayer) {
                firstPlayer(target);
            }
            setTimeout(() => botAction(), 1000);
        }

    }

})

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const firstPlayer = (that) => {
    if (!that.classList.contains('active')) {
        that.classList.add("active");
        that.classList.add("active_x");
        first.push(Number(that.id));
        console.log(first);
        checkMap(first);
    }



    movePlayer = !movePlayer;
}

const secondPlayer = (that) => {
    if (!that.classList.contains('active')) {
        that.classList.add("active");
        that.classList.add("active_o");
        second.push(Number(that.id))
        checkMap(second);
    }

    movePlayer = !movePlayer;
}

const botAction = () => {
    let collection = document.querySelectorAll(".cell:not(.active)");
    if (collection.length > 0) {
        let step = getRandomInt(collection.length);
        if (!collection[step].classList.contains('active')) {
            collection[step].classList.add("active");
            collection[step].classList.add("active_o");
            bot.push(Number(collection[step].id));
            checkMap(bot);
            console.log(bot);
            movePlayer = !movePlayer;
            collection = document.querySelectorAll(".cell:not(.active)");
        }
    }
}
let found = false;
const checkMap = (arr) => {
    // let found = false;

    for (let i = 0; i < winCombinations.length; i++) {
        // if (arr.sort().toString().includes(winCombinations[i].sort().toString())) {
        //     found = true;
        // }
        if (winCombinations[i].every(x => arr.includes(x))) {
            found = true;
        }
        //разбить по элементам массива и сравнивать по одному друг с другом


    }
    if (found) {
        stop(arr);
    }
}

const stop = (arr) => {
    modal.style.visibility = 'visible';
    modalWindow.innerHTML = `${arr == first ? 'Победил первый игрок!' : 'Победил второй игрок!'}`;
    first = [];
    second = [];
    items.forEach(item => item.classList.remove('active', 'active_o', 'active_x'));
    movePlayer = true;
}

const reset = () => {
    bot = [];
    first = [];
    second = [];
    items.forEach(item => item.classList.remove('active', 'active_o', 'active_x'));
    movePlayer = true;
    found = false;
}

const closeModal = ({ target }) => {
    if (target.classList.contains('modal')) {
        modal.style.visibility = 'hidden';
        bot = [];
        first = [];
        second = [];
        items.forEach(item => item.classList.remove('active', 'active_o', 'active_x'));
        movePlayer = true;
        found = false;
    }
}

document.addEventListener('click', closeModal);
resetBtn.addEventListener('click', reset);
playerBtn.addEventListener('click', () => {
    mode = true;
    playerBtn.classList.add('active-mode');
    botBtn.classList.remove('active-mode');
})

botBtn.addEventListener('click', () => {
    mode = false;
    playerBtn.classList.remove('active-mode');
    botBtn.classList.add('active-mode');
})




