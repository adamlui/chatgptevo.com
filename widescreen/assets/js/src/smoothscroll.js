/* Add smooth scroll */

smoothScroll(document, 155, 12);

function smoothScroll(target, speed, smooth) {

    // Init target
    if (target === document)
        target = (document.scrollingElement 
              || document.documentElement 
              || document.body.parentNode 
              || document.body); // cross browser support for document scrolling

    // Init variables
    let moving = false, pos = target.scrollTop;
    const frame = target === document.body && document.documentElement 
                      ? document.documentElement 
                      : target; // safari
    // Add listeners
    target.addEventListener('mousewheel', scrolled, { passive: false });
    target.addEventListener('DOMMouseScroll', scrolled, { passive: false });

    function scrolled(e) {
        e.preventDefault(); // disable default scrolling
        const delta = normalizeWheelDelta(e);
        pos += -delta * speed;
        pos = ( // limit scrolling
            Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)));
        if (!moving) update();
    }

    function normalizeWheelDelta(e) {
        if (e.detail) {
            if (e.wheelDelta)
                return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1); // Opera
            else return -e.detail/3; // Firefox
        } else return e.wheelDelta/120; // IE/Safari/Chrome
    }

    function update() {
        moving = true;    
        const delta = (pos - target.scrollTop) / smooth;    
        target.scrollTop += delta;
        if (Math.abs(delta) > 0.5) requestFrame(update);
        else moving = false;
    }

    const requestFrame = function() { // requestAnimationFrame cross browser
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(func) { window.setTimeout(func, 1000 / 50); }
        );
    }();
}