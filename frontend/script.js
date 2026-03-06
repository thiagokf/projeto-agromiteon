// Animações de scroll suaves
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
});
