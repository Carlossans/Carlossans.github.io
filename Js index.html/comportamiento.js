   // boton hamburguesa responsive + sidebar colapsable
   document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById('navbar-toggle');
    const links = document.getElementById('navbar-links');
    const sidebar = document.getElementById('sidebar-navbar');
    const body = document.body;

    // Detecta si estamos en el rango sidebar (992px - 1612px)
    function isSidebar() {
      return window.innerWidth >= 992 && window.innerWidth <= 1612;
    }

    function collapseSidebar() {
      if (sidebar) sidebar.classList.add('sidebar-collapsed');
      body.classList.add('sidebar-collapsed');
      links.classList.remove('show');
      if (toggle) toggle.setAttribute('aria-expanded', "false");
    }
    function expandSidebar() {
      if (sidebar) sidebar.classList.remove('sidebar-collapsed');
      body.classList.remove('sidebar-collapsed');
    }
    function closeMenu() {
      links.classList.remove('show');
      if (toggle) toggle.setAttribute('aria-expanded', "false");
      if (isSidebar()) collapseSidebar();
    }
    function openMenu() {
      links.classList.add('show');
      if (toggle) toggle.setAttribute('aria-expanded', "true");
      if (isSidebar()) expandSidebar();
    }

    // Inicializa el sidebar de manera que esté colapsado
    if (isSidebar()) {
      collapseSidebar();
    }

    if (toggle) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        if (isSidebar()) {
          // Si está colapsado, expandir y mostrar menú
          if (sidebar.classList.contains('sidebar-collapsed')) {
            expandSidebar();
            links.classList.add('show');
            toggle.setAttribute('aria-expanded', "true");
          } else {
            // Si está expandido, colapsar y ocultar menú
            collapseSidebar();
          }
        } else {
          // Comportamiento móvil normal
          const expanded = links.classList.toggle('show');
          toggle.setAttribute('aria-expanded', expanded ? "true" : "false");
        }
      });
    }

    // Cierra el menú al hacer click fuera del sidebar
    document.addEventListener('click', function (e) {
      if (!links.contains(e.target) && (!toggle || !toggle.contains(e.target))) {
        closeMenu();
      }
    });

    // Sidebar: cerrar menú hamburguesa si se cambia de tamaño a desktop o móvil
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1613 || window.innerWidth < 992) {
        // Desktop o móvil: quitar clases sidebar
        if (sidebar) sidebar.classList.remove('sidebar-collapsed');
        body.classList.remove('sidebar-collapsed');
        links.classList.remove('show');
      } else {
        // Sidebar: colapsar por defecto
        collapseSidebar();
      }
    });
  });

      // Carrusel ultra-ligero
      document.addEventListener("DOMContentLoaded", function () {
        const items = document.querySelectorAll('.carousel-item');
        let idx = 0;
        function show(n) {
          items.forEach((img, i) => img.style.display = (i === n ? 'block' : 'none'));
        }
        document.getElementById('prevBtn').onclick = () => { idx = (idx - 1 + items.length) % items.length; show(idx); };
        document.getElementById('nextBtn').onclick = () => { idx = (idx + 1) % items.length; show(idx); };
        setInterval(() => { idx = (idx + 1) % items.length; show(idx); }, 5000);
      });

       // Lazy load YouTube solo cuando es visible
    let ytLoaded = false;
    function loadYouTubeScript() {
      if (ytLoaded) return;
      ytLoaded = true;
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
    function onYouTubeIframeAPIReady() {
      new YT.Player("player", {
        videoId: "9QNUXxuwt1Y",
        width: "100%",
        height: "100%",
        playerVars: { enablejsapi: 1, origin: window.location.origin, cookie: "none" }
      });
    }
    window.addEventListener("load", function () {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadYouTubeScript();
          observer.unobserve(entries[0].target);
        }
      }, { rootMargin: "50px" });
      observer.observe(document.getElementById("player"));
    });
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    document.addEventListener("DOMContentLoaded", () => {
        const btnEs = document.getElementById("btn-es");
        const btnEn = document.getElementById("btn-en");
        let idioma = localStorage.getItem("idioma") || "es";
        function cambiarIdioma(idiomaSeleccionado) {
          idioma = idiomaSeleccionado;
          localStorage.setItem("idioma", idioma);
          document.documentElement.lang = idioma;
          document.querySelectorAll("[data-es], [data-en]").forEach(el => {
            const contenido = el.getAttribute(`data-${idioma}`);
            if (contenido !== null) el.innerHTML = contenido;
          });
        }
        cambiarIdioma(idioma);
        if (btnEs && btnEn) {
          btnEs.addEventListener("click", () => cambiarIdioma("es"));
          btnEn.addEventListener("click", () => cambiarIdioma("en"));
        }
      });