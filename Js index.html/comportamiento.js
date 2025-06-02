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