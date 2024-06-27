import { Reeller, ScrollerPlugin } from 'reeller';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper } from 'swiper';

// Register ScrollTrigger with gsap
gsap.registerPlugin(ScrollTrigger);

// Create shorthands
var Sc = ScrollTrigger;
var Qe = gsap;

Reeller.registerGSAP(gsap);
Reeller.use(ScrollerPlugin);

(() => {
    
     
    document.addEventListener("DOMContentLoaded", function () {
    
      const reels = document.querySelectorAll('.lg-reel');
      const evenReels = Array.from(reels).filter((_, index) => index % 2 === 0);
 
     // Filter for odd indexed reels
     const oddReels = Array.from(reels).filter((_, index) => index % 2 !== 0);
 
      evenReels.forEach((reel) => {
         
 
         const reeller = new Reeller({
             container: reel,
             wrapper: '.lg-reel-wrap',
             itemSelector: '.lg-reel-item',
             speed: 55,
             plugins: {
                 scroller: {
                     speed: 1,
                     multiplier: 0.2,
                     threshold: 1,
                 },
             },
         });
      })
     
      oddReels.forEach((reel) => {
         
 
         const reeller = new Reeller({
             container: reel,
             wrapper: '.lg-reel-wrap',
             itemSelector: '.lg-reel-item',
             speed: 50,
             plugins: {
                 scroller: {
                     speed: 1,
                     multiplier: 0.15,
                     threshold: 1,
                     reversed: true,
                 },
             },
         });
      })
 
     document.querySelectorAll(".lg-coach-accent-img").forEach((e) =>  {
 
         let t = Qe.timeline();
     
     
         t.from(e, {
             yPercent: -50,
         }),
         Sc.create({
             trigger: e,
             start: "top bottom",
             end: "bottom top",
             animation: t, 
             scrub: 1, 
         });
     
     
     });
 
     document.querySelectorAll(".lg-comp").forEach((e) => {
         let t = Qe.timeline();
         let els = e.querySelectorAll('img');
         
         
         els.forEach((el) => {
             
             
             t.fromTo(el, {
                 yPercent: -20,
             }, {
                 yPercent: 20,
                 stagger: { amount: 0.1, from: "random" }
             }, 0);  
         });
     
         Sc.create({
             trigger: e,
             start: "top bottom",
             end: "bottom center",
             animation: t,
             scrub: .3,
         });
     });
 
     document.querySelectorAll(".lg-phone").forEach((e) => {
         let t = Qe.timeline();
         
         t.fromTo(e, {
             yPercent: -40,
         }, {
             yPercent: 0,
         }, 0);  
     
         Sc.create({
             trigger: e,
             start: "top bottom",
             end: "bottom center",
             animation: t,
             scrub: 1,
         });
     });
 
      let groups = gsap.utils.toArray(".faq-menu");
      let menus = gsap.utils.toArray(".faq-item");
      let menuToggles = [];
      let activeMenu = null; // Keep track of the active menu
      
      menus.forEach((menu, index) => {
        let animation = createAnimation(menu);
        menuToggles.push(animation);
      
        menu.addEventListener("click", () => toggleMenu(animation));
      
        // Open the first menu by default
        if (index === 0) {
          animation.play();
          activeMenu = animation;
        }
      });
      
      function toggleMenu(animation) {
        if (activeMenu !== animation) {
          if (activeMenu) {
            activeMenu.reverse(); // Close the previously open menu
          }
          animation.play(); // Open the clicked menu
          activeMenu = animation;
        } else {
          animation.reverse(); // Close the clicked menu
          activeMenu = null;
        }
      }
      
      function createAnimation(menu) {
        let element = menu.parentElement;
        let box = element.querySelector(".answer");
        let plusSign = element.querySelector(".plus");
        let cardBack = element.querySelector(".faq-item");
        let questionText = element.querySelector(".question");
      
        gsap.set(box, { height: "auto" });
        gsap.set(questionText, { marginLeft: "0vw" });
      
        let timeline = gsap
          .timeline({ paused: true })
          .from(box, {
            height: 0,
            duration: 0.5,
            ease: "power1.inOut",
          })
          .from(
            questionText,
            {
              marginLeft: 0,
              duration: 0.5,
              ease: "power4.inOut",
            },
            "<"
          )
          .to(
            plusSign,
            {
              rotate: "45deg",
              duration: 0.1,
              ease: "power1.inOut",
            },
            "<"
          )
          .reverse();
      
        return timeline;
      }
    
      // Function to initialize Swiper
function initializeSwiper() {
  const marquee = document.querySelectorAll(".lg-marquee");
  
  marquee.forEach((e) => {
    const items = e.querySelector(".lg-marquee-items"),
      item = e.querySelectorAll(".lg-marquee-item");

    e.classList.add("swiper-container");
    items.classList.add("swiper-wrapper");
    item.forEach((e) => e.classList.add("swiper-slide"));

    // const arrowPrev = document.createElement("div");
    // arrowPrev.classList.add("lg-swipe-button", "button-prev");
    // e.appendChild(arrowPrev);

    // // Append the swiper-arrow button-next using JavaScript
    // const arrowNext = document.createElement("div");
    // arrowNext.classList.add("lg-swipe-button", "button-next");
    // e.appendChild(arrowNext);

    const slider = new Swiper(e, {
      slidesPerView: "auto",
      loop: false,
      // Adding navigation options
      navigation: {
        nextEl: ".lg-swipe-button.next", // Specify the class for the next button
        prevEl: ".lg-swipe-buotton.back",
        disabledClass: 'disabled' // Specify the class for the previous button
      },
      // breakpoints: {
      //   // When the window width is >= 576px
      //   576: {
      //     slidesPerView: 1,
      //     spaceBetween: 20, // 1.5rem in pixels
      //   },
      //   // When the window width is >= 768px
      //   768: {
      //     slidesPerView: 1,
      //     spaceBetween: 32, // 2rem in pixels
      //   },
        
      // },
    });
  });
}

// Check if the window width is less than 991px
if (window.innerWidth < 991) {
  initializeSwiper();
}

// Optional: Re-check on window resize
window.addEventListener('resize', () => {
  if (window.innerWidth < 991) {
    initializeSwiper();
  }
});


      // end
    });
})();


  
  


