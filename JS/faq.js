document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach((question) => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;

            if (answer.classList.contains("open")) {
                // Close FAQ
                answer.style.maxHeight = "0";
                answer.classList.remove("open");
            } else {
                // Open FAQ
                answer.style.maxHeight = answer.scrollHeight + "px"; // Dynamic height
                answer.classList.add("open");
            }
        });
    });
});
