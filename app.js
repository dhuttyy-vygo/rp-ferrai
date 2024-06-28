import { Reeller, ScrollerPlugin } from 'reeller';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper } from 'swiper';
import SplitType from 'split-type';

// Register ScrollTrigger with gsap
gsap.registerPlugin(ScrollTrigger);

// Create shorthands
var Sc = ScrollTrigger;
var Qe = gsap;

Reeller.registerGSAP(gsap);
Reeller.use(ScrollerPlugin);

(() => {
var textToSplit = function () {
    const el = document.querySelectorAll('[data-split="true"]');

     el.forEach((text) => {

      new SplitType(text, { types: "words", wordClass: "wordsin"});
     });

     const textInline = document.querySelectorAll('[data-split="word"]');
     textInline.forEach((words) => {
        new SplitType(words, { types:"words", wordClass: "words-card"});
      });
  };

  var preLoad = function (){
    // prealoading animation //
    const logo = document.querySelector(".fr-logo-preload"),
    backdrop = document.querySelector(".fr-preloader"),
    title = document.querySelectorAll(".wordsin");
    
    
    var tl = Qe.timeline();

    tl.set(logo, {autoAlpha: 0});
    tl.to(logo, {autoAlpha: 1, duration: 1.2, ease: "power2.out"}, .5);
    tl.to(logo, {autoAlpha: 0, duration: 1.2, ease: "power4.out"}, 1.7);
    tl.to(backdrop, {autoAlpha: 0, duration: 2, ease: "power2.out"}, 2.5);
    tl.from(title, {yPercent: 100, duration: 1, ease: "power2.out", stagger: {amount: 1}}, 3);

  };

  
     
document.addEventListener("DOMContentLoaded", function () {

  $("#play").on("click", function () {
    let videoPop = $("[video-modal]");
    gsap.to(videoPop, {
      autoAlpha: 1,
      duration: 0.7,
      ease: "power1.easeInOut",
    });
  });

  $("#pause").on("click", function () {
    let videoPop = $("[video-modal]");
    gsap.to(videoPop, {
      autoAlpha: 0,
      duration: 0.3,
      ease: "power1.easeInOut",
    });
  });

 

  let e = document.getElementById("player"),
    t = document.getElementById("play"),
    o = $("[video-modal]"),
    a = document.getElementById("pause");
  t.addEventListener("click", function () {
    e.play();
  }),
    a.addEventListener("click", function () {
      e.pause(), (e.currentTime = 0);
    }),
    e.addEventListener("webkitendfullscreen", function () {
      e.pause(),
        (e.currentTime = 0),
        gsap.to(o, {
          autoAlpha: 0,
          duration: 0.3,
          ease: "power1.easeInOut",
        });
    });
    
     textToSplit(),preLoad(),initializeSwiper();

     

     setTimeout(() => {
      $("[data-animate-in]").each(function (index) {
        let textEl = $(this).find('[data-split="line"]');
        let btn = $(this).find("a");
        gsap.set(textEl, { autoAlpha: 1, willChange: "transform" });
        let textContent = $(this).text();
        let tl;
  
        function splitText() {
          new SplitType(textEl, { types: "words", tagName: "span" });
          textEl.find(".word").each(function (index) {
            let lineContent = $(this).html();
            $(this).html("");
            $(this).append(
              `<span class="line-inner" style="display: block;">${lineContent}</span>`
            );
          });
          tl = gsap.timeline({
            scrollTrigger: {
              trigger: textEl,
              start: "top bottom",
              end: "bottom bottom",
              toggleActions: "play none none none",
            },
          });
          tl.fromTo(
            textEl.find(".line-inner"),
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.7,
              stagger: { amount: 0.3, ease: "power4.out" },
            }
          );
          tl.fromTo(
            btn,
            { yPercent: 100, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.7,
              stagger: { amount: 0.3, ease: "power4.out" },
            },
            0.3
          );
        }
        splitText();
  
        let windowWidth = window.innerWidth;
        window.addEventListener("resize", function () {
          if (windowWidth !== window.innerWidth) {
            windowWidth = window.innerWidth;
            tl.kill();
            textEl.text(textContent);
            splitText();
          }
        });
      });
    }, 700);


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
 
 
     document.querySelectorAll(".fr-flex-img").forEach((e) => {
         let t = Qe.timeline();
         let els = e.querySelectorAll('.fr-img-cont');
         let tr = e.querySelectorAll(".words-card");
         
                         
             t.to(els, {
                 clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
                 ease: "power4.out",
                 duration: 2,
                 stagger: { amount: .5}
             }, 0);
             t.from(tr, {
              yPercent: 100,
              duration: 1.5,
              ease: "Power4.out",
              stagger: { amount: .3}
             }, .4); 
         
     
         Sc.create({
             trigger: e,
             start: "top 95%",
             end: "bottom center",
             animation: t,
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
  const marquee = document.querySelectorAll(".fr-marquee");
  
  marquee.forEach((e) => {
    const items = e.querySelector(".fr-marquee-items"),
      item = e.querySelectorAll(".fr-marquee-item");

    e.classList.add("swiper-container");
    items.classList.add("swiper-wrapper");
    item.forEach((e) => e.classList.add("swiper-slide"));

    const slider = new Swiper(e, {
      
      effect: "fade",
      // Adding navigation options
      navigation: {
        nextEl: ".fr-swipe-button.next", // Specify the class for the next button
        prevEl: ".fr-swipe-buotton.back",
        disabledClass: 'disabled' // Specify the class for the previous button
      },
      
    });
  });
    }
  });

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
})();


  
  
