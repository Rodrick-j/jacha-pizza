// --- Mobile menu ---
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// --- Touch helpers & media optimizations ---
const isTouch = (typeof window !== 'undefined') && (
  'ontouchstart' in window || navigator.maxTouchPoints > 0 || matchMedia('(pointer: coarse)').matches
);
function bindTouchActive(selector, className){
  if(!isTouch) return;
  document.addEventListener('touchstart', (e)=>{
    const el = e.target.closest(selector);
    if(!el) return;
    el.classList.add(className);
  }, {passive:true});
  const remove = (e)=>{
    document.querySelectorAll(selector + '.' + className).forEach(el=>el.classList.remove(className));
  };
  document.addEventListener('touchend', remove, {passive:true});
  document.addEventListener('touchcancel', remove, {passive:true});
}
// Map hover effects to touch
bindTouchActive('.card-hover', 'touch-active');
bindTouchActive('.btn-shine', 'touch-active');
bindTouchActive('.btn-accent', 'touch-active');
bindTouchActive('.sparkle-button', 'is-active');
bindTouchActive('.site-header nav a', 'touch-active');

// --- i18n ---
const translations = {
  es: {
    brand: 'Jacha Pizza',
    navCatalogo: 'Catálogo', navCarrito: 'Carrito', navContacto: 'Contacto',
    heroTitle: 'Momentos con familia y amigos, mejor con pizza.',
    heroDesc: 'Comparte tus pizzas favoritas y crea recuerdos inolvidables juntos.',
    heroCta: 'Ordenar ahora', heroContact: 'Contáctanos',
    catalogoTitle: 'Catálogo de Pizzas',
    filterAll: 'Todas', filterClassic: 'Clásicas', filterGourmet: 'Gourmet', filterVeggie: 'Vegetarianas',
    sortDefault: 'Por defecto', sortLowHigh: 'Precio: menor a mayor', sortHighLow: 'Precio: mayor a menor', sortNameAsc: 'Nombre: A-Z', sortNameDesc: 'Nombre: Z-A',
    add: 'Añadir',
    cartTitle: 'Carrito de Compras', thProducto: 'Producto', thCantidad: 'Cantidad', thPrecio: 'Precio Unitario', thSubtotal: 'Subtotal', thAcciones: 'Acciones',
    cartEmpty: 'No hay productos en el carrito.', total: 'Total:', clearCart: 'Vaciar Carrito', checkout: 'Finalizar Compra',
    contactTitle: 'Contacto', labelNombre: 'Nombre', labelEmail: 'Correo Electrónico', labelTelefono: 'Teléfono', labelMensaje: 'Mensaje', send: 'Enviar Mensaje',
    searchPlaceholder: 'Buscar pizza...',
    checkoutAlert: 'Gracias por su compra en Jacha Pizza. ¡Buen provecho!',
    contactRequired: 'Por favor, complete los campos obligatorios: Nombre, Correo Electrónico y Mensaje.',
    contactThanks: (n) => `Gracias por contactarnos, ${n}. Responderemos a su mensaje pronto.`,
    toastAdded: (n) => `${n} agregado al carrito`,
  },
  en: {
    brand: 'Jacha Pizza',
    navCatalogo: 'Catalog', navCarrito: 'Cart', navContacto: 'Contact',
    heroTitle: 'Family and friends moments are better with pizza.',
    heroDesc: 'Share your favorites and make unforgettable memories together.',
    heroCta: 'Order now', heroContact: 'Contact us',
    catalogoTitle: 'Pizza Catalog',
    filterAll: 'All', filterClassic: 'Classic', filterGourmet: 'Gourmet', filterVeggie: 'Vegetarian',
    sortDefault: 'Default', sortLowHigh: 'Price: low to high', sortHighLow: 'Price: high to low', sortNameAsc: 'Name: A-Z', sortNameDesc: 'Name: Z-A',
    add: 'Add',
    cartTitle: 'Shopping Cart', thProducto: 'Product', thCantidad: 'Quantity', thPrecio: 'Unit Price', thSubtotal: 'Subtotal', thAcciones: 'Actions',
    cartEmpty: 'Your cart is empty.', total: 'Total:', clearCart: 'Clear Cart', checkout: 'Checkout',
    contactTitle: 'Contact', labelNombre: 'Name', labelEmail: 'Email', labelTelefono: 'Phone', labelMensaje: 'Message', send: 'Send Message',
    searchPlaceholder: 'Search pizza...',
    checkoutAlert: 'Thanks for your purchase at Jacha Pizza. Enjoy!',
    contactRequired: 'Please complete the required fields: Name, Email and Message.',
    contactThanks: (n) => `Thanks for contacting us, ${n}. We will reply soon.`,
    toastAdded: (n) => `${n} added to cart`,
  }
};

