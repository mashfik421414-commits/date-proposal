// ======================================================
// Romantic Date Website ❤️
// script.js
// ======================================================



// ======================================================
// FLOATING HEARTS
// ======================================================

const heartsContainer = document.querySelector(".hearts");

if (heartsContainer) {

    function createHeart() {

        const heart = document.createElement("div");
        heart.className = "heart";

        const emojis = ["💖","💕","💗","💘","💝"];

        heart.innerHTML =
            emojis[Math.floor(Math.random() * emojis.length)];

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (18 + Math.random() * 20) + "px";
        heart.style.animationDuration =
            (5 + Math.random() * 4) + "s";

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 9000);

    }

    setInterval(createHeart, 300);

}



// ======================================================
// PAGE 1
// ======================================================

const yesBtn = document.getElementById("yesBtn");

if (yesBtn) {

    yesBtn.addEventListener("click", () => {

        window.location.href = "page3.html";

    });

}



// ======================================================
// MOVING NO BUTTON
// ======================================================

const noBtn = document.getElementById("noBtn");
const noContainer = document.getElementById("noContainer");

if (noBtn && noContainer) {

    const funnyTexts = [
        "No 💔",
        "Really? 🥺",
        "Think Again 😭",
        "Catch Me 😜",
        "Too Slow 😂",
        "Please ❤️",
        "Ice Cream? 🍦",
        "Pretty Please 🥹",
        "Never 😆"
    ];

    let current = 0;

    function moveButton() {

        current++;

        if (current >= funnyTexts.length)
            current = 0;

        noBtn.innerHTML = funnyTexts[current];

        const maxX =
            window.innerWidth -
            noContainer.offsetWidth - 30;

        const maxY =
            window.innerHeight -
            noContainer.offsetHeight - 30;

        noContainer.style.left =
            Math.random() * maxX + "px";

        noContainer.style.top =
            Math.random() * maxY + "px";

    }

    noBtn.addEventListener("mouseenter", moveButton);
    noBtn.addEventListener("touchstart", moveButton);

}



// ======================================================
// PAGE 5
// DATE + TIME
// ======================================================

const datePicker = document.getElementById("datePicker");
const timePicker = document.getElementById("timePicker");
const nextBtn = document.getElementById("nextBtn");

if (datePicker && timePicker && nextBtn) {

    // Prevent selecting past dates
    const today = new Date().toISOString().split("T")[0];
    datePicker.min = today;

    function checkInputs() {

        if (datePicker.value !== "" && timePicker.value !== "") {

            nextBtn.style.display = "inline-block";

        } else {

            nextBtn.style.display = "none";

        }

    }

    datePicker.addEventListener("input", checkInputs);
    timePicker.addEventListener("input", checkInputs);
    datePicker.addEventListener("change", checkInputs);
    timePicker.addEventListener("change", checkInputs);

    nextBtn.addEventListener("click", function () {

        localStorage.setItem("date", datePicker.value);
        localStorage.setItem("time", timePicker.value);

        console.log("Date Saved:", localStorage.getItem("date"));
        console.log("Time Saved:", localStorage.getItem("time"));

        window.location.href = "page6.html";

    });

}



// ======================================================
// PAGE 6
// FOOD SELECTION
// ======================================================

const foodCards = document.querySelectorAll(".foodCard");
const foodNext = document.getElementById("foodNext");

if (foodCards.length > 0) {

    foodCards.forEach(card => {

        card.addEventListener("click", () => {

            card.classList.toggle("selected");

            const selected =
                document.querySelectorAll(".foodCard.selected");

            if (selected.length > 0) {

                foodNext.style.display = "inline-block";

            } else {

                foodNext.style.display = "none";

            }

        });

    });

}

if (foodNext) {

    foodNext.addEventListener("click", () => {

        let foods = [];

        document
            .querySelectorAll(".foodCard.selected")
            .forEach(card => {

                foods.push(card.dataset.food);

            });

        localStorage.setItem(
            "foods",
            JSON.stringify(foods)
        );

        window.location.href = "page7.html";

    });

}



// ======================================================
// PAGE 7
// SHOW SUMMARY
// ======================================================

const selectedDate = document.getElementById("selectedDate");
const selectedTime = document.getElementById("selectedTime");
const selectedFoods = document.getElementById("selectedFoods");
const finishBtn = document.getElementById("finishBtn");

if (selectedDate && selectedTime && selectedFoods) {

    const savedDate = localStorage.getItem("date");
    const savedTime = localStorage.getItem("time");
    const foods = JSON.parse(localStorage.getItem("foods")) || [];

    console.log("Saved Date =", savedDate);
    console.log("Saved Time =", savedTime);

    selectedDate.textContent = savedDate || "Not Selected";
    selectedTime.textContent = savedTime || "Not Selected";

    selectedFoods.innerHTML = "";

    foods.forEach(food => {

        let emoji = "🍽️";

        switch(food){

            case "Pizza": emoji="🍕"; break;
            case "Burger": emoji="🍔"; break;
            case "Pasta": emoji="🍝"; break;
            case "Momo": emoji="🥟"; break;
            case "Ice Cream": emoji="🍦"; break;
            case "Chocolate": emoji="🍫"; break;
            case "Coffee": emoji="☕"; break;
            case "Fries": emoji="🍟"; break;

        }

        selectedFoods.innerHTML += `<p>${emoji} ${food}</p>`;

    });

    fetch("https://script.google.com/macros/s/AKfycbwCB4vKj6QiToLGSHAOLK_FaOYT5DepHAmMiO1AtIqwWqqi1cahf2DqfE8JTZNXIrqRiw/exec",{

        method:"POST",

        body:JSON.stringify({

            date:savedDate,
            time:savedTime,
            foods:foods.join(", ")

        })

    });

}


// ======================================================
// PLAN ANOTHER DATE BUTTON
// ======================================================

if (finishBtn) {

    finishBtn.addEventListener("click", () => {

        localStorage.clear();

        window.location.href = "page5.html";

    });

}
