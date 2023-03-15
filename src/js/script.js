import './data/capacity';
import './data/crane-types';
import './data/lease-types';
import './data/crane-heights';
import './data/lift-heights';
import './data/content';
import './filter';

window.scrollToReveal = function () {
    return {
        sticky: false,
        lastPos: window.scrollY + 0,
        scroll() {
            this.sticky = window.scrollY > this.$refs.navbar.offsetHeight && this.lastPos > window.scrollY;
            this.lastPos = window.scrollY;
        }
    }
}