const langSelect = document.getElementById('lang-select');
const langSelectMobile = document.getElementById('lang-select-mobile');
function getLang(){ return localStorage.getItem('pa_lang') || 'es'; }
function setLang(l){ localStorage.setItem('pa_lang', l); if(langSelect) langSelect.value=l; if(langSelectMobile) langSelectMobile.value=l; applyTranslations(); }
langSelect?.addEventListener('change', e=>setLang(e.target.value));
langSelectMobile?.addEventListener('change', e=>setLang(e.target.value));
function applyTranslations(){
  const t = translations[getLang()];

// Expose catalogs for other pages (non-module script)
try { window.PIZZAS = PIZZAS; window.DRINKS = DRINKS; } catch(e) {}
  const setText = (id, val)=>{ const el=document.getElementById(id); if(el) el.textContent=val; };
  const setNodeText = (el, val)=>{ if(el) el.textContent = val; };
  const setPlaceholder = (id, val)=>{ const el=document.getElementById(id); if(el) el.placeholder=val; };

  setText('i18n-brand', t.brand);
  const navCatalogo = document.getElementById('i18n-nav-catalogo'); if(navCatalogo && navCatalogo.firstChild) navCatalogo.firstChild.nodeValue = ` ${t.navCatalogo}`.trimStart();
  const navCart = document.getElementById('i18n-nav-carrito'); if(navCart && navCart.childNodes[2]) navCart.childNodes[2].nodeValue = ` ${t.navCarrito} `;
  const navContacto = document.getElementById('i18n-nav-contacto'); if(navContacto && navContacto.lastChild) navContacto.lastChild.nodeValue = t.navContacto;

  setText('i18n-hero-title', t.heroTitle);
  setText('i18n-hero-desc', t.heroDesc);
  setText('i18n-hero-cta', t.heroCta);
  setText('i18n-hero-contact', t.heroContact);
  setText('i18n-catalogo-title', t.catalogoTitle);
  setText('i18n-filter-all', t.filterAll);
  setText('i18n-filter-classic', t.filterClassic);
  setText('i18n-filter-gourmet', t.filterGourmet);
  setText('i18n-filter-veggie', t.filterVeggie);
  setText('i18n-sort-default', t.sortDefault);
  setText('i18n-sort-low-high', t.sortLowHigh);
  setText('i18n-sort-high-low', t.sortHighLow);
  setText('i18n-sort-name-asc', t.sortNameAsc);
  setText('i18n-sort-name-desc', t.sortNameDesc);
  document.querySelectorAll('.i18n-add').forEach(el=>setNodeText(el, t.add));
  setText('i18n-cart-title', t.cartTitle);
  setText('i18n-th-producto', t.thProducto);
  setText('i18n-th-cantidad', t.thCantidad);
  setText('i18n-th-precio', t.thPrecio);
  setText('i18n-th-subtotal', t.thSubtotal);
  setText('i18n-th-acciones', t.thAcciones);
  setText('i18n-cart-empty', t.cartEmpty);
  setText('i18n-total-label', t.total);
  setText('i18n-clear-cart', t.clearCart);
  setText('i18n-checkout', t.checkout);
  setText('i18n-contact-title', t.contactTitle);
  setText('i18n-label-nombre', t.labelNombre);
  setText('i18n-label-email', t.labelEmail);
  setText('i18n-label-telefono', t.labelTelefono);
  setText('i18n-label-mensaje', t.labelMensaje);
  setText('i18n-send', t.send);
  setPlaceholder('search-input', t.searchPlaceholder);
}

