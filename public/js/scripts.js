// Custom JavaScript - Form handling can be added here
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    alert(`Thanks! We'll notify you at ${email} when we launch.`);
    document.getElementById('contactForm').reset();
});
