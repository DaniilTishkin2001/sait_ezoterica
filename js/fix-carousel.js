// Fix carousel buttons
document.addEventListener('DOMContentLoaded', () => {
    // Remove onclick attributes from carousel buttons
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    
    if (prevBtn) {
        prevBtn.removeAttribute('onclick');
        console.log('Removed onclick from prev button');
    }
    
    if (nextBtn) {
        nextBtn.removeAttribute('onclick');
        console.log('Removed onclick from next button');
    }
});
