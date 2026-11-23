(function () {
  "use strict";

  var GLOVO = "https://glovoapp.com/en/tn/tunis/stores/di-napoli-ennasr-tunis";
  var WA = "21629153838";
  var PHONE = "+21629153838";
  var root = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function storeGet(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; }
  }
  function storeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  var state = { lang: "fr", cat: "pizzas", query: "", lbIndex: 0 };

  var savedLang = storeGet("dn-lang", "");
  if (LANGS.indexOf(savedLang) !== -1) {
    state.lang = savedLang;
  } else {
    var navLang = (navigator.language || "fr").slice(0, 2).toLowerCase();
    state.lang = LANGS.indexOf(navLang) !== -1 ? navLang : "fr";
  }

  function t(key) {
    var pack = I18N[state.lang] || I18N.fr;
    return pack[key] !== undefined ? pack[key] : (I18N.fr[key] !== undefined ? I18N.fr[key] : key);
  }

  /* ---------------------------------------------------------------- theme */
  var themeBtn = $("#themeBtn");

  function updateThemeUI() {
    var dark = root.dataset.theme === "dark";
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", dark ? "true" : "false");
      themeBtn.setAttribute("aria-label", t(dark ? "common.themeLight" : "common.themeDark"));
    }
    var meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", dark ? "#16130f" : "#f3ece0");
  }

  function setTheme(theme, save) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    if (save) storeSet("dn-theme", theme);
    updateThemeUI();
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      setTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
    });
  }

  /* ------------------------------------------------------------ i18n core */
  function applyI18n() {
    root.lang = state.lang;
    root.dir = state.lang === "ar" ? "rtl" : "ltr";
    root.dataset.lang = state.lang;

    document.title = t("meta.title");
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.desc"));
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", t("meta.title"));
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", t("meta.desc"));

    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
    $$("[data-i18n-placeholder]").forEach(function (el) { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"))); });
    $$("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    $$("[data-i18n-alt]").forEach(function (el) { el.setAttribute("alt", t(el.getAttribute("data-i18n-alt"))); });

    var langCode = $("#langCode");
    if (langCode) langCode.textContent = LANG_CODES[state.lang];
    if (langBtn) langBtn.setAttribute("aria-label", LANG_CODES[state.lang] + " — " + t("common.language"));
    var langMenu = $("#langMenu");
    if (langMenu) langMenu.setAttribute("aria-label", t("common.language"));
    $$("#langMenu [data-lang]").forEach(function (b) {
      var on = b.getAttribute("data-lang") === state.lang;
      b.setAttribute("aria-selected", on ? "true" : "false");
      b.classList.toggle("active", on);
    });
    $$("[data-set-lang]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-set-lang") === state.lang);
    });

    updateThemeUI();
    updateWaLinks();
    renderPopular();
    renderTabs();
    renderMenu();
    updateTime();
    updateLightboxLang();
    document.body.classList.add("ready");
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1 || lang === state.lang) {
      closeLangMenu(false);
      return;
    }
    state.lang = lang;
    state.query = "";
    var search = $("#menuSearch");
    if (search) search.value = "";
    storeSet("dn-lang", lang);
    applyI18n();
    closeLangMenu(false);
    if (mobileMenu && mobileMenu.classList.contains("open")) closeMobileMenu();
    if (langBtn) langBtn.focus();
  }

  /* --------------------------------------------------------- language menu */
  var lang = $("#lang"), langBtn = $("#langBtn"), langMenu = $("#langMenu");

  function openLangMenu() {
    if (!lang) return;
    lang.classList.add("open");
    if (langBtn) langBtn.setAttribute("aria-expanded", "true");
    var active = langMenu ? langMenu.querySelector('[aria-selected="true"]') : null;
    if (active) active.focus();
  }

  function closeLangMenu(refocus) {
    if (!lang) return;
    var wasOpen = lang.classList.contains("open");
    lang.classList.remove("open");
    if (langBtn) langBtn.setAttribute("aria-expanded", "false");
    if (refocus && wasOpen && langBtn) langBtn.focus();
  }

  if (langBtn) {
    langBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (lang.classList.contains("open")) closeLangMenu(true);
      else openLangMenu();
    });
  }
  if (langMenu) {
    langMenu.addEventListener("keydown", function (e) {
      var opts = $$("[data-lang]", langMenu);
      var i = opts.indexOf(document.activeElement);
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        var next = e.key === "ArrowDown" ? (i + 1) % opts.length : (i - 1 + opts.length) % opts.length;
        opts[next].focus();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeLangMenu(true);
      }
    });
    $$("[data-lang]", langMenu).forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
  }
  document.addEventListener("click", function (e) {
    if (lang && !lang.contains(e.target)) closeLangMenu(false);
  });
  $$("[data-set-lang]").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-set-lang")); });
  });

  /* -------------------------------------------------------------- mobile menu */
  var mobileMenu = $("#mobileMenu");
  var burger = $("#burger");
  var menuClose = $("#menuClose");
  var menuReturnFocus = null;

  function openMobileMenu() {
    if (!mobileMenu) return;
    menuReturnFocus = document.activeElement;
    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    if (burger) burger.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
    if (menuClose) setTimeout(function () { menuClose.focus(); }, 60);
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    if (burger) burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    if (menuReturnFocus && typeof menuReturnFocus.focus === "function") menuReturnFocus.focus();
  }

  if (burger) burger.addEventListener("click", openMobileMenu);
  if (menuClose) menuClose.addEventListener("click", closeMobileMenu);
  if (mobileMenu) {
    $$('a[href^="#"]', mobileMenu).forEach(function (a) { a.addEventListener("click", closeMobileMenu); });
    mobileMenu.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var focusable = $$("a[href], button:not([disabled])", mobileMenu).filter(function (el) { return el.offsetParent !== null; });
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ------------------------------------------------------------------- menu */
  var tabs = $("#menuTabs");
  var panel = $("#menuPanel");
  var countEl = $("#menuCount");
  var searchInput = $("#menuSearch");

  function placePill() {
    if (!tabs) return;
    var active = tabs.querySelector('[aria-selected="true"]');
    var pill = tabs.querySelector(".tab-pill");
    if (!active || !pill) return;
    pill.style.left = active.offsetLeft + "px";
    pill.style.width = active.offsetWidth + "px";
  }

  function renderTabs() {
    if (!tabs) return;
    tabs.innerHTML = "";
    MENU_ORDER.forEach(function (cat) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "tab";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-controls", "menuPanel");
      b.setAttribute("aria-selected", cat === state.cat ? "true" : "false");
      b.tabIndex = cat === state.cat ? 0 : -1;
      b.setAttribute("data-cat", cat);
      b.textContent = MENU[cat].label[state.lang];
      b.addEventListener("click", function () { selectCat(cat); });
      b.addEventListener("keydown", onTabKey);
      tabs.appendChild(b);
    });
    var pill = document.createElement("span");
    pill.className = "tab-pill";
    pill.setAttribute("aria-hidden", "true");
    tabs.appendChild(pill);
    placePill();
    requestAnimationFrame(placePill);
    setTimeout(placePill, 120);
  }

  function onTabKey(e) {
    var opts = $$(".tab", tabs);
    var i = opts.indexOf(e.currentTarget);
    var next = null;
    if (e.key === "ArrowRight") next = opts[(i + 1) % opts.length];
    else if (e.key === "ArrowLeft") next = opts[(i - 1 + opts.length) % opts.length];
    else if (e.key === "Home") next = opts[0];
    else if (e.key === "End") next = opts[opts.length - 1];
    if (next) {
      e.preventDefault();
      next.focus();
      selectCat(next.getAttribute("data-cat"));
    }
  }

  function selectCat(cat) {
    state.cat = cat;
    state.query = "";
    if (searchInput) searchInput.value = "";
    $$(".tab", tabs).forEach(function (b) {
      var on = b.getAttribute("data-cat") === cat;
      b.setAttribute("aria-selected", on ? "true" : "false");
      b.tabIndex = on ? 0 : -1;
    });
    placePill();
    renderMenu();
    var active = tabs.querySelector('[aria-selected="true"]');
    if (active) active.scrollIntoView({ inline: "center", block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }

  function dishHTML(item, isPizza, i) {
    var name = item.name[state.lang];
    var desc = item.desc ? item.desc[state.lang] : "";
    if (isPizza) {
      return '<article class="dish dish-pizza" style="--i:' + i + '">' +
        '<div class="dish-top"><h4>' + name + '</h4><span class="dish-lead" aria-hidden="true"></span></div>' +
        (desc ? '<p class="dish-desc">' + desc + '</p>' : "") +
        '<div class="dish-sizes">' + item.prices.map(function (p, idx) {
          return '<div class="size"><small>' + PIZZA_SIZES[state.lang][idx] + '</small><b>' + p + ' <em>DT</em></b></div>';
        }).join("") + '</div>' +
        '</article>';
    }
    return '<article class="dish" style="--i:' + i + '">' +
      '<div class="dish-top"><h4>' + name + '</h4><span class="dish-lead" aria-hidden="true"></span><span class="dish-price">' + item.price + ' <small>DT</small></span></div>' +
      (desc ? '<p class="dish-desc">' + desc + '</p>' : "") +
      '</article>';
  }

  function renderMenu() {
    if (!panel) return;
    var cat = MENU[state.cat];
    var q = state.query.trim().toLowerCase();
    var items = cat.items.filter(function (item) {
      if (!q) return true;
      var hay = item.name[state.lang] + " " + (item.desc ? item.desc[state.lang] : "") + " " + cat.label[state.lang];
      return hay.toLowerCase().indexOf(q) !== -1;
    });
    if (!items.length) {
      panel.innerHTML = '<p class="menu-empty">' + t("common.noResults") + '</p>';
      if (countEl) countEl.textContent = "";
      return;
    }
    panel.innerHTML = items.map(function (item, i) { return dishHTML(item, state.cat === "pizzas", i); }).join("");
    if (countEl) countEl.textContent = t(items.length === 1 ? "menu.countOne" : "menu.count").replace("{n}", items.length);
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      state.query = searchInput.value;
      renderMenu();
    });
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { searchInput.value = ""; state.query = ""; renderMenu(); }
    });
  }

  function renderPopular() {
    var grid = $("#popularGrid");
    if (!grid) return;
    grid.innerHTML = POPULAR.map(function (p, i) {
      var item = MENU[p.cat].items[p.index];
      var name = item.name[state.lang];
      var price = p.size !== undefined && p.size !== null ? item.prices[p.size] : item.price;
      var sizeLabel = p.size !== undefined && p.size !== null ? PIZZA_SIZES[state.lang][p.size] : "";
      return '<button class="pop-card" type="button" data-cat="' + p.cat + '" style="--i:' + i + '">' +
        '<span class="pop-num">0' + (i + 1) + '</span>' +
        '<span class="pop-name"><strong>' + name + '</strong>' +
        (sizeLabel ? '<small>' + sizeLabel + '</small>' : "") + '</span>' +
        '<span class="pop-price">' + price + ' <em>DT</em></span>' +
        '<span class="pop-cta">' + t("common.order") + '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></span>' +
        '</button>';
    }).join("");
  }

  var popularGrid = $("#popularGrid");
  if (popularGrid) {
    popularGrid.addEventListener("click", function (e) {
      var card = e.target.closest(".pop-card");
      if (!card) return;
      selectCat(card.getAttribute("data-cat"));
      var toolbar = $(".menu-toolbar");
      if (toolbar) toolbar.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* --------------------------------------------------------------- wa links */
  function updateWaLinks() {
    var msg = encodeURIComponent(t("contact.waOrder"));
    $$("[data-wa]").forEach(function (a) { a.setAttribute("href", "https://wa.me/" + WA + "?text=" + msg); });
  }

  /* --------------------------------------------------------------- time */
  var localTimeEl = $("#localTime");
  function updateTime() {
    if (!localTimeEl) return;
    try {
      var fmt = new Intl.DateTimeFormat(state.lang === "ar" ? "ar-TN-u-nu-latn" : state.lang, {
        timeZone: "Africa/Tunis", hour: "2-digit", minute: "2-digit", hour12: false
      });
      localTimeEl.textContent = fmt.format(new Date());
    } catch (e) {
      localTimeEl.textContent = new Date().toLocaleTimeString();
    }
  }

  /* --------------------------------------------------------------- flips */
  $$(".flip-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".flip");
      var on = card.classList.toggle("open");
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  });

  /* --------------------------------------------------------------- lightbox */
  var shots = $$(".shot");
  var lightbox = $("#lightbox");
  var lbImg = $("#lbImg");
  var lbCap = $("#lbCap");
  var lbCount = $("#lbCount");
  var lbReturnFocus = null;

  function updateLightboxLang() {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    var shot = shots[state.lbIndex];
    if (shot) lbCap.textContent = t(shot.getAttribute("data-cap"));
  }

  function showLb(i) {
    if (!shots.length) return;
    state.lbIndex = (i + shots.length) % shots.length;
    var shot = shots[state.lbIndex];
    var img = shot.querySelector("img");
    if (img && lbImg) {
      lbImg.setAttribute("src", img.getAttribute("src").replace(/w=\d+/, "w=1600"));
      lbImg.setAttribute("alt", img.getAttribute("alt") || "");
    }
    if (lbCap) lbCap.textContent = t(shot.getAttribute("data-cap"));
    if (lbCount) lbCount.textContent = (state.lbIndex + 1) + " / " + shots.length;
    var fig = $(".lb-figure");
    if (fig) fig.classList.remove("noimg");
  }

  function openLb(i) {
    if (!lightbox) return;
    lbReturnFocus = document.activeElement;
    showLb(i);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lb-open");
    var closeBtn = $("#lbClose");
    if (closeBtn) setTimeout(function () { closeBtn.focus(); }, 60);
  }

  function closeLb() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lb-open");
    if (lbReturnFocus && typeof lbReturnFocus.focus === "function") lbReturnFocus.focus();
  }

  shots.forEach(function (shot, i) {
    shot.addEventListener("click", function () { openLb(i); });
  });
  var lbClose = $("#lbClose");
  var lbPrev = $("#lbPrev");
  var lbNext = $("#lbNext");
  if (lbClose) lbClose.addEventListener("click", closeLb);
  if (lbPrev) lbPrev.addEventListener("click", function () { showLb(state.lbIndex - 1); });
  if (lbNext) lbNext.addEventListener("click", function () { showLb(state.lbIndex + 1); });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLb(); });
  }
  document.addEventListener("keydown", function (e) {
    if (lightbox && lightbox.classList.contains("open")) {
      if (e.key === "Escape") closeLb();
      else if (e.key === "ArrowLeft") showLb(state.lbIndex - 1);
      else if (e.key === "ArrowRight") showLb(state.lbIndex + 1);
    }
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("open")) closeMobileMenu();
    if (e.key === "Escape" && lang && lang.classList.contains("open")) closeLangMenu(true);
  });

  /* --------------------------------------------------------------- form */
  var form = $("#waForm");
  var waName = $("#waName");
  var waMsg = $("#waMsg");
  var formError = $("#formError");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = waName ? waName.value.trim() : "";
      var message = waMsg ? waMsg.value.trim() : "";
      if (!name || !message) {
        if (formError) { formError.textContent = t("contact.required"); formError.hidden = false; }
        if (!name && waName) waName.focus();
        else if (waMsg) waMsg.focus();
        return;
      }
      if (formError) formError.hidden = true;
      var text = t("contact.waGreeting").replace("{name}", name).replace("{message}", message);
      var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(text);
      showToast(t("contact.sending"));
      window.open(url, "_blank", "noopener");
    });
    [waName, waMsg].forEach(function (el) {
      if (el) el.addEventListener("input", function () { if (formError) formError.hidden = true; });
    });
  }

  /* --------------------------------------------------------------- toast */
  var toast = $("#toast");
  var toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 3200);
  }

  /* --------------------------------------------------------------- counters */
  function animateCounts(scope) {
    $$("[data-count]", scope).forEach(function (el) {
      if (el.getAttribute("data-done")) return;
      el.setAttribute("data-done", "1");
      var target = parseFloat(el.getAttribute("data-count"));
      var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
      var start = performance.now();
      var duration = reduced ? 0 : 1500;
      function frame(now) {
        var p = duration ? Math.min((now - start) / duration, 1) : 1;
        var eased = 1 - Math.pow(1 - p, 3);
        var value = target * eased;
        var sep = state.lang === "fr" || state.lang === "it" ? "," : ".";
        el.textContent = dec ? value.toFixed(dec).replace(".", sep) : String(Math.round(value));
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = dec ? target.toFixed(dec).replace(".", sep) : String(target);
      }
      requestAnimationFrame(frame);
    });
  }

  /* --------------------------------------------------------------- reveal */
  var revealEls = $$("[data-reveal]");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        animateCounts(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
    animateCounts(document);
  }

  /* --------------------------------------------------------------- scroll */
  var header = $("#header");
  var progress = $("#progress");
  var toTop = $("#toTop");
  var spySections = ["top", "carte", "histoire", "galerie", "avis", "contact"].map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);

  function updateSpy() {
    if (!header) return;
    var y = window.scrollY + header.offsetHeight + 120;
    var current = spySections[0];
    spySections.forEach(function (sec) { if (sec.offsetTop <= y) current = sec; });
    $$("#mainNav a").forEach(function (a) {
      var on = a.getAttribute("href") === "#" + current.id;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  var ticking = false;
  function onScroll() {
    var st = window.scrollY || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = "scaleX(" + (max > 0 ? Math.min(st / max, 1) : 0) + ")";
    if (header) header.classList.toggle("scrolled", st > 12);
    if (toTop) toTop.classList.toggle("show", st > 700);
    updateSpy();
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () { onScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); });

  /* --------------------------------------------------------------- hero tilt */
  var heroArt = $("#heroArt");
  var pizza = $("#pizza");
  if (heroArt && pizza && canHover && !reduced) {
    heroArt.addEventListener("pointermove", function (e) {
      var r = heroArt.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      pizza.style.setProperty("--ry", (x * 36) + "deg");
      pizza.style.setProperty("--rx", (54 - y * 26) + "deg");
      heroArt.style.setProperty("--px", (x * 16) + "px");
      heroArt.style.setProperty("--py", (y * 16) + "px");
    });
    heroArt.addEventListener("pointerleave", function () {
      pizza.style.removeProperty("--ry");
      pizza.style.removeProperty("--rx");
      heroArt.style.removeProperty("--px");
      heroArt.style.removeProperty("--py");
    });
  }

  /* --------------------------------------------------------------- images */
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (!img || img.tagName !== "IMG") return;
    var host = img.closest(".shot, .story-photo, .story-mini, .lb-figure");
    if (host) host.classList.add("noimg");
    img.style.opacity = "0";
  }, true);

  /* --------------------------------------------------------------- loader */
  var loader = $("#loader");
  function hideLoader() {
    if (!loader || loader.classList.contains("done")) return;
    loader.classList.add("done");
    setTimeout(function () { if (loader && loader.parentNode) loader.parentNode.removeChild(loader); }, 650);
  }
  window.addEventListener("load", function () { setTimeout(hideLoader, reduced ? 0 : 480); });
  setTimeout(hideLoader, 2800);

  /* --------------------------------------------------------------- init */
  function init() {
    $$("[data-glovo]").forEach(function (a) { a.setAttribute("href", GLOVO); });
    $$('a[href^="tel:"]').forEach(function (a) { a.setAttribute("href", "tel:" + PHONE); });
    var year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
    applyI18n();
    onScroll();
    updateTime();
    setInterval(updateTime, 30000);
    window.addEventListener("resize", function () { requestAnimationFrame(placePill); });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { requestAnimationFrame(placePill); });
    }
  }

  init();
})();
