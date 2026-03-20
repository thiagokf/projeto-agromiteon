// Animações de scroll
document.addEventListener('DOMContentLoaded', function() {
  
  // Configuração do Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Selecionar elementos para animar
  const animateElements = document.querySelectorAll(`
    h2,
    .eudr-card,
    .sobre-area-card,
    .solucao-card-compact,
    .value-item,
    .investimento-item,
    .report-item,
    .eudr-diferencial,
    .sobre-missao,
    .compliance-program-card,
    .filosofia-container,
    .sobre-intro-container,
    .sobre-areas-container,
    .sobre-dual-grid,
    .sobre-contexto,
    .eudr-contexto-text,
    .solucao-investimentos
  `);

  animateElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });

  // Interação com imagens dinâmicas na seção Sobre
  const areaWords = document.querySelectorAll('.area-word');
  const dynamicImg = document.getElementById('areas-dynamic-img');
  
  if (dynamicImg) {
    const defaultImg = dynamicImg.getAttribute('data-default');
    
    areaWords.forEach(word => {
      word.addEventListener('mouseenter', function() {
        const imageKey = this.getAttribute('data-image');
        const newImageSrc = dynamicImg.getAttribute('data-' + imageKey);
        
        if (newImageSrc && dynamicImg.src !== newImageSrc) {
          dynamicImg.style.opacity = '0';
          setTimeout(() => {
            dynamicImg.src = newImageSrc;
            dynamicImg.style.opacity = '1';
          }, 300);
        }
      });
      
      word.addEventListener('mouseleave', function() {
        dynamicImg.style.opacity = '0';
        setTimeout(() => {
          dynamicImg.src = defaultImg;
          dynamicImg.style.opacity = '1';
        }, 300);
      });
    });
  }

  // Formulário de Newsletter
  const newsletterForm = document.getElementById("newsletter-form");
  
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const statusDiv = document.getElementById("statusNewsletter");
      
      fetch('https://agromiteon-server.onrender.com/newsletter', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(err => {throw err; });
        }
        response.json()})
      .then((data) => {
        document.getElementById("statusNewsletter").textContent = data.message;
        if (data.success) {
          statusDiv.textContent = data.message || "✓ Inscrição realizada com sucesso!";
          document.getElementById("newsletter-form").reset();
          document.getElementById("statusNewsletter").style.color = "green";
        } else {
          document.getElementById("statusNewsletter").style.color = "orange";
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        statusDiv.textContent = "Erro ao registrar. Tente novamente mais tarde.";
      });
    });
  }
});
