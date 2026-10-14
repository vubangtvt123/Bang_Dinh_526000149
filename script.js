"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* Khởi tạo hiệu ứng cuộn nếu CDN AOS tải thành công. */
  if (typeof window.AOS !== "undefined") {
    try {
      document.documentElement.classList.add("aos-ready");
      window.AOS.init({
        duration: 750,
        easing: "ease-out-cubic",
        once: true,
        offset: 70,
        disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      });
    } catch (_error) {
      document.documentElement.classList.remove("aos-ready");
    }
  }

  const body = document.body;
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector(".primary-nav");
  const productCards = [...document.querySelectorAll(".product-card")];
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const noProducts = document.querySelector(".no-products");
  const toast = document.querySelector(".toast");
  let toastTimer;

  const normalizeText = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();

  const formatCurrency = (value) => new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(value);

  const showToast = (message) => {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("show");
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3000);
  };

  /* Trạng thái header và menu mobile. */
  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 20);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const closeMenu = () => {
    menuButton.classList.remove("open");
    primaryNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Mở menu");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuButton.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Đóng menu" : "Mở menu");
  });

  primaryNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  /* Lọc sản phẩm theo danh mục. */
  const filterProducts = (category = "all", searchTerm = "") => {
    const normalizedTerm = normalizeText(searchTerm);
    let visibleCount = 0;

    productCards.forEach((card) => {
      const matchesCategory = category === "all" || card.dataset.category === category;
      const matchesSearch = !normalizedTerm || normalizeText(card.dataset.name).includes(normalizedTerm);
      const shouldShow = matchesCategory && matchesSearch;
      card.hidden = !shouldShow;
      if (shouldShow) visibleCount += 1;
    });

    noProducts.hidden = visibleCount !== 0;
    return visibleCount;
  };

  const setActiveFilter = (category) => {
    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === category;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    filterProducts(category);
  };

  filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));
    button.addEventListener("click", () => setActiveFilter(button.dataset.filter));
  });

  document.querySelectorAll("[data-category-link], [data-nav-filter], [data-footer-filter]").forEach((link) => {
    link.addEventListener("click", () => {
      const category = link.dataset.categoryLink || link.dataset.navFilter || link.dataset.footerFilter || "all";
      setActiveFilter(category);
    });
  });

  /* Hộp thoại tìm kiếm sản phẩm. */
  const searchDialog = document.querySelector("#search-dialog");
  const searchTrigger = document.querySelector(".search-trigger");
  const searchClose = document.querySelector(".search-close");
  const searchInput = document.querySelector("#search-input");
  const searchStatus = document.querySelector("#search-status");

  const openSearch = () => {
    if (typeof searchDialog.showModal === "function") {
      searchDialog.showModal();
      window.setTimeout(() => searchInput.focus(), 50);
    } else {
      searchDialog.setAttribute("open", "");
      searchInput.focus();
    }
  };

  const closeSearch = () => {
    if (typeof searchDialog.close === "function" && searchDialog.open) {
      searchDialog.close();
    } else {
      searchDialog.removeAttribute("open");
    }
  };

  searchTrigger.addEventListener("click", openSearch);
  searchClose.addEventListener("click", closeSearch);
  searchDialog.addEventListener("click", (event) => {
    if (event.target === searchDialog) closeSearch();
  });

  searchInput.addEventListener("input", () => {
    const term = searchInput.value;
    if (!term.trim()) {
      filterProducts("all");
      searchStatus.textContent = "Nhập tên sản phẩm để bắt đầu tìm kiếm.";
      return;
    }

    const found = filterProducts("all", term);
    filterButtons.forEach((button) => button.classList.remove("active"));
    searchStatus.textContent = found
      ? `Tìm thấy ${found} sản phẩm phù hợp.`
      : "Không tìm thấy sản phẩm. Hãy thử từ khóa khác.";

  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || !searchInput.value.trim()) return;
    event.preventDefault();
    closeSearch();
    document.querySelector("#san-pham").scrollIntoView({ behavior: "smooth" });
  });

  /* Giỏ hàng cục bộ: chỉ tồn tại trong phiên đang mở. */
  const cart = new Map();
  const cartTrigger = document.querySelector(".cart-trigger");
  const cartDrawer = document.querySelector(".cart-drawer");
  const cartClose = document.querySelector(".cart-close");
  const pageOverlay = document.querySelector(".page-overlay");
  const cartCount = document.querySelector(".cart-count");
  const cartTitleCount = document.querySelector(".cart-title-count");
  const cartItems = document.querySelector(".cart-items");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total strong");
  let lastFocusedElement = null;

  const openCart = () => {
    lastFocusedElement = document.activeElement;
    cartDrawer.classList.add("open");
    pageOverlay.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    cartTrigger.setAttribute("aria-expanded", "true");
    body.classList.add("no-scroll");
    cartClose.focus();
  };

  const closeCart = () => {
    cartDrawer.classList.remove("open");
    pageOverlay.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    cartTrigger.setAttribute("aria-expanded", "false");
    body.classList.remove("no-scroll");
    if (lastFocusedElement) lastFocusedElement.focus();
  };

  const renderCart = () => {
    const entries = [...cart.values()];
    const itemCount = entries.reduce((sum, item) => sum + item.quantity, 0);
    const total = entries.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartCount.textContent = String(itemCount);
    cartTitleCount.textContent = `(${itemCount})`;
    cartTotal.textContent = formatCurrency(total);
    cartFooter.hidden = entries.length === 0;

    if (!entries.length) {
      cartItems.innerHTML = `
        <section class="empty-cart">
          <span aria-hidden="true">◇</span>
          <p>Giỏ hàng của bạn đang trống.</p>
          <a href="#san-pham" class="text-link cart-shop-link">Khám phá sản phẩm →</a>
        </section>`;
      cartItems.querySelector(".cart-shop-link").addEventListener("click", closeCart);
      return;
    }

    cartItems.innerHTML = entries.map((item) => `
      <article class="cart-item" data-cart-id="${item.id}">
        <img src="${item.image}" alt="${item.name}">
        <section>
          <h3>${item.name}</h3>
          <p>${formatCurrency(item.price)}</p>
          <section class="cart-item-controls" aria-label="Số lượng ${item.name}">
            <button type="button" data-action="decrease" aria-label="Giảm số lượng">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-action="increase" aria-label="Tăng số lượng">+</button>
          </section>
        </section>
        <button class="remove-item" type="button" data-action="remove" aria-label="Xóa ${item.name}">×</button>
      </article>`).join("");
  };

  productCards.forEach((card, index) => {
    card.querySelector(".quick-add").addEventListener("click", () => {
      const id = `product-${index + 1}`;
      const existing = cart.get(id);
      const name = card.dataset.name;

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.set(id, {
          id,
          name,
          price: Number(card.dataset.price),
          image: card.querySelector("img").src,
          quantity: 1
        });
      }

      renderCart();
      showToast(`Đã thêm “${name}” vào giỏ hàng.`);
    });
  });

  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const itemElement = button.closest(".cart-item");
    const item = cart.get(itemElement.dataset.cartId);
    if (!item) return;

    if (button.dataset.action === "increase") item.quantity += 1;
    if (button.dataset.action === "decrease") item.quantity -= 1;
    if (button.dataset.action === "remove" || item.quantity <= 0) cart.delete(item.id);
    renderCart();
  });

  cartTrigger.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  pageOverlay.addEventListener("click", closeCart);

  document.querySelector(".checkout-button").addEventListener("click", () => {
    showToast("Đây là website minh họa; chức năng thanh toán chưa được triển khai.");
  });

  /* Đăng ký nhận tin với kiểm tra email ở phía trình duyệt. */
  const newsletterForm = document.querySelector("#newsletter-form");
  const emailInput = document.querySelector("#newsletter-email");
  const formMessage = document.querySelector("#newsletter-message");

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.className = "form-message";

    if (!emailInput.value.trim()) {
      formMessage.textContent = "Vui lòng nhập địa chỉ email của bạn.";
      formMessage.classList.add("error");
      emailInput.setAttribute("aria-invalid", "true");
      emailInput.focus();
      return;
    }

    if (!emailInput.validity.valid) {
      formMessage.textContent = "Email chưa đúng định dạng. Ví dụ: ban@email.com";
      formMessage.classList.add("error");
      emailInput.setAttribute("aria-invalid", "true");
      emailInput.focus();
      return;
    }

    formMessage.textContent = "Đăng ký thành công! Cảm ơn bạn đã quan tâm đến LUXE.";
    formMessage.classList.add("success");
    emailInput.removeAttribute("aria-invalid");
    newsletterForm.reset();
  });

  emailInput.addEventListener("input", () => {
    emailInput.removeAttribute("aria-invalid");
    formMessage.textContent = "";
    formMessage.className = "form-message";
  });

  document.querySelector(".account-button").addEventListener("click", () => {
    showToast("Khu vực tài khoản đang ở chế độ minh họa.");
  });

  /* Giữ bố cục ổn định và hiển thị nền thay thế khi ảnh ngoài không tải được. */
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-fallback");
      image.removeAttribute("src");
    }, { once: true });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && cartDrawer.classList.contains("open")) closeCart();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMenu();
  });

  renderCart();
});
