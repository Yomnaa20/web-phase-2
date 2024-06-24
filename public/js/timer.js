function countdown() {
    const endTime = new Date();
    endTime.setMonth(endTime.getMonth() + 2);

    const timer = setInterval(function () {
        const now = new Date().getTime();
        const distance = endTime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML = "Sale ends in: " + days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "Sale has ended";
        }
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    countdown();
});
document.addEventListener('DOMContentLoaded', function() {
    var addToCartBtn = document.querySelector('.addToCartBtn');
    var message = document.getElementById('message');

    addToCartBtn.addEventListener('click', function() {
        message.style.display = 'block'; // Display the message
        setTimeout(function() {
            message.style.display = 'none'; // Hide the message after a delay
        }, 2000); // Adjust the delay (in milliseconds) as needed
    });
});