// --- Catalog data ---
const PIZZAS = [
  {id:'1', name:'Margarita', price:120, cat:'classic', img:'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Salsa de tomate, mozzarella y albahaca fresca.'},
  {id:'2', name:'Pepperoni', price:140, cat:'classic', img:'https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Abundante pepperoni y queso fundido.'},
  {id:'3', name:'Hawaiana', price:150, cat:'classic', img:'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Jamón, piña y mozzarella.'},
  {id:'4', name:'Cuatro Quesos', price:160, cat:'gourmet', img:'https://images.pexels.com/photos/1435909/pexels-photo-1435909.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Mozzarella, cheddar, parmesano y gorgonzola.'},
  {id:'5', name:'Vegetariana', price:135, cat:'veggie', img:'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Pimientos, champiñones y aceitunas.'},
  {id:'6', name:'Barbacoa', price:170, cat:'gourmet', img:'https://images.pexels.com/photos/4109124/pexels-photo-4109124.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Carne deshebrada y salsa BBQ.'},
  {id:'7', name:'Mexicana', price:155, cat:'gourmet', img:'https://images.pexels.com/photos/17388272/pexels-photo-17388272/free-photo-of-comida-picante-pizza-comida-rapida.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Chorizo, jalapeños y cebolla.'},
  {id:'8', name:'Pollo BBQ', price:165, cat:'gourmet', img:'https://images.pexels.com/photos/724216/pexels-photo-724216.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Pollo, cebolla caramelizada y BBQ.'},
  {id:'9', name:'Marinera', price:190, cat:'gourmet', img:'https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Camarones y mejillones.'},
  {id:'10', name:'Carbonara', price:175, cat:'gourmet', img:'https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg?auto=compress&cs=tinysrgb&w=600', desc:'Crema, tocino y huevo.'},
  {id:'11', name:'Napolitana', price:145, cat:'classic', img:'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Tomate, ajo y orégano.'},
  {id:'12', name:'Prosciutto', price:185, cat:'gourmet', img:'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Jamón serrano y rúcula.'},
  {id:'13', name:'Alfredo', price:180, cat:'gourmet', img:'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Salsa blanca cremosa y pollo.'},
  {id:'14', name:'Suprema', price:195, cat:'gourmet', img:'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Todo lo mejor en una pizza.'},
  {id:'15', name:'Mediterránea', price:185, cat:'veggie', img:'https://images.pexels.com/photos/365459/pexels-photo-365459.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Aceitunas, alcachofa y feta.'},
];

// Beverages (refrescos y cervezas)
const DRINKS = [
  {id:'b1', name:'Refresco Coca-Cola 500ml', price:15, cat:'drink', type:'soda', img:'https://images.pexels.com/photos/159435/cola-cold-drink-refreshment-cold-159435.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Refresco gaseoso 500ml.'},
  {id:'b2', name:'Refresco Sprite 500ml', price:15, cat:'drink', type:'soda', img:'https://images.pexels.com/photos/65177/pexels-photo-65177.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Refresco gaseoso 500ml.'},
  {id:'b3', name:'Refresco Fanta 500ml', price:15, cat:'drink', type:'soda', img:'https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Refresco gaseoso 500ml.'},
  {id:'b4', name:'Cerveza Paceña 355ml', price:18, cat:'drink', type:'beer', img:'https://images.pexels.com/photos/1267702/pexels-photo-1267702.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Cerveza rubia 355ml.'},
  {id:'b5', name:'Cerveza Huari 355ml', price:20, cat:'drink', type:'beer', img:'https://images.pexels.com/photos/1269049/pexels-photo-1269049.jpeg?auto=compress&cs=tinysrgb&w=600', desc:'Cerveza especial 355ml.'},
];
const catalogContainer = document.getElementById('catalogo-lista');
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const sortSelect = document.getElementById('sort-select');

