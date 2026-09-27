document.addEventListener("DOMContentLoaded", function () {


    // ==================================================
    // 1. APPOINTMENT FORM + FORMSPREE
    // ==================================================

    const form = document.querySelector("#contact form");

    const nameInput = document.querySelector("#name");

    const phoneInput = document.querySelector("#phone");

    const serviceInput = document.querySelector("#contact select");

    const dateInput = document.querySelector("#date");

    const messageInput = document.querySelector("#message");


    form.addEventListener("submit", async function (event) {

        event.preventDefault();


        // =========================
        // GET FORM VALUES
        // =========================

        const name = nameInput.value.trim();

        const phone = phoneInput.value.trim();

        const service = serviceInput.value;

        const date = dateInput.value;

        const message = messageInput.value.trim();


        // =========================
        // NAME VALIDATION
        // =========================

        if (name === "") {

            alert("Please enter your name.");

            nameInput.focus();

            return;

        }


        // =========================
        // PHONE VALIDATION
        // =========================

        const phonePattern = /^[0-9]{10}$/;

        if (!phonePattern.test(phone)) {

            alert("Please enter a valid 10-digit phone number.");

            phoneInput.focus();

            return;

        }


        // =========================
        // SERVICE VALIDATION
        // =========================

        if (service === "") {

            alert("Please select a service.");

            serviceInput.focus();

            return;

        }


        // =========================
        // DATE VALIDATION
        // =========================

        if (date === "") {

            alert("Please select your preferred date.");

            dateInput.focus();

            return;

        }


        const today = new Date();

        today.setHours(0, 0, 0, 0);


        const selectedDate = new Date(date);


        if (selectedDate < today) {

            alert("Please select a future date.");

            dateInput.focus();

            return;

        }


        // =========================
        // MESSAGE VALIDATION
        // =========================

        if (message === "") {

            alert("Please enter your requirement.");

            messageInput.focus();

            return;

        }


        // =========================
        // SEND TO FORMSPREE
        // =========================

        const formData = new FormData(form);


        try {

            const response = await fetch(
                "https://formspree.io/f/moevkgvv",
                {
                    method: "POST",

                    body: formData,

                    headers: {
                        Accept: "application/json"
                    }
                }
            );


            // =========================
            // SUCCESS
            // =========================

            if (response.ok) {

                const successMessage =
                    document.createElement("p");


                successMessage.textContent =
                    "Your appointment request has been sent successfully!";


                successMessage.style.color =
                    "#d4af37";


                successMessage.style.fontWeight =
                    "bold";


                successMessage.style.marginTop =
                    "15px";


                form.appendChild(successMessage);


                form.reset();


                setTimeout(function () {

                    successMessage.remove();

                }, 5000);


            } else {

                alert(
                    "Something went wrong. Please try again."
                );

            }


        } catch (error) {

            alert(
                "Unable to send the appointment. Please check your internet connection and try again."
            );

        }

    });



    // ==================================================
    // 2. GALLERY LIGHTBOX
    // ==================================================

    const galleryImages =
        document.querySelectorAll(".gallery-item img");


    galleryImages.forEach(function (image) {

        image.style.cursor = "pointer";


        image.addEventListener("click", function () {


            const overlay =
                document.createElement("div");


            overlay.style.position = "fixed";

            overlay.style.top = "0";

            overlay.style.left = "0";

            overlay.style.width = "100%";

            overlay.style.height = "100%";

            overlay.style.background =
                "rgba(0, 0, 0, 0.85)";

            overlay.style.display = "flex";

            overlay.style.alignItems = "center";

            overlay.style.justifyContent = "center";

            overlay.style.zIndex = "9999";

            overlay.style.padding = "20px";


            const largeImage =
                document.createElement("img");


            largeImage.src = image.src;

            largeImage.alt = image.alt;


            largeImage.style.maxWidth = "90%";

            largeImage.style.maxHeight = "85%";

            largeImage.style.objectFit = "contain";

            largeImage.style.border =
                "3px solid #d4af37";

            largeImage.style.borderRadius = "8px";


            const closeButton =
                document.createElement("button");


            closeButton.textContent = "×";


            closeButton.style.position =
                "absolute";

            closeButton.style.top = "20px";

            closeButton.style.right = "30px";

            closeButton.style.background = "none";

            closeButton.style.border = "none";

            closeButton.style.color = "#d4af37";

            closeButton.style.fontSize = "45px";

            closeButton.style.cursor = "pointer";


            overlay.appendChild(largeImage);

            overlay.appendChild(closeButton);

            document.body.appendChild(overlay);


            closeButton.addEventListener(
                "click",
                function () {

                    overlay.remove();

                }
            );


            overlay.addEventListener(
                "click",
                function (event) {

                    if (event.target === overlay) {

                        overlay.remove();

                    }

                }
            );


            function closeWithEscape(event) {

                if (event.key === "Escape") {

                    overlay.remove();

                    document.removeEventListener(
                        "keydown",
                        closeWithEscape
                    );

                }

            }


            document.addEventListener(
                "keydown",
                closeWithEscape
            );

        });

    });



    // ==================================================
    // 3. BACK TO TOP BUTTON
    // ==================================================

    const topButton =
        document.createElement("button");


    topButton.textContent = "↑";

    topButton.id = "topBtn";


    topButton.style.position = "fixed";

    topButton.style.bottom = "25px";

    topButton.style.right = "25px";

    topButton.style.width = "50px";

    topButton.style.height = "50px";

    topButton.style.background = "#d4af37";

    topButton.style.color = "#17120d";

    topButton.style.border = "none";

    topButton.style.borderRadius = "50%";

    topButton.style.fontSize = "25px";

    topButton.style.fontWeight = "bold";

    topButton.style.cursor = "pointer";

    topButton.style.display = "none";

    topButton.style.zIndex = "1000";


    document.body.appendChild(topButton);


    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            topButton.style.display = "block";

        } else {

            topButton.style.display = "none";

        }

    });


    topButton.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });



    // ==================================================
    // 4. MOBILE HAMBURGER MENU
    // ==================================================

    const nav = document.querySelector("nav");

    const navList = document.querySelector("nav ul");


    const menuButton =
        document.createElement("button");


    menuButton.textContent = "☰";


    menuButton.style.background = "none";

    menuButton.style.border = "none";

    menuButton.style.color = "#d4af37";

    menuButton.style.fontSize = "28px";

    menuButton.style.cursor = "pointer";

    menuButton.style.display = "none";


    nav.appendChild(menuButton);


    function checkScreen() {

        if (window.innerWidth <= 768) {

            menuButton.style.display = "block";

            navList.style.display = "none";

            menuButton.textContent = "☰";

        } else {

            menuButton.style.display = "none";

            navList.style.display = "flex";

        }

    }


    checkScreen();


    window.addEventListener(
        "resize",
        checkScreen
    );


    menuButton.addEventListener(
        "click",
        function () {

            if (navList.style.display === "none") {

                navList.style.display = "flex";

                menuButton.textContent = "✕";

            } else {

                navList.style.display = "none";

                menuButton.textContent = "☰";

            }

        }
    );


    const menuLinks =
        document.querySelectorAll("nav ul a");


    menuLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (window.innerWidth <= 768) {

                    navList.style.display = "none";

                    menuButton.textContent = "☰";

                }

            }
        );

    });



    // ==================================================
    // 5. SCROLL REVEAL ANIMATION
    // ==================================================

    const revealElements =
        document.querySelectorAll(
            "section, .service-card, .gallery-item"
        );


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        observer.observe(element);

    });



    // ==================================================
    // 6. DARK / LIGHT THEME
    // ==================================================

    const themeButton =
        document.querySelector("#themeBtn");


    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "light") {

        document.body.classList.add("light-theme");

        themeButton.textContent = "🌙";

    }


    themeButton.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "light-theme"
            );


            if (
                document.body.classList.contains(
                    "light-theme"
                )
            ) {

                themeButton.textContent = "🌙";

                localStorage.setItem(
                    "theme",
                    "light"
                );

            } else {

                themeButton.textContent = "☀️";

                localStorage.setItem(
                    "theme",
                    "dark"
                );

            }

        }
    );



});