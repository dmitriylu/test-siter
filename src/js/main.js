
// ===========Smmoth Scroll==========

function smoothScroll() {
    const anchors = document.querySelectorAll('a.scroll-to');
    
    for (let anchor of anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        
        const blockID = anchor.getAttribute('href')
        
        document.querySelector(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    }
}
smoothScroll();

// ====Hide scroll Top========

function hideScrollTop() {
    const scrollTop = document.querySelector('.top');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset < 399) {
            scrollTop.style.opacity = 0;
            scrollTop.style.transition = 'ease 1s';
        } else if (window.pageYOffset >= 400) {
            scrollTop.style.opacity = 10;
            scrollTop.style.transition = 'ease 0.5s';
        }
    })
}

hideScrollTop();

// =====Click burger=======

const burger = document.querySelector('.burger'),
nav = document.querySelector('.nav'),
navItem = document.querySelectorAll('.menu__item');

burger.addEventListener('click', (e) => {    
    nav.classList.toggle('show');
    burger.classList.toggle('toggle');
    document.querySelector('body').classList.toggle('lock');
    navItem.forEach(function(item) {
        item.addEventListener('click',(event) => {
            nav.classList.remove('show');
            burger.classList.remove('toggle');
            document.querySelector('body').classList.remove('lock');
        })
    })
    return burger;
});

//========= Active menu item =============

window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;

	if (window.innerWidth > 768) {
		document.querySelectorAll('.section').forEach((el, i) => {
			if (el.offsetTop - document.querySelector('.nav').clientHeight <= scrollDistance) {
				document.querySelectorAll('.nav a').forEach((el) => {
					if (el.classList.contains('active')) {
						el.classList.remove('active');
					}
				});

				document.querySelectorAll('.nav li')[i].querySelector('a').classList.add('active');
			}
		});
	}
});



// =======Scroll Menu======
window.addEventListener('scroll', function() {
    const scrollNav = document.querySelector('.nav');
    if(window.pageYOffset >= 200) {
        scrollNav.classList.add('red');
    }else if(window.pageYOffset <= 199) {
        scrollNav.classList.remove('red');
    }
  });