function renderCatalog(){
  if (!catalogContainer) return;
  const q = (searchInput.value||'').toLowerCase();
  const f = filterSelect ? filterSelect.value : 'all';
  // Merge pizzas and drinks
  let allItems = [...PIZZAS, ...DRINKS];
  let items = allItems.filter(p => {
    const matchCat = (
      f==='all' ||
      (f==='classic'&&p.cat==='classic') || (f==='gourmet'&&p.cat==='gourmet') || (f==='veggie'&&p.cat==='veggie') ||
      (f==='drink'&&p.cat==='drink') || (f==='soda'&&p.type==='soda') || (f==='beer'&&p.type==='beer')
    );
    const matchText = (p.name.toLowerCase().includes(q) || (p.desc||'').toLowerCase().includes(q));
    return matchCat && matchText;
  });
  const s = sortSelect.value;
  if (s==='price-asc') items.sort((a,b)=>a.price-b.price);
  else if (s==='price-desc') items.sort((a,b)=>b.price-a.price);
  else if (s==='name-asc') items.sort((a,b)=>a.name.localeCompare(b.name));
  else if (s==='name-desc') items.sort((a,b)=>b.name.localeCompare(a.name));
  catalogContainer.innerHTML='';
  // Helper to slugify pizza names to file names (e.g., "Pizza Marinera" -> "marinera")
  const slugify = (str)=>{
    return String(str)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g,'') // remove accents
      .toLowerCase()
      .replace(/pizza\s+/g,'') // drop leading word "pizza"
      .replace(/[^a-z0-9]+/g,'-')
      .replace(/(^-|-$)/g,'');
  };

  // Split into pizzas and drinks
  const pizzas = items.filter(p=>p.cat!=='drink');
  const drinks = items.filter(p=>p.cat==='drink');
  const hPizzas = getLang()==='es' ? 'Pizzas' : 'Pizzas';
  const hDrinks = getLang()==='es' ? 'Bebidas' : 'Drinks';

  const renderSection = (heading, list, gridCols)=>{
    if(!list.length) return;
    const section = document.createElement('div');
    section.className = 'space-y-3';
    const h = document.createElement('h3');
    h.className = 'text-2xl md:text-3xl font-extrabold accent-text reveal-up';
    h.textContent = heading;
    const grid = document.createElement('div');
    grid.className = gridCols + ' gap-6';
    section.appendChild(h); section.appendChild(grid);
    catalogContainer.appendChild(section);

    list.forEach(p=>{
      const card = document.createElement('article');
      card.className = 'panel panel-dark card-hover flex flex-col overflow-hidden reveal-up';
      const byName = `assets/img/pizzas/${slugify(p.name)}.jpg`;
      const byId = `assets/img/pizzas/${p.id}.jpg`;
      const localImg = byName;
      const isPizza = p.cat !== 'drink';
      // In dispositivos táctiles/ móviles, evita múltiples fallbacks a rutas locales inexistentes (acelera carga)
      const imgOnError = isTouch
        ? `this.onerror=null; this.src='${p.img}';`
        : `if(this.dataset.fallback==='0'){ this.dataset.fallback='1'; this.src='${byId}'; } else { this.onerror=null; this.src='${p.img}'; }`;
      card.innerHTML = `
        <img src="${localImg}" alt="${isPizza ? 'Pizza ' : ''}${p.name}" class="h-44 w-full object-cover" loading="lazy" referrerpolicy="no-referrer" data-fallback="0"
          onerror="${imgOnError}"
        />
        <div class="p-4 flex flex-col flex-grow">
          <h4 class="font-display text-2xl font-semibold mb-1">${isPizza ? 'Pizza ' : ''}${p.name}</h4>
          <p class="text-gray-700 flex-grow mb-3">${p.desc}</p>
          <div class="mt-auto flex items-center justify-between gap-2 flex-wrap">
            <span class="accent-text font-bold">Bs. ${p.price.toFixed(2)}</span>
            <div class="flex items-center gap-2 ml-auto">
              ${isPizza ? `<a href="personalizar.html?id=${p.id}" class="btn-shine btn-shine-sm" aria-label="Personalizar ${p.name}">Personalizar</a>
              <a href="tamanos.html?id=${p.id}" class="btn-shine btn-shine-sm" aria-label="Elegir tamaños de ${p.name}">Tamaños</a>` : ''}
              <button class="btn-shine btn-shine-sm add-to-cart" data-id="${p.id}" data-name="${isPizza ? 'Pizza ' : ''}${p.name}" data-price="${p.price}"><span class="i18n-add">Añadir</span></button>
            </div>
          </div>
        </div>`;
      grid.appendChild(card);
    });
  };

  if (items.length===0){
    const empty = document.createElement('div');
    empty.className = 'col-span-full text-center text-gray-500 py-6';
    empty.textContent = getLang()==='es' ? 'No se encontraron pizzas.' : 'No pizzas found.';
    catalogContainer.appendChild(empty);
  } else {
    if (f==='drink' || f==='soda' || f==='beer') {
      renderSection(hDrinks, drinks, 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4');
    } else if (f==='classic' || f==='gourmet' || f==='veggie') {
      renderSection(hPizzas, pizzas, 'grid sm:grid-cols-2 lg:grid-cols-3');
    } else {
      renderSection(hPizzas, pizzas, 'grid sm:grid-cols-2 lg:grid-cols-3');
      renderSection(hDrinks, drinks, 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4');
    }
  }
}
searchInput?.addEventListener('input', renderCatalog);
filterSelect?.addEventListener('change', renderCatalog);
sortSelect?.addEventListener('change', renderCatalog);

// --- Cart ---
const addToCartButtonsDelegated = ()=> document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count') || document.createElement('span');
const cartCountMobileEl = document.getElementById('cart-count-mobile') || document.createElement('span');
const clearCartBtn = document.getElementById('clear-cart') || {disabled:true, addEventListener:()=>{}};
const checkoutBtn = document.getElementById('checkout') || {disabled:true, addEventListener:()=>{}};
const toastContainer = document.getElementById('toast-container') || document.body;

let cart = {};
function saveCart(){
  const payload = JSON.stringify(cart);
  try { localStorage.setItem('jachaPizzaCart', payload); } catch(e) {}
  try { sessionStorage.setItem('jachaPizzaCart', payload); } catch(e) {}
  try { window.name = 'JACHA_CART=' + payload; } catch(e) {}
  try { updateCartLinks(); } catch(e) {}
}
function loadCart(){
  // Order of precedence to avoid double/triple counting:
  // 1) URL hash, 2) localStorage, 3) sessionStorage, 4) window.name
  // Return the first available source and STOP.
  // URL hash
  try {
    const hash = decodeURIComponent(location.hash||'');
    const m = hash.match(/cart=([^&]+)/);
    if (m && m[1]) { cart = JSON.parse(m[1]); return; }
  } catch(e) {}
  // localStorage
  try { const s = localStorage.getItem('jachaPizzaCart'); if (s) { cart = JSON.parse(s); return; } } catch(e) {}
  // sessionStorage
  try { const s = sessionStorage.getItem('jachaPizzaCart'); if (s) { cart = JSON.parse(s); return; } } catch(e) {}
  // window.name (same tab)
  try {
    if (typeof window.name === 'string' && window.name.startsWith('JACHA_CART=')){
      const raw = window.name.slice('JACHA_CART='.length);
      cart = JSON.parse(raw||'{}'); return;
    }
  } catch(e) {}
  cart = {};
}
function encodeCart(){ try { return encodeURIComponent(JSON.stringify(cart)); } catch(e) { return '';} }
function updateCartLinks(){
  const hash = 'cart=' + encodeCart();
  document.querySelectorAll('a[href$="cart.html"]').forEach(a=>{
    const base = a.getAttribute('href').split('#')[0];
    a.setAttribute('href', base + '#' + hash);
  });
}
// Expose a navigation helper for buttons
window.goToCart = function(){
  const base = 'cart.html';
  const hash = 'cart=' + encodeCart();
  location.href = base + '#' + hash;
};
// Intercept clicks on any cart link to enforce hash navigation
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a[href$="cart.html"]');
  if (!a) return;
  e.preventDefault();
  window.goToCart();
});
function updateCartCount(){ const c=Object.values(cart).reduce((a,i)=>a+i.quantity,0); cartCountEl.textContent=c; cartCountMobileEl.textContent=c; }
function showToast(msg){ const t=document.createElement('div'); t.className='toast'; t.innerHTML=`<i class="fa-solid fa-check-circle"></i><span>${msg}</span>`; toastContainer.appendChild(t); void t.offsetWidth; t.classList.add('show'); setTimeout(()=>{t.classList.remove('show'); setTimeout(()=>t.remove(),200);},1600); }
function updateCartUI(){
  if (!cartItemsContainer || !cartTotalEl) { updateCartCount(); return; }
  cartItemsContainer.innerHTML='';
  const items = Object.values(cart);
  if(items.length===0){
    cartItemsContainer.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-gray-500">${translations[getLang()].cartEmpty}</td></tr>`;
    cartTotalEl.textContent = 'Bs. 0.00';
    clearCartBtn.disabled = true; checkoutBtn.disabled = true; updateCartCount(); return;
  }
  let total=0;
  // slug helper reused for cart
  const slugify = (str)=>{
    return String(str)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g,'')
      .toLowerCase()
      .replace(/pizza\s+/g,'')
      .replace(/[^a-z0-9]+/g,'-')
      .replace(/(^-|-$)/g,'');
  };

  items.forEach(({id,name,price,quantity,img})=>{
    // Ensure we have an image (fallback from catalog by id)
    const p = [...PIZZAS, ...DRINKS].find(pp=>String(pp.id)===String(id));
    const byName = `assets/img/pizzas/${slugify(name)}.jpg`;
    const byId = `assets/img/pizzas/${id}.jpg`;
    const localImg = byName; // prefer by name
    const remoteImg = p?.img || 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=600';
    img = img || localImg; // try local by name first
    const subtotal = price*quantity; total+=subtotal;
    const tr = document.createElement('tr');
    const cartImgOnError = isTouch
      ? `this.onerror=null; this.src='${remoteImg}';`
      : `if(this.dataset.fallback==='0'){ this.dataset.fallback='1'; this.src='${byId}'; } else { this.onerror=null; this.src='${remoteImg}'; }`;
    tr.innerHTML = `
      <td class="py-3 px-4 border border-primary-200">
        <div class="flex items-center gap-3">
          <img src="${img}" alt="${name}" class="w-16 h-16 object-cover rounded" loading="lazy" referrerpolicy="no-referrer" data-fallback="0"
            onerror="${cartImgOnError}"
          />
          <span class="font-display text-xl font-semibold">${name}</span>
        </div>
      </td>
      <td class="py-3 px-4 border border-primary-200 text-center">
        <div class="inline-flex items-center gap-2">
          <button class="px-2 py-1 bg-primary-600 text-white rounded" data-action="decrease" data-id="${id}" aria-label="Disminuir">-</button>
          <span class="min-w-[2ch] inline-block text-center font-semibold">${quantity}</span>
          <button class="px-2 py-1 bg-primary-600 text-white rounded" data-action="increase" data-id="${id}" aria-label="Aumentar">+</button>
        </div>
      </td>
      <td class="py-3 px-4 border border-primary-200">Bs. ${price.toFixed(2)}</td>
      <td class="py-3 px-4 border border-primary-200">Bs. ${subtotal.toFixed(2)}</td>
      <td class="py-3 px-4 border border-primary-200 text-center">
        <button class="text-red-600 hover:text-red-800" data-action="remove" data-id="${id}" aria-label="Eliminar ${name} del carrito"><i class="fa-solid fa-trash"></i></button>
      </td>`;
    cartItemsContainer.appendChild(tr);
  });
  cartTotalEl.textContent = `Bs. ${total.toFixed(2)}`;
  clearCartBtn.disabled=false; checkoutBtn.disabled=false; updateCartCount();
}

