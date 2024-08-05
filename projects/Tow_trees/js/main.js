function CreatePopup(title, content) {
    const elements = `<div class="popup_content scrollBar_hidden">
                        <div class="header flex">
                            <div class="title">${title}</div>
                            <div class="close">X</div>
                        </div>
                        <div class="content">
                            ${content}
                        </div>
                      </div>`;
    
    let popup_Container = document.createElement('div');
    popup_Container.classList.add("popup_container");
    popup_Container.innerHTML = elements;

    function onClickClose() {
        popup_Container.querySelector(".popup_content").classList.add("onClose")
        setTimeout(()=>{
            popup_Container.removeEventListener("click", onClickClose);
            popup_Container.remove();
            document.querySelector("body").classList.remove("overflow_hidden");
        }, 300)
    }

    // onclick remove the popup
    body.classList.add("overflow_hidden");
    popup_Container.querySelector(".close").addEventListener("click", onClickClose);

    return popup_Container;
}

// popup
const body = document.querySelector("body");

const title = "Book a free tour with us!";
const content = `<div class="book_tour">
                    <h3>Drop us your details and we’ll get in touch with you</h3>
                    <div class="inputBox">
                        <label for="">Name</label><span class="required">*</span>
                        <input type="text" required>
                        <div class="errorMessage"></div>
                    </div>
                    <div class="inputBox">
                        <label for="">Email</label><span class="required">*</span>
                        <input type="text" required>
                        <div class="errorMessage"></div>
                    </div>
                    <div class="inputBox">
                        <label for="">Mobile Number</label><span class="required">*</span>
                        <input type="text" required>
                        <div class="errorMessage"></div>
                    </div>
                    <div class="inputBox">
                        <label for="">No.of Seats Required</label><span class="required">*</span>
                        <input type="number" placeholder="1" min="1" required>
                        <div class="errorMessage"></div>
                    </div>
                    <div class="submit_btn"><button>Submit</button></div>
                </div>
                `;
const popup = CreatePopup(title, content);
body.append(popup);

document.querySelectorAll(".popup_trigger").forEach(
    trigger => {trigger.addEventListener("click", ()=>{
        const popup = CreatePopup(title, content);
        body.append(popup);
    });
})

document.querySelector(".search").addEventListener("click", ()=>{
    const search = CreatePopup("", `<input type="text" placeholder="Type Your Search..."`);
    
    body.append(search);
})

// slide show
let currentImg = 1;
const slidImage = document.querySelector(".slide_show > img");
const prevImage = document.querySelector(".slide_show .prevImg > img");
const nextImage = document.querySelector(".slide_show .nextImg > img");
const prev = document.querySelector(".slide_show .prevImg");
const next = document.querySelector(".slide_show .nextImg");
const text = document.querySelector(".slide_show .overlayText");

const overlayText = {"1": "<span>Workspace</span> that work for you", "2": "Nurtured with <span>Natural</span> surrounding", "3": "<span>Private meeting</span> rooms focused collaboration"}

function anim() {
    if(currentImg > 3) {
        currentImg = 1;
    } else if(currentImg < 1) {
        currentImg = 3;
    }
    
    const prevImg = (currentImg - 1 < 1) ? 3 : currentImg - 1;
    const nextImg = (currentImg + 1 > 3) ? 1 : currentImg + 1;

    slidImage.src = `./asserts/slide_show_${currentImg}.jpg`;
    slidImage.setAttribute("data-imgindex", currentImg);
    prevImage.src = `./asserts/slide_show_${prevImg}.jpg`;
    nextImage.src = `./asserts/slide_show_${nextImg}.jpg`;
    slidImage.style.animation = 'none';
    requestAnimationFrame(() => {
        setTimeout(() => {
            slidImage.style.animation = '';
        }, 0);
    });
    text.innerHTML = overlayText[currentImg];
    text.setAttribute("data-textindex", currentImg);
    text.style.animation = 'none';
    requestAnimationFrame(() => {
        setTimeout(() => {
            text.style.animation = '';
        }, 0);
    });
}

function onClickPrev() {
    currentImg--;
    anim();
}

function onClickNext() {
    currentImg++;
    anim();
}

let animInterval = setInterval(onClickNext, 5000);

prev.addEventListener("click", ()=>{
    clearInterval(animInterval);
    onClickPrev();
    animInterval = setInterval(onClickNext, 5000);
})

next.addEventListener("click", ()=>{
    clearInterval(animInterval);
    onClickNext();
    animInterval = setInterval(onClickNext, 5000);
})


let currentImgAboutUs = 1;
const totalImgs = 2;
const slidImageAboutUs = document.querySelector(".slideshow_images");
const prevAboutUs = document.querySelector(".slideshow_wrapper .prev");
const nextAboutUs = document.querySelector(".slideshow_wrapper .next");
const imgWidth = slidImageAboutUs.querySelector("img[data-slideshowindex]").offsetWidth;

function animAboutUs() {
    if(currentImgAboutUs > 2) {
        currentImgAboutUs = 1;
    } else if(currentImgAboutUs < 1) {
        currentImgAboutUs = 2;
    }
    slidImageAboutUs.scrollLeft += (currentImgAboutUs == 2) ? -imgWidth : imgWidth;
}

