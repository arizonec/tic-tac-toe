import '../index.html';
import '../assets/style.scss';

const field = document.querySelector('.field');
const items = document.querySelectorAll('.cell');
const modal = document.querySelector('.modal');
const modalWindow = document.querySelector('.modal__window');
const resetBtn = document.querySelector('.reset');

let movePlayer = true;
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

let first = [];
let second = [];


field.addEventListener('click', ({ target }) => {
    if (target.classList.contains('cell')) {
        let collection = document.querySelectorAll(".cell:not(.active)");
        if (collection.length == 1) {
            modal.style.visibility = 'visible';
            modalWindow.innerHTML = `нет победителя`;
        }

        if (!target.classList.contains("active")) {
            if (movePlayer) {
                firstPlayer(target);
            } else {
                secondPlayer(target);
            }
        }
    }

})

function firstPlayer(that) {
    if (!that.classList.contains('active')) {
        that.classList.add("active");
        that.classList.add("active_x");
        first.push(that.id);
        checkMap(first);
    }



    movePlayer = !movePlayer;
}

function secondPlayer(that) {
    if (!that.classList.contains('active')) {
        that.classList.add("active");
        that.classList.add("active_o");
        second.push(that.id)
        checkMap(second);
    }

    movePlayer = !movePlayer;
}


function checkMap(arr) {
    let found = false;
    for (let i = 0; i < winCombinations.length; i++) {
        if (winCombinations[i].sort().toString() === arr.sort().toString()) {
            found = true;
        }
    }
    if (found) {
        stop(arr);
    }
}


const stop = (arr) => {
    modal.style.visibility = 'visible';
    modalWindow.innerHTML = `${arr == first ? 'первый' : 'второй'}`;
    first = [];
    second = [];
    items.forEach(item => item.classList.remove('active', 'active_o', 'active_x'));
    movePlayer = true;
}

const reset = () => {
    first = [];
    second = [];
    items.forEach(item => item.classList.remove('active', 'active_o', 'active_x'));
    movePlayer = true;
}

const closeModal = ({ target }) => {
    if (target.classList.contains('modal')) {
        modal.style.visibility = 'hidden';
        console.log(first)
    }
}

document.addEventListener('click', closeModal);
resetBtn.addEventListener('click', reset);



