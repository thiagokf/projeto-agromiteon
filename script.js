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

  // Formulário de Newsletter
  const newsletterForm = document.getElementById("newsletter-form");
  const checkbox = document.getElementById("checkbox-newsletter");
  const btnAssinar = document.getElementById("btn-assinar");
  const inputName = document.getElementById("name");
  const inputEmail = document.getElementById("email");

  // Verifica se o botão deve ser habilitado
  function verificarFormulario() {
    const nomePreenchido = inputName && inputName.value.trim() !== "";
    const emailPreenchido = inputEmail && inputEmail.value.trim() !== "";
    const checkboxMarcado = checkbox && checkbox.checked;
    btnAssinar.disabled = !(nomePreenchido && emailPreenchido && checkboxMarcado);
  }

  if (checkbox && btnAssinar && inputName && inputEmail) {
    checkbox.addEventListener("change", verificarFormulario);
    inputName.addEventListener("input", verificarFormulario);
    inputEmail.addEventListener("input", verificarFormulario);
  }
  
  // Se comunica com o servidor e faz a assinatura do usuario
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const btnAssinar = document.getElementById("btn-assinar");
    const statusDiv = document.getElementById("statusNewsletter");
    
    btnAssinar.disabled = true;
    btnAssinar.textContent = "Enviando..."
    statusDiv.textContent = "Fazendo assinatura! Aguarde...";
    statusDiv.style.color = "gray"

    //https://agromiteon-server.onrender.com/newsletter
      fetch('https://agromiteon-server.onrender.com/newsletter', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })
      .then((response) => response.json())
      .then((data) => {
        statusDiv.textContent = data.message;
        if (data.success) {
          statusDiv.textContent = data.message || "✓ Inscrição realizada com sucesso!";
          document.getElementById("newsletter-form").reset();
          statusDiv.style.color = "green";
        } else {
          statusDiv.style.color = "orange"
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        statusDiv.style.color = "red"
        statusDiv.textContent = "Erro ao registrar. Tente novamente mais tarde.";
      });
      btnAssinar.disabled = false;
      btnAssinar.textContent = "Assinar Newsletter";
    });
  }
});
