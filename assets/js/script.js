/* ==========================
   NAV: Toggle mobile menu
========================== */
const navToggle = document.querySelector(".ok-nav-toggle");
const navBlock = document.querySelector(".ok-nav");

if (navToggle && navBlock) {
  navToggle.addEventListener("click", () => {
    const isOpen = navBlock.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Tutup menu ketika link diklik (UX baik)
  navBlock.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
      navBlock.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Esc untuk menutup
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navBlock.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".ok-form__fields");
  const btn = document.querySelector(".ok-btn-send");
  if (!form || !btn) return;

  const fields = Array.from(form.querySelectorAll("input, textarea"));

  // ===== VALIDASI SETIAP FIELD =====
  const validators = {
    email: (v) => /^\S+@\S+\.\S+$/.test(v.trim()),
    telepon: (v) => /^[0-9+()\-\s]{6,}$/.test(v.trim()), // wajib dan minimal 6 karakter
    default: (v) => v.trim().length > 0,
  };

  // ===== CEK INPUT SAAT KLIK KIRIM =====
  btn.addEventListener("click", () => {
    let firstInvalid = null;
    fields.forEach((el) => {
      const val = el.value || "";
      const name = el.getAttribute("name");
      const valid =
        name === "email"
          ? validators.email(val)
          : name === "telepon"
          ? validators.telepon(val)
          : validators.default(val);

      el.classList.toggle("is-invalid", !valid);
      if (!valid && !firstInvalid) firstInvalid = el;
    });
    if (firstInvalid) firstInvalid.focus();
  });

  // ===== HAPUS EFEK MERAH SAAT INPUT DIKETIK =====
  fields.forEach((el) => {
    el.addEventListener("input", () => el.classList.remove("is-invalid"));
  });
});

// ===== PRODUCT LIST =====
document.querySelectorAll(".ok-products").forEach((section) => {
  const btn = section.querySelector(".ok-prod-toggle");
  if (!btn) return;
  const updateText = () => {
    btn.textContent = section.classList.contains("is-expanded")
      ? "Tampilkan lebih sedikit produk ↑"
      : "Tampilkan lebih banyak produk ↓";
  };
  updateText();
  btn.addEventListener("click", () => {
    section.classList.toggle("is-expanded");
    updateText();
  });
});
