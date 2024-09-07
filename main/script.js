const accesskey = process.env.ACCESS_KEY;

// navbar
document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector('[data-collapse-toggle="navbar-default"]');
    const navbar = document.getElementById('navbar-default');
    const navLinks = navbar.querySelectorAll('a');

    button.addEventListener('click', function () {
        navbar.classList.toggle('hidden');
    });

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navbar.classList.add('hidden');
            navLinks.forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');
        });
    });
});

const roles = ["MERN Stack Developer", "Frontend Developer", "Backend Developer"];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const roleElement = document.getElementById('role');
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenRoles = 1000;

function type() {
    const currentRole = roles[index];
    if (isDeleting) {
        roleElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % roles.length;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(type, deletingSpeed);
        }
    } else {
        roleElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(type, delayBetweenRoles);
        } else {
            setTimeout(type, typingSpeed);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    type();
});

// back to top
const topPointer = document.querySelector('.top-pointer');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        topPointer.style.display = 'block';
    } else {
        topPointer.style.display = 'none';
    }
});

topPointer.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// skill
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for (let i = 0; i < marqueeElementsDisplayed; i++) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}

// form submition
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-green-500");
            } else {
                console.log(response);
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-red-500");
            }
        })
        .catch((error) => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});