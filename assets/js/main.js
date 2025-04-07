// Сохраняем позицию скролла перед обновлением страницы
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('scrollPosition', window.scrollY);
});

// Восстанавливаем позицию после загрузки страницы
window.addEventListener('load', () => {
  const scrollPosition = sessionStorage.getItem('scrollPosition');
  if (scrollPosition) {
    window.scrollTo(0, parseInt(scrollPosition));
    sessionStorage.removeItem('scrollPosition');
  }
});

// Отключаем автоматическое восстановление скролла
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Массив продуктов (пример)
const products = [
  {
    target: "pe150",
    title: "Геотекстиль нетканый Интатекс 150",
    image: "assets/img/products/150.png",
    alt: "Геотекстиль Интатекс 150",
    description: "Геотекстиль Интатекс 150 — это высококачественное синтетическое полотно от казахстанского бренда «Интаго Казахстан», изготовленное из 100% полимерных волокон. Он применяется в строительстве, дорожных работах, дренажных системах, сельском хозяйстве и ландшафтном дизайне. Надёжность, доступность и соответствие международным стандартам делают его идеальным решением для любых задач!",
    specs: {
      density: "150",
      breakingLoad: { length: "4", width: "4" },
      elongation: { length: "120", width: "130" },
      filtration: "90",
      thickness: "1,1",
      rollWidth: "1-6",
      rollLength: "50-100"
    }
  },
  {
    target: "pe200",
    title: "Геотекстиль нетканый Интатекс 200",
    image: "assets/img/products/200.png",
    alt: "Геотекстиль Интатекс 200",
    description: "Геотекстиль Интатекс 200 — это высококачественное синтетическое полотно от казахстанского бренда «Интаго Казахстан», изготовленное из 100% полимерных волокон. Он применяется в строительстве, дорожных работах, дренажных системах, сельском хозяйстве и ландшафтном дизайне.",
    specs: {
      density: "200",
      breakingLoad: { length: "5,5", width: "5,5" },
      elongation: { length: "120", width: "130" },
      filtration: "85",
      thickness: "1,4",
      rollWidth: "1-6",
      rollLength: "50-100"
    }
  }
  // Добавьте остальные продукты аналогичным образом
];

// Функция отрисовки продуктов – структура как у вас:
function renderProducts() {
  const container = document.querySelector('.products-grid');
  if (!container) return;
  
  let html = "";
  products.forEach(product => {
    html += `
    <div class="product-card" data-target="${product.target}">
        <div class="product-header">
            <h1 class="product-title">${product.title}</h1>
        </div>
        
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.alt}" class="product-image">
        </div>
        
        <div class="product-details">
            <div class="product-description">
                <p>${product.description}</p>
            </div>
            
            <h3 class="specs-title">Физико-механические характеристики</h3>
            
            <table class="specs-table">
                <tr>
                    <td class="spec-name">Поверхностная плотность, г/м<sup>2</sup></td>
                    <td class="spec-value">${product.specs.density}</td>
                </tr>
                <tr>
                    <td class="spec-name">Разрывная нагрузка, KH/M</td>
                    <td class="spec-value">
                        <div>по длине: ${product.specs.breakingLoad.length}</div>
                        <div>по ширине: ${product.specs.breakingLoad.width}</div>
                    </td>
                </tr>
                <tr>
                    <td class="spec-name">Удлинение при разрыве, %</td>
                    <td class="spec-value">
                        <div>по длине: ${product.specs.elongation.length}</div>
                        <div>по ширине: ${product.specs.elongation.width}</div>
                    </td>
                </tr>
                <tr>
                    <td class="spec-name">Коэф. фильтрации при давлении 2,0 кПа, м/сут, не менее</td>
                    <td class="spec-value">${product.specs.filtration}</td>
                </tr>
                <tr>
                    <td class="spec-name">Толщина при давлении 2,0 кПа, мм</td>
                    <td class="spec-value">${product.specs.thickness}</td>
                </tr>
                <tr>
                    <td class="spec-name">Ширина рулона, м</td>
                    <td class="spec-value">${product.specs.rollWidth}</td>
                </tr>
                <tr>
                    <td class="spec-name">Длина рулона, м</td>
                    <td class="spec-value">${product.specs.rollLength}</td>
                </tr>
            </table>
            
            <div class="product-actions">
                <a href="#popup:myform" class="btn btn-primary">Получить КП</a>
                <a href="#popup:table1" class="btn btn-secondary">Подробная таблица</a>
            </div>
        </div>       
    </div>
    `;
  });
  
  container.innerHTML = html;
}

