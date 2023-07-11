const backToTopBtn = document.querySelector("#back-to-top");

window.addEventListener("scroll", ()=>{

    const scrollTop = window.pageYOffset || document.documentElement.scrollTo;

    if(scrollTop > 500){
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }

})
 
backToTopBtn.addEventListener("click", e => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"

    })
})