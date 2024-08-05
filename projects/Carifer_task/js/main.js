const mobNav = document.querySelector(".mobile_nav");
const menu = document.querySelector(".navigation .menu");
const menuBg = document.querySelector(".menu_bg_mob");
const clsBtn = document.getElementById("close_mob_nav");

mobNav.addEventListener("click", () => {
    document.querySelector("body").style.overflow = "hidden";
    menu.classList.remove("collapsed");
    menuBg.classList.remove("collapsed");
})

clsBtn.addEventListener("click", () => {
    document.querySelector("body").removeAttribute("style");
    menu.classList.add("collapsed");
    menuBg.classList.add("collapsed");
})

const drop_downs = document.querySelectorAll(".menu .drop_down");

drop_downs.forEach(drop_down => {
    drop_down.addEventListener("mouseover", ()=>{
        drop_down.classList.remove("collapsed");
    })
    drop_down.addEventListener("mouseout", ()=>{
        drop_down.classList.add("collapsed");
    })
})

const slideShowImg = document.querySelector(".background_slidShow img");

let imgIndex = 1;
let interval = setInterval(()=>{
    imgIndex += 1;
    if(imgIndex > 3) {imgIndex = 1;}
    slideShowImg.src = `assert/intro_bg_${imgIndex}.jpg`;
    slideShowImg.style.animation = 'none';
    requestAnimationFrame(() => {
        setTimeout(() => {
            slideShowImg.style.animation = '';
        }, 0);
    });
}, 5000)

function numberCountAnimation(element, countEndtAt) {
    let count = 0;
    let interval = setInterval(()=>{
        count++;
        if(count > Number(countEndtAt)) {
            clearInterval(interval);
            return;
        }
        element.innerHTML = count;
    }, 3000 / Number(countEndtAt))
}

const countDisplay = document.querySelectorAll(".populate_item .count");
let countAnimate = false;

const services = document.querySelectorAll(".content_row .services");
let servicesAnimate = false;

window.onscroll = () => {
    if(countAnimate === false) {
        countDisplay.forEach(display => {
            const top = window.scrollY;
            const offset = display.offsetTop;
            if((top + 600) >= (offset)) {
                numberCountAnimation(display, display.getAttribute("data-count"));
                countAnimate = true;
            }
        })
    }
    if(servicesAnimate === false) {
        services.forEach(service => {
            const top = window.scrollY;
            const offset = service.parentElement.offsetTop;
            console.log(top, offset)
            if((top + 550) >= (offset)) {
                service.style.opacity = 1;
                service.style.top = 0;
            }
        })
    }
}