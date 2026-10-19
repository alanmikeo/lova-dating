// Folder URLs stay clean on hosting; direct file previews need an explicit document.
if (window.location.protocol === 'file:') {
  document.querySelectorAll('.header-languages a').forEach((link) => {
    const destination = new URL(link.getAttribute('href'), window.location.href);
    if (destination.pathname.endsWith('/')) {
      destination.pathname += 'index.html';
      link.href = destination.href;
    }
  });
}
