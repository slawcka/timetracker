var dom = {
    animate: '.animate',
    input: '.input-name',
    triangle:'.triangle'
}
const input=document.querySelector(dom.input);
const triangle=document.querySelector(dom.triangle)
/* document.addEventListener('mouseover', whichClicked);
function whichClicked(e) {
    const el = e.target;
    el.matches(DOM.animate) && animate(dom.input,dom.animate);
} */

/* function animate(hoveredEl,animateEl){
    animateEl.toggle
} */

input.onmouseover = function() { 
    triangle.classList.toggle('entered')
}

input.onmouseout = function() { 
    triangle.classList.toggle('entered')
}