document.addEventListener('click', (e)=>{
  const btn=e.target.closest('.add-to-cart');
  if(btn){
    const id=btn.dataset.id, name=btn.dataset.name, price=parseFloat(btn.dataset.price);
    if(cart[id]) cart[id].quantity+=1; else cart[id]={id,name,price,quantity:1};
    saveCart(); updateCartUI(); showToast(translations[getLang()].toastAdded(name));
  }
  const actionBtn=e.target.closest('button[data-action]');
  if(actionBtn){
    const {action,id}=actionBtn.dataset; if(!cart[id]) return;
    if(action==='increase') cart[id].quantity+=1;
    else if(action==='decrease'){ cart[id].quantity-=1; if(cart[id].quantity<=0) delete cart[id]; }
    else if(action==='remove'){ delete cart[id]; }
    saveCart(); updateCartUI();
  }
});

clearCartBtn?.addEventListener('click', ()=>{ cart={}; saveCart(); updateCartUI(); });
checkoutBtn?.addEventListener('click', ()=>{ if(!Object.keys(cart).length) return; alert(translations[getLang()].checkoutAlert); cart={}; saveCart(); updateCartUI(); });

// --- Contact form ---
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const nombre=contactForm.nombre.value.trim();
  const email=contactForm.email.value.trim();
  const mensaje=contactForm.mensaje.value.trim();
  if(!nombre||!email||!mensaje){ alert(translations[getLang()].contactRequired); return; }
  alert(translations[getLang()].contactThanks(nombre));
  contactForm.reset();
});

