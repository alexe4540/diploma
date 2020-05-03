const modal = document.querySelector('#loginModal');
const closeX = document.querySelector('#closeX');

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

closeX.addEventListener('click', () => {
    modal.style.display = 'none';
});

