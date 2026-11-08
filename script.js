// 相簿 → 橫向滑動輪播 + 下方縮圖列
(() => {
  document.querySelectorAll('.gallery').forEach((g) => {
    const links = [...g.children].filter((el) => el.matches('a[data-group]'));
    if (links.length < 2) return;
    const car = document.createElement('div');
    car.className = 'carousel';
    car.innerHTML =
      '<div class="car-view"><div class="car-track"></div>' +
      '<button class="car-btn car-prev" aria-label="上一張">‹</button>' +
      '<button class="car-btn car-next" aria-label="下一張">›</button>' +
      '<span class="car-count"></span></div><div class="car-thumbs"></div>';
    const track = car.querySelector('.car-track');
    const thumbs = car.querySelector('.car-thumbs');
    const count = car.querySelector('.car-count');
    const prev = car.querySelector('.car-prev');
    const next = car.querySelector('.car-next');
    const ths = links.map((a, n) => {
      track.appendChild(a);
      const t = document.createElement('button');
      t.type = 'button';
      t.setAttribute('aria-label', `第 ${n + 1} 張`);
      const im = document.createElement('img');
      im.src = a.href; im.loading = 'lazy'; im.alt = '';
      t.appendChild(im);
      t.onclick = () => go(n);
      thumbs.appendChild(t);
      return t;
    });
    let cur = 0;
    const mark = (n) => {
      cur = n;
      ths.forEach((t, k) => t.classList.toggle('on', k === n));
      count.textContent = `${n + 1} / ${links.length}`;
      prev.disabled = n === 0;
      next.disabled = n === links.length - 1;
      const t = ths[n];
      thumbs.scrollTo({ left: t.offsetLeft - (thumbs.clientWidth - t.clientWidth) / 2, behavior: 'smooth' });
    };
    const go = (n) => {
      n = Math.max(0, Math.min(links.length - 1, n));
      track.scrollTo({ left: n * track.clientWidth, behavior: 'smooth' });
      mark(n);
    };
    track.addEventListener('scroll', () => {
      const n = Math.round(track.scrollLeft / track.clientWidth);
      if (n !== cur) mark(n);
    }, { passive: true });
    prev.onclick = () => go(cur - 1);
    next.onclick = () => go(cur + 1);
    g.replaceWith(car);
    mark(0);
  });
})();

(() => {
  const lb =document.getElementById('lb');
  const img = lb.querySelector('img');
  const cnt = lb.querySelector('.cnt');
  let list = [], i = 0;

  const show = () => {
    img.src = list[i].href;
    cnt.textContent = `${i + 1} / ${list.length}`;
  };
  const open = (a) => {
    list = [...document.querySelectorAll(`a[data-group="${a.dataset.group}"]`)];
    i = list.indexOf(a);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    show();
  };
  const close = () => { lb.hidden = true; document.body.style.overflow = ''; };
  const step = (d) => { i = (i + d + list.length) % list.length; show(); };

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-group]');
    if (a) { e.preventDefault(); open(a); }
  });
  lb.querySelector('.x').onclick = close;
  lb.querySelector('.p').onclick = () => step(-1);
  lb.querySelector('.n').onclick = () => step(1);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();