// Функция фильтрации продуктов
function initFilter() {
  const tabs = document.querySelectorAll('.geo-filter__tab');
  // Получаем все карточки после отрисовки
  const productCards = document.querySelectorAll('.product-card');
  
  function filterProducts(density) {
    productCards.forEach(card => {
      // Сравнение по точному совпадению
      if (card.getAttribute('data-target') === density) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
  
  // Инициализация: берем активную вкладку
  const activeTab = document.querySelector('.geo-filter__tab.geo-filter__tab--active');
  if (activeTab) {
    const density = activeTab.getAttribute('data-density');
    filterProducts(density);
  }
  
  // Обработчик кликов по вкладкам
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove('geo-filter__tab--active'));
      this.classList.add('geo-filter__tab--active');
      const density = this.getAttribute('data-density');
      filterProducts(density);
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderProducts();
  initFilter();
  
  // Далее идут остальные модули:
  
  // Модуль: Мобильное меню
  function initMobileMenu() {
    const menuButton = document.querySelector('.menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeButton = document.querySelector('.mobile-menu-close');
    const overlay = document.getElementById('mobileMenuOverlay');
    function toggleMenu() {
      mobileMenu.classList.toggle('open');
      if (overlay) overlay.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
      if (menuButton) menuButton.classList.toggle('active');
    }
    if (menuButton) {
      menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
      });
    }
    if (closeButton) {
      closeButton.addEventListener('click', toggleMenu);
    }
    if (overlay) {
      overlay.addEventListener('click', toggleMenu);
    }
    document.querySelectorAll('.mobile-menu-nav a').forEach(link => {
      link.addEventListener('click', toggleMenu);
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
    document.addEventListener('click', function(e) {
      if (mobileMenu.classList.contains('open') &&
          !e.target.closest('#mobileMenu') &&
          !e.target.closest('.menu-btn')) {
        toggleMenu();
      }
    });
  }
  initMobileMenu();
  
  // Модуль: Видео попап
  function initVideoPopup() {
    const videoBtn = document.getElementById('video-btn');
    const videoPopup = document.getElementById('popup:company');
    const closeBtn = document.querySelector('.geo-popup__close');
    const overlay = document.querySelector('.geo-popup__overlay');
    if (videoBtn) {
      videoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        videoPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        setTimeout(() => {
          const iframe = document.querySelector('.geo-popup__video iframe');
          if (iframe) {
            iframe.src += '&autoplay=1';
          }
        }, 300);
      });
    }
    function closePopup() {
      videoPopup.style.display = 'none';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      const iframe = document.querySelector('.geo-popup__video iframe');
      if (iframe) {
        iframe.src = iframe.src.replace('&autoplay=1', '');
      }
    }
    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    if (overlay) overlay.addEventListener('click', closePopup);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && videoPopup.style.display === 'flex') {
        closePopup();
      }
    });
  }
  initVideoPopup();
  
  // Модуль: Попап формы
  function initFormPopup() {
    const formPopup = document.getElementById('popup:myform');
    const form = document.getElementById('geo-kp-form');
    const closeBtn = document.querySelector('.geo-form-popup__close');
    const overlay = document.querySelector('.geo-form-popup__overlay');
    let scrollPosition = 0;
    document.querySelectorAll('[href="#popup:myform"]').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        scrollPosition = window.pageYOffset;
        openFormPopup();
      });
    });
    function openFormPopup() {
      formPopup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    function closeFormPopup() {
      formPopup.style.display = 'none';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0, scrollPosition);
    }
    if (closeBtn) closeBtn.addEventListener('click', closeFormPopup);
    if (overlay) overlay.addEventListener('click', closeFormPopup);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && formPopup.style.display === 'flex') {
        closeFormPopup();
      }
    });
    const phoneInput = document.getElementById('geo-phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = '';
        if (value.length > 0) {
          formattedValue = '(' + value.substring(0, 3);
        }
        if (value.length > 3) {
          formattedValue += ') ' + value.substring(3, 6);
        }
        if (value.length > 6) {
          formattedValue += '-' + value.substring(6, 8);
        }
        if (value.length > 8) {
          formattedValue += '-' + value.substring(8, 10);
        }
        e.target.value = formattedValue;
      });
    }
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        document.querySelectorAll('.geo-form__group').forEach(group => {
          group.classList.remove('geo-form__group--error');
        });
        const name = document.getElementById('geo-name');
        if (!name.value.trim()) {
          name.closest('.geo-form__group').classList.add('geo-form__group--error');
          isValid = false;
        }
        const phone = document.getElementById('geo-phone');
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        if (!phoneRegex.test(phone.value)) {
          phone.closest('.geo-form__group').classList.add('geo-form__group--error');
          isValid = false;
        }
        const email = document.getElementById('geo-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
          email.closest('.geo-form__group').classList.add('geo-form__group--error');
          isValid = false;
        }
        const density = document.getElementById('geo-density');
        if (!density.value) {
          density.closest('.geo-form__group').classList.add('geo-form__group--error');
          isValid = false;
        }
        if (isValid) {
          alert('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.');
          closeFormPopup();
          form.reset();
        }
      });
    }
  }
  initFormPopup();
  
  // Модуль: Попап таблиц
  function initPopupTable() {
    const popup = document.getElementById('universal-popup');
    const closeBtn = popup.querySelector('.universal-popup-close');
    const popupImage = document.getElementById('popup-image');
    const tableImages = {
      'table1': 'assets/img/products/table1.png',
      'table2': 'assets/img/products/table2.png'
    };
    document.querySelectorAll('a[href^="#popup:"]').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const tableId = this.getAttribute('href').split(':')[1];
        if (tableImages[tableId]) {
          popupImage.src = tableImages[tableId];
          popupImage.alt = 'Таблица ' + tableId;
          popup.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    });
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
    popup.addEventListener('click', function(e) {
      if (e.target === popup || e.target.classList.contains('awards-gallery-popup-overlay')) {
        popup.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && popup.style.display === 'flex') {
        popup.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
    const universalPopupContainer = document.querySelector('.universal-popup-container');
    if (universalPopupContainer) {
      universalPopupContainer.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  }
  initPopupTable();
  
  // Модуль: Фильтрация товаров
  function initFilter() {
    const tabs = document.querySelectorAll('.geo-filter__tab');
    const productCards = document.querySelectorAll('.product-card');
    const productsContainer = document.querySelector('.products-grid');
    function hideAllCards() {
      productCards.forEach(card => {
        card.style.visibility = 'hidden';
        card.style.position = 'absolute';
        card.style.height = '0';
        card.style.padding = '0';
        card.style.margin = '0';
        card.style.overflow = 'hidden';
      });
      productsContainer.style.minHeight = productsContainer.offsetHeight + 'px';
    }
    function showCardsByDensity(density) {
      hideAllCards();
      const cardsToShow = document.querySelectorAll(`[data-target*="${density}"]`);
      cardsToShow.forEach(card => {
        card.style.visibility = 'visible';
        card.style.position = 'relative';
        card.style.height = 'auto';
        card.style.padding = '';
        card.style.margin = '';
        card.style.overflow = '';
      });
      productsContainer.style.minHeight = '';
    }
    tabs.forEach(tab => {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        const scrollPosition = window.scrollY || window.pageYOffset;
        tabs.forEach(t => t.classList.remove('geo-filter__tab--active'));
        this.classList.add('geo-filter__tab--active');
        const density = this.getAttribute('data-density');
        showCardsByDensity(density);
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPosition);
        });
      });
    });
    const firstTab = document.querySelector('.geo-filter__tab');
    if (firstTab) firstTab.click();
  }
  initFilter();
  
  // Модуль: Анимация счетчиков
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    const animateCounter = (element) => {
      const target = parseInt(element.getAttribute('data-counter'));
      const duration = 2000;
      let startTime = null;
      const suffixMatch = element.innerHTML.match(/<span.*<\/span>/);
      const suffix = suffixMatch ? suffixMatch[0] : '';
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        element.innerHTML = value.toLocaleString() + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    counters.forEach(counter => {
      observer.observe(counter);
    });
  }
  initCounters();
  
  // Модуль: Видео промо попап
  function initVideoPromoPopup() {
    const videoButton = document.getElementById('open-video-popup');
    const videoPopup = document.getElementById('video-popup');
    const closePopupBtn = document.querySelector('.close-popup');
    const videoContainer = document.querySelector('.video-container');
    if (videoButton) {
      videoButton.addEventListener('click', function() {
        videoPopup.style.display = 'block';
        document.body.style.overflow = 'hidden';
        videoContainer.innerHTML = `
          <iframe 
            src="https://www.youtube.com/embed/qjdzHvMRkKk?si=tSVveewtJHEdDmMQ" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        `;
      });
    }
    if (closePopupBtn) {
      closePopupBtn.addEventListener('click', function() {
        videoPopup.style.display = 'none';
        document.body.style.overflow = '';
        videoContainer.innerHTML = '';
      });
    }
    const popupOverlay = document.querySelector('.popup-overlay');
    if (popupOverlay) {
      popupOverlay.addEventListener('click', function() {
        videoPopup.style.display = 'none';
        document.body.style.overflow = '';
        videoContainer.innerHTML = '';
      });
    }
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && videoPopup.style.display === 'block') {
        videoPopup.style.display = 'none';
        document.body.style.overflow = '';
        videoContainer.innerHTML = '';
      }
    });
  }
  initVideoPromoPopup();
  
  // Модуль: Карусель отзывов (отзывы задаются в HTML)
  function initReviewsCarousel() {
    const carouselEl = document.getElementById('reviewsCarousel');
    if (!carouselEl) return;
    const carouselInstance = new bootstrap.Carousel(carouselEl, {
      interval: 10000,
      wrap: true
    });
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    if (prevBtn) {
      prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        carouselInstance.prev();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        carouselInstance.next();
      });
    }
    carouselEl.addEventListener('mouseenter', () => carouselInstance.pause());
    carouselEl.addEventListener('mouseleave', () => carouselInstance.cycle());
  }
  initReviewsCarousel();
  
  // Модуль: Карусель проектов
  function initProjectsCarousel() {
    const carousel = document.querySelector('.geo-sm-projects-carousel-wrapper');
    const prevBtn = document.querySelector('.geo-sm-projects-prev-btn');
    const nextBtn = document.querySelector('.geo-sm-projects-next-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        carousel.scrollBy({ left: -carousel.offsetWidth * 0.8, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        carousel.scrollBy({ left: carousel.offsetWidth * 0.8, behavior: 'smooth' });
      });
    }
  }
  initProjectsCarousel();
  
  // Модуль: Карусель наград
  function initAwardsCarousel() {
    const awardsCarousel = document.querySelector('.awards-gallery-items');
    const prevBtn = document.querySelector('.awards-gallery-prev');
    const nextBtn = document.querySelector('.awards-gallery-next');
    function scrollCarousel(direction) {
      const card = document.querySelector('.awards-gallery-card');
      const gap = 25;
      const scrollAmount = card.offsetWidth + gap;
      awardsCarousel.scrollBy({
        left: direction === 'prev' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        scrollCarousel('prev');
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        scrollCarousel('next');
      });
    }
    const popup = document.querySelector('.awards-gallery-popup');
    const popupImage = document.querySelector('.awards-gallery-popup-image');
    const closePopup = document.querySelector('.awards-gallery-popup-close');
    const zoomButtons = document.querySelectorAll('.awards-gallery-zoom-btn');
    zoomButtons.forEach(button => {
      button.addEventListener('click', function() {
        const imgSrc = this.getAttribute('data-img');
        popupImage.src = imgSrc;
        popup.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });
    if (closePopup) {
      closePopup.addEventListener('click', function() {
        popup.style.display = 'none';
        document.body.style.overflow = '';
      });
    }
    popup.addEventListener('click', function(e) {
      if (e.target === popup || e.target.classList.contains('awards-gallery-popup-overlay')) {
        popup.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && popup.style.display === 'block') {
        popup.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
  initAwardsCarousel();
  
  // Модуль: Видео галерея
  function initVideoGallery() {
    const playButtons = document.querySelectorAll('.video-gallery-play-btn');
    const videoPopup = document.querySelector('.video-gallery-popup');
    const popupClose = document.querySelector('.video-gallery-popup-close');
    const popupIframe = videoPopup.querySelector('iframe');
    playButtons.forEach(button => {
      button.addEventListener('click', function() {
        const videoId = this.getAttribute('data-video-id');
        popupIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        videoPopup.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });
    if (popupClose) {
      popupClose.addEventListener('click', function() {
        popupIframe.src = '';
        videoPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }
    const overlay = videoPopup.querySelector('.video-gallery-popup-overlay');
    if (overlay) {
      overlay.addEventListener('click', function() {
        popupIframe.src = '';
        videoPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }
  }
  initVideoGallery();
  
  // Модуль: Попап новостей
  function initNewsPopup() {
    const readMoreButtons = document.querySelectorAll('.news-read-more');
    const newsPopup = document.querySelector('.news-popup');
    const popupClose = document.querySelector('.news-popup-close');
    const textContent = document.querySelector('.news-popup-text-content');
    const videoContent = document.querySelector('.news-popup-video-content');
    const pdfContent = document.querySelector('.news-popup-pdf-content');
    const popupTitle = document.querySelector('.news-popup-title');
    const popupImage = document.querySelector('.news-popup-image');
    const popupDate = document.querySelector('.news-popup-date span');
    const popupText = document.querySelector('.news-popup-text');
    const videoTitle = document.querySelector('.news-popup-video-title');
    const videoIframe = document.querySelector('.news-popup-video-wrapper iframe');
    const pdfTitle = document.querySelector('.news-popup-pdf-title');
    const pdfIframe = document.querySelector('.news-popup-pdf-wrapper iframe');
    const newsData = {
      1: {
          title: "В Атырау ТОО «Интаго Казахстан» освоило производство полиэфирных геосинтетических материалов",
          date: "27 сентября 2024 г. 11:00",
          content: "<p>Новый завод расположен на территории специальной экономической зоны «НИНТ». ...</p>",
          image: "images/news1-full.jpg"
      },
      2: {
          title: "Экскурсия по производству",
          videoId: "dQw4w9WgXcQ"
      },
      3: {
          title: "Каталог продукции 2023",
          pdfUrl: "catalog2023.pdf"
      }
    };
    readMoreButtons.forEach(button => {
      button.addEventListener('click', function() {
        const newsId = this.getAttribute('data-news-id');
        const contentType = this.getAttribute('data-content-type');
        const news = newsData[newsId];
        textContent.style.display = 'none';
        videoContent.style.display = 'none';
        pdfContent.style.display = 'none';
        videoIframe.src = '';
        pdfIframe.src = '';
        switch(contentType) {
          case 'text':
            popupTitle.textContent = news.title;
            popupDate.textContent = news.date;
            popupText.innerHTML = news.content;
            popupImage.src = this.getAttribute('data-image');
            textContent.style.display = 'block';
            break;
          case 'video':
            videoTitle.textContent = news.title;
            videoIframe.src = `https://www.youtube.com/embed/${news.videoId}?autoplay=1`;
            videoContent.style.display = 'block';
            break;
          case 'pdf':
            pdfTitle.textContent = news.title;
            pdfIframe.src = news.pdfUrl;
            pdfContent.style.display = 'block';
            break;
        }
        newsPopup.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });
    if (popupClose) {
      popupClose.addEventListener('click', function() {
        newsPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
        videoIframe.src = '';
      });
    }
    const newsOverlay = newsPopup.querySelector('.news-popup-overlay');
    if (newsOverlay) {
      newsOverlay.addEventListener('click', function() {
        newsPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
        videoIframe.src = '';
      });
    }
  }
  initNewsPopup();
  
  // Модуль: FAQ
  function initFaq() {
    document.querySelectorAll('.faq-question').forEach(button => {
      button.addEventListener('click', () => {
        const faqItem = button.parentNode;
        faqItem.classList.toggle('active');
        document.querySelectorAll('.faq-item').forEach(item => {
          if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
          }
        });
      });
    });
  }
  initFaq();
  
  // Модуль: Форма обратной связи (contacts)
  function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
      feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Форма отправлена! Мы свяжемся с вами в ближайшее время.');
        this.reset();
      });
    }
  }
  initFeedbackForm();
});

// Инициализация slick-слайдера для логотипов клиентов (jQuery)
$(document).ready(function(){
    $('.customer-logos').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });
});