// --- Init ---
function init(){
  const lang=getLang(); if(langSelect) langSelect.value=lang; if(langSelectMobile) langSelectMobile.value=lang;
  applyTranslations();
  renderCatalog();
  loadCart(); updateCartUI();
  updateCartLinks();
  // Reveal-on-scroll animations
  const ro = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('revealed'); ro.unobserve(e.target); }
    });
  }, {threshold: 0.1});
  document.querySelectorAll('.reveal-up, .reveal-fade').forEach(el=>ro.observe(el));

  // Optimize hero video for mobile: pause and only play on larger screens when visible
  const heroVideo = document.querySelector('.hero-video-box video');
  if (heroVideo){
    const largeScreen = matchMedia('(min-width: 768px)');
    const handleVideo = ()=>{
      if(!largeScreen.matches){
        heroVideo.removeAttribute('autoplay');
        heroVideo.setAttribute('preload','metadata');
        try{ heroVideo.pause(); }catch(e){}
      }
    };
    handleVideo();
    largeScreen.addEventListener?.('change', handleVideo);
    // Play/pause based on visibility on large screens
    const vr = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(!largeScreen.matches) return;
        if(en.isIntersecting){ try{ heroVideo.play(); }catch(e){} }
        else { try{ heroVideo.pause(); }catch(e){} }
      });
    }, {threshold: 0.25});
    vr.observe(heroVideo);
  }
}
init();
