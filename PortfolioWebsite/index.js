// For The automate welcome line

(function (){
    var TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
      };
      
      TxtRotate.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
      
        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
      
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
      
        var that = this;
        var delta = 200 - Math.random() * 100;
      
        if (this.isDeleting) { delta /= 2; }
      
        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 500;
        }
      
        setTimeout(function() {
          that.tick();
        }, delta);
      };
      
      window.onload = function() {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-rotate');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
      };
})();



// Go on top button

(function(){
    // Get the button
    let mybutton = document.getElementById("myBtn");
    
    // eventlistner
    
    mybutton.addEventListener("click", (event)=>{ 
      topFunction();
    })
    
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};
    
    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
    
    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
    })();
    

// menuShower

(function menuShower(){

  // fetching the elements
  const navigation = document.querySelector(".navigation");
  const trigger = document.querySelector(".hamburger");


  trigger.addEventListener("click", function(event){
    navigation.classList.toggle("hideMenuAndhide");
  })
  

})();



// Basic functions

(function(){
  let mybutton = document.querySelector(".arrows");
  const firstsection = document.querySelector(".mainSlider");
  let secSection = document.querySelector(".AboutMe");
  const thirdSection = document.querySelector(".contactMe");
  const followMecontainer = document.querySelector(".AccordionContainer");

  followMecontainer.addEventListener("click", function(event){
    window.location.href = event.target.dataset.link;
  });


  const [homeBtn, aboutBtn, contactBtn] = document.querySelectorAll(".navigation span");



  // eventlistner
  mybutton.addEventListener("click", (event)=>{ 
    secondSectionScroll();
  })

  aboutBtn.addEventListener("click", (event)=>{ 
    secondSectionScroll();
  })

  homeBtn.addEventListener("click", (event)=>{ 
    firstSectionScroll();
  })

  contactBtn.addEventListener("click", (event)=>{ 
    thirdSectionScroll();
  })


  
  // function to move
  function secondSectionScroll() {
    secSection.scrollIntoView({
      behavior: 'smooth'
    })
  }

  function thirdSectionScroll() {
    thirdSection.scrollIntoView({
      behavior: 'smooth'
    })
  }

  function firstSectionScroll() {
    firstsection.scrollIntoView({
      behavior: 'smooth'
    })
  }

})();
