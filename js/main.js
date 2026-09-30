(() => {
  const nav = document.getElementById('menu');
  const burger = document.querySelector('.burger');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); }
  });

  // Lien actif selon la section visible
  const links = [...nav.querySelectorAll('a')];
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) links.forEach(a => a.classList.toggle('active', a.hash === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section').forEach(s => io.observe(s));

  // Filtre des projets
  const btns = document.querySelectorAll('.filters button');
  const cards = document.querySelectorAll('.card');
  btns.forEach(b => b.addEventListener('click', () => {
    btns.forEach(x => x.classList.toggle('on', x === b));
    cards.forEach(c => c.hidden = b.dataset.f !== 'all' && !c.dataset.t.split(' ').includes(b.dataset.f));
  }));

  // Photo absente : on garde les initiales
  const img = document.querySelector('.photo img');
  img.addEventListener('error', () => img.remove());

  document.getElementById('year').textContent = new Date().getFullYear();
})();
