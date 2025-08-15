const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".num span");

const links = document.querySelectorAll(".links");

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

const filterBtns = document.querySelectorAll(".port-link");

const navMenu = document.getElementById('navMenu');
const navLink = document.querySelector(".nav-links");

if (navMenu && navLink){
    navMenu.addEventListener('click', () => {
    navLink.classList.toggle('show');
});
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLink.classList.remove('show');

        const targetID =link.getAttribute("href").slice(1);
        const targetSection = document.getElementById(targetID);
        if(targetSection){
            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        }

        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop -150;
        const sectionHeight = section.offsetHeight;

        if(scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

filterBtns.forEach(button => {
    button.addEventListener("click", () => {
        filterBtns.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        
        const filterValue = button.getAttribute("data-filter");
        const cards = document.querySelectorAll(".port-card");

        cards.forEach(card => {
            if (filterValue === "all" || card.classList.contains(filterValue)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }); 
});

function hasReached(el){
    const top = el.getBoundingClientRect().top;
    return window.innerHeight >= top + el.clientHeight / 2;
}

function updateCount(num, maxNum){
    let currentNum = +num.innerText;
    if(currentNum < maxNum){
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 25);
    }
}

let mlPlayed = false;

function mlCounter(){
    if (mlPlayed)
        return;
    if(!hasReached(ml_section)) 
        return;

    mlPlayed = true;
    ml_counters.forEach((ctr) => {
        let target = +ctr.dataset.target;
        setTimeout(() => {
            updateCount(ctr, target);
        }, 400);
    });
}

window.addEventListener("scroll", mlCounter);