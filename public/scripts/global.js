class StickyHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.header = document.querySelector('.section-header');
        this.headerBounds = {};

        this.setHeaderHeight();

        window.matchMedia('(max-width: 990px)').addEventListener('change', this.setHeaderHeight.bind(this));

        this.currentScrollTop = 0;
        this.preventReveal = false;
        this.predictiveSearch = this.querySelector('predictive-search');

        this.onScrollHandler = this.onScroll.bind(this);
        this.hideHeaderOnScrollUp = () => this.preventReveal = true;

        this.addEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
        window.addEventListener('scroll', this.onScrollHandler, false);

        this.createObserver();
    }

    setHeaderHeight() {
        document.documentElement.style.setProperty('--header-height', `${this.header.offsetHeight}px`);
    }

    disconnectedCallback() {
        this.removeEventListener('preventHeaderReveal', this.hideHeaderOnScrollUp);
        window.removeEventListener('scroll', this.onScrollHandler);
    }

    createObserver() {
        let observer = new IntersectionObserver((entries, observer) => {
            this.headerBounds = entries[0].intersectionRect;
            observer.disconnect();
        });

        observer.observe(this.header);
    }

    onScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
            this.header.classList.add('scrolled-past-header');
            if (this.preventHide) return;
            requestAnimationFrame(this.hide.bind(this));
        } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
            this.header.classList.add('scrolled-past-header');
            if (!this.preventReveal) {
                requestAnimationFrame(this.reveal.bind(this));
            } else {
                window.clearTimeout(this.isScrolling);

                this.isScrolling = setTimeout(() => {
                    this.preventReveal = false;
                }, 66);

                requestAnimationFrame(this.hide.bind(this));
            }
        } else if (scrollTop <= this.headerBounds.top) {
            this.header.classList.remove('scrolled-past-header');
            requestAnimationFrame(this.reset.bind(this));
        }

        this.currentScrollTop = scrollTop;
    }

    hide() {
        if (this.headerIsAlwaysSticky) return;
        this.header.classList.add('section-header-hidden', 'section-header-sticky');
        this.closeMenuDisclosure();
    }

    reveal() {
        if (this.headerIsAlwaysSticky) return;
        this.header.classList.add('section-header-sticky', 'animate');
        this.header.classList.remove('section-header-hidden');
    }

    reset() {
        if (this.headerIsAlwaysSticky) return;
        this.header.classList.remove('section-header-hidden', 'section-header-sticky', 'animate');
    }

    closeMenuDisclosure() {
        this.disclosures = this.disclosures || this.header.querySelectorAll('header-menu');
        this.disclosures.forEach(disclosure => disclosure.close());
    }
}

customElements.define('sticky-header', StickyHeader);

class TextSwitcher extends HTMLElement {
    constructor() {
        super();
        this.items = this.querySelectorAll('.banner-content__heading--animate-item');
        this.currentIndex = 0;
    }

    connectedCallback() {
        this.startSwitching();
    }

    startSwitching() {
        this.showCurrentItem();
        this.interval = setInterval(this.switchItem.bind(this), 3000);
    }

    showCurrentItem() {
        const currentItem = this.items[this.currentIndex];
        const parts = currentItem.querySelectorAll('.animate-item__part');

        let partIndex = 0;

        const showNextPart = () => {
            if (partIndex < parts.length) {
                parts[partIndex].classList.add('active');
                partIndex++;
                setTimeout(showNextPart, 500); 
            }
        };

        showNextPart();

        currentItem.classList.add('active');
    }

    switchItem() {
        const currentItem = this.items[this.currentIndex];
        currentItem.classList.remove('active');
        currentItem.classList.add('exiting');

        const parts = currentItem.querySelectorAll('.animate-item__part');
        parts.forEach(part => part.classList.remove('active'));

        this.currentIndex = (this.currentIndex + 1) % this.items.length;

        setTimeout(() => {
            currentItem.classList.remove('exiting');
            this.showCurrentItem(); 
        }, 1000);
    }

    disconnectedCallback() {
        clearInterval(this.interval);
    }
}

customElements.define('text-switcher', TextSwitcher);


class MegaMenuOpener extends HTMLElement {
    connectedCallback() {
      this.addEventListener('click', this.toggleMenu.bind(this));
      this.updateWindowHeight();
      window.addEventListener('resize', this.updateWindowHeight);
  
      document.addEventListener('click', this.handleDocumentClick.bind(this));
    }
  
    toggleMenu() {
      const customHeader = this.closest('sticky-header');
      if (customHeader) {
        customHeader.classList.toggle('header-wrapper--expanded');
      }
  
      document.documentElement.classList.toggle('no-scroll');
      this.updateWindowHeight();
    }
  
    updateWindowHeight() {
      const viewportHeight = window.innerHeight;
      document.documentElement.style.setProperty('--window-height', `${viewportHeight}px`);
    }
  
    handleDocumentClick(event) {
      const customHeader = document.querySelector('sticky-header');
  
      if (customHeader && customHeader.classList.contains('header--expanded')) {
        const isClickInsideHeader = customHeader.contains(event.target);
        if (!isClickInsideHeader) {
          customHeader.classList.remove('header-wrapper--expanded');
          document.documentElement.classList.remove('no-scroll');
        }
      }
    }
  
    disconnectedCallback() {
      window.removeEventListener('resize', this.updateWindowHeight);
      document.removeEventListener('click', this.handleDocumentClick.bind(this));
    }
  }
  
  customElements.define('mega-menu-opener', MegaMenuOpener);