function nextClicked() {
    clearInterval(aboutUsSlideInterval)
    currentImgAboutUs++;
    animAboutUs()
    aboutUsSlideInterval = setInterval(nextClicked, 5000)
}

function prevClicked() {
    clearInterval(aboutUsSlideInterval)
    currentImgAboutUs--;
    animAboutUs()
    aboutUsSlideInterval = setInterval(nextClicked, 5000)
}

let aboutUsSlideInterval = setInterval(nextClicked, 5000)

prevAboutUs.addEventListener("click", prevClicked);
nextAboutUs.addEventListener("click", nextClicked);

const card_container = document.querySelector(".card_container");
const pagenation = document.querySelectorAll("[data-curentPage]");
const prevArrow = document.querySelector(".card_pagnitation .prev");
const nextArrow = document.querySelector(".card_pagnitation .next");

let currentPage = 1;

const createCard = function(cardNo, ext, title) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("card_wrapper")
    const card = `<div class="card_content">
                        <div class="card_head">
                            <img src="./asserts/card-${cardNo}.${ext}">
                        </div>
                        <div class="content">
                            <div class="content_title">
                                <h2>${title}</h2>
                            </div>
                            <div class="readMore">
                                <span>READ MORE</span>
                                <i class="fa-solid fa-arrow-right-long"></i>
                            </div>
                        </div>
                    </div>`;
    
    wrapper.innerHTML = card
    return wrapper;
}

const wordings = {1: {ext: "png", text: "6 Key Aspects Of Coworking Success"},
                  2: {ext: "png", text: "6 Best Coworking Software To Manage Your Office Space"},
                  3: {ext: "png", text: "5 Ways Coworking Fosters Community Work"},
                  4: {ext: "png", text: "The Significance of Marketing Strategies For Your Coworking Space"},
                  5: {ext: "png", text: "Ways To Utilize Coworking Space For Events"},
                  6: {ext: "png", text: "Top 5 Coworking Business Metrics To Keep In Mind"},
                  7: {ext: "png", text: "7 Tips to Improve Your Coworking Space"},
                  8: {ext: "png", text: "7 Ways to Bring Mindfulness to your Coworking Space"},
                  9: {ext: "png", text: "How Freelancers Can Use Coworking to Land Clients"},
                  10: {ext: "png", text: "Best Practices to Help Develop a Strong Remote Work Culture"},
                  11: {ext: "png", text: "Cleanliness Tips to Follow as you Cowork"},
                  12: {ext: "jpeg", text: "The Ultimate Office Moving Checklist for 2021"},
                  13: {ext: "jpeg", text: "Famous Startups that began in Coworking Spaces"},
                  14: {ext: "jpeg", text: "Why Students Should Choose a Coworking Space"},
                  15: {ext: "png", text: "Types of Coworkers"},
                  16: {ext: "png", text: "Coworking Trends That Will Rule 2021"},
                  17: {ext: "jpg", text: "Reasons Why Coworking is better than Work from Home"},
                  18: {ext: "jpg", text: "Smart Offices – Workspaces of the future"},
                  19: {ext: "jpg", text: "Coworking Spaces are the Future"},
                  20: {ext: "jpg", text: "How to Boost Productivity"},
                  21: {ext: "png", text: "Top Coworking Spaces in Chennai"},
                  22: {ext: "png", text: "Life in a Coworking Space"},
                  23: {ext: "jpg", text: "Trends Of Work – Traditional Office Space vs Coworking Space in India"},
                  24: {ext: "jpg", text: "7 tips for choosing the right coworking space"},
                  25: {ext: "jpg", text: "The vital role of a Community Manager in a Coworking Space"},
                  26: {ext: "jpg", text: "9 Benefits of Coworking Spaces as Your First Office"},
                  27: {ext: "jpg", text: "Disruption in Coworking space"},
                  28: {ext: "jpg", text: "Work hard, live healthy"}};

function pagenationF(page) {
    pagenation.forEach(e => {
        e.classList.remove("active");
    })
    page.classList.add("active");
    const startNo = Number(page.getAttribute("data-curentPage"));
    card_container.innerHTML = "";
    currentPage = startNo;
    if(currentPage != 1) {
        prevArrow.removeAttribute("style");
    } else {
        prevArrow.style.opacity = 0;
        prevArrow.style.pointerEvents = "none";
    }
     if(currentPage != 28) {
        nextArrow.removeAttribute("style");
    } else {
        nextArrow.style.opacity = 0;
        nextArrow.style.pointerEvents = "none";
    }
    if(startNo === 28) {
        card_container.append(createCard(startNo, wordings[startNo].ext, wordings[startNo].text));
    } else {
        card_container.append(createCard(startNo, wordings[startNo].ext, wordings[startNo].text));
        card_container.append(createCard(startNo + 1, wordings[startNo + 1].ext, wordings[startNo + 1].text));
        card_container.append(createCard(startNo + 2, wordings[startNo + 2].ext, wordings[startNo + 2].text));
    }
}

pagenation.forEach(page => {
    page.addEventListener("click", ()=>{
        pagenationF(page)
    })
})

prevArrow.addEventListener("click", function(){
    const el = document.querySelector(`[data-curentPage="${currentPage - 3}"]`);
    pagenationF(el);
})

nextArrow.addEventListener("click", function(){
    const el = document.querySelector(`[data-curentPage="${currentPage + 3}"]`);
    pagenationF(el)
})