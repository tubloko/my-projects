let slider = document.getElementById('slider');
let left = document.getElementById('left');
let right = document.getElementById('right');
let pictures = [{
    src: './slider/back_1.png',
    delay: 1500
}, {
    src: './slider/back_2.png',
    delay: 3000
}, {
    src: './slider/back_3.png',
    delay: 4500
}, {
    src: './slider/back_4.png',
    delay: 6000
}, {
    src: './slider/back_5.png',
    delay: 7500
}, ]
let i = 0;
let j = 0;

function trigger() {
    left.onclick = (() => {
        console.log('left ' + j);
        if (j === pictures.length - 1) j--;
        j++;
        slider.style.backgroundImage = 'url(' + pictures[j].src + ')';
    });

    right.onclick = (() => {
        console.log('right ' + j);
        if (j === 0) j++;
        j--;
        slider.style.backgroundImage = 'url(' + pictures[j].src + ')';
    });
}

trigger();

function nextImage() {
    let img = new Image;
    img.src = pictures[i].src;
    img.onload = () => {
        slider.style.backgroundImage = 'url(' + pictures[i].src + ')';
        i++;
        if (i >= pictures.length) {
            i = 0;
        }
        setTimeout(nextImage, pictures[i].delay);
    }
}

nextImage();