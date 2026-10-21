import { useEffect } from "react";

/** Progressive enhancement: content stays visible without motion support. */
export default function useScrollMotion(filter) {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    function setup() {
      cleanup();
      const root = document.documentElement;
      const targets = [
        ...document.querySelectorAll(
          ".section-heading > *, .project, .about > div > h2, .about > div > .eyebrow, .about-copy > *, .timeline, .toolkit > div, .versions > *, .contact > h2, .contact > .eyebrow, .contact > p, .contact-form, .contact-actions",
        ),
      ];
      const photos = [...document.querySelectorAll("[data-parallax]")];
      const reset = () => {
        targets.forEach((el) => el.classList.remove("reveal", "in-view"));
        photos.forEach((el) => el.style.removeProperty("--parallax-y"));
        root.classList.remove("motion-ready");
      };
      if (preference.matches || !("IntersectionObserver" in window)) {
        reset();
        cleanup = reset;
        return;
      }
      root.classList.add("motion-ready");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
      );
      targets.forEach((el) => {
        el.classList.add("reveal");
        // A small stagger within each content group; never wait for a long queue.
        const index = [...el.parentElement.children].indexOf(el);
        el.style.setProperty(
          "--reveal-delay",
          `${Math.min(index % 3, 2) * 85}ms`,
        );
        observer.observe(el);
      });
      // Keyboard navigation must never land on hidden content.
      const onFocus = (e) =>
        e.target.closest(".reveal")?.classList.add("in-view");
      document.addEventListener("focusin", onFocus);
      let frame = 0;
      function update() {
        frame = 0;
        const available = root.scrollHeight - window.innerHeight;
        root.style.setProperty(
          "--scroll-progress",
          available > 0
            ? Math.min(1, Math.max(0, window.scrollY / available))
            : 0,
        );
        root.classList.toggle("has-scrolled", window.scrollY > 30);
        photos.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.bottom > -80 && rect.top < window.innerHeight + 80) {
            const amount =
              (window.innerHeight / 2 - (rect.top + rect.height / 2)) *
              Number(el.dataset.parallax);
            el.style.setProperty(
              "--parallax-y",
              `${Math.max(-24, Math.min(24, amount))}px`,
            );
          }
        });
      }
      const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      update();
      cleanup = () => {
        observer.disconnect();
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        document.removeEventListener("focusin", onFocus);
        cancelAnimationFrame(frame);
        reset();
      };
    }
    setup();
    preference.addEventListener("change", setup);
    return () => {
      cleanup();
      preference.removeEventListener("change", setup);
    };
  }, [filter]);
}
