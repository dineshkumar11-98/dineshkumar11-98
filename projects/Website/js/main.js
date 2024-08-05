var currentSlideIndex = 1;

function toggleAccordion() {
    
    this.classList.toggle("opened");
    const answer = this.querySelector(".answer");
    if(this.classList.contains("opened")) {
        answer.style.height = `${answer.scrollHeight}px`;
    } else {
        answer.style.height = '0px';
    }

    document.querySelectorAll(".accordion").forEach((element)=>{
        if(element != this) {
            element.classList.remove("opened")

            const answer2 = element.querySelector(".answer");
            answer2.style.height = '0px';
        }
    })
}

const slides = document.querySelectorAll(".slide");
const slideNavigater = document.querySelectorAll(".display-navigation ul li");

function  slideAnimation(index) {
    currentSlideIndex = index;
    if(currentSlideIndex > 5) {
        currentSlideIndex = 1;
    }

    slideNavigater.forEach(slide => {
        if(slide.getAttribute("slideIndex") === currentSlideIndex.toString()) {
            slide.classList.add("live");
        }else {
            slide.classList.remove("live");
        }
    });
    
    slides.forEach(slide => {
        if(slide.getAttribute("slideIndex") === currentSlideIndex.toString()) {
            slide.removeAttribute("style");
        }else {
            slide.style.display = 'none';
        }
    });
}


var animInterval = setInterval(()=>{
    currentSlideIndex += 1;
    slideAnimation(currentSlideIndex);
}, 5000)

slideNavigater.forEach(slide => {
    slide.addEventListener('click', (e)=>{
        currentSlideIndex = Number(slide.getAttribute("slideIndex"));

        slideAnimation(currentSlideIndex)
        clearInterval(animInterval);
        animInterval = setInterval(()=>{
            currentSlideIndex += 1;
            slideAnimation(currentSlideIndex);
        }, 5000);
    })
});

// accordion
const accordions = document.querySelectorAll(".accordion");

accordions.forEach(accordion => {
    accordion.addEventListener('click', toggleAccordion);
});

// mobile navbar
const pageNavigation = document.querySelector(".page-navigation");
const mobileNavbar = document.querySelector(".menu-nav-menu");

mobileNavbar.addEventListener('click', ()=>{
    const visibility = pageNavigation.getAttribute("data-visible");

    if(visibility === "false") {
        pageNavigation.setAttribute('data-visible', "true")
        mobileNavbar.setAttribute('data-visible', "true")
    } else if(visibility === "true") {
        pageNavigation.setAttribute('data-visible', "false")
        mobileNavbar.setAttribute('data-visible', "false")
    }
})

// carousels
const carousels = document.querySelector(".carousels-content");
const arrows = document.querySelectorAll(".arrow");

arrows.forEach((arrow)=>{
    arrow.addEventListener('click', ()=>{
        const cardWidth = carousels.querySelector(".card-content").offsetWidth;
        carousels.scrollLeft += arrow.id === "left" ? -cardWidth : cardWidth;
    })
})

// svg animation
const paths = document.querySelectorAll(".service .service-img");

window.onscroll = () => {
    paths.forEach((el) => {
        const top = window.scrollY;
        const offset = el.offsetTop;
        const svg = el.querySelector("svg");
        const animated = svg.getAttribute("data-animated");
        const path = svg.querySelector("path");

        if((top + 300) >= (offset) && animated === "false") {
            path.classList.add('animate');
            svg.setAttribute("data-animated", "true");
        }
    })
}