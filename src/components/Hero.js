const TILT_DEGREES = 8;

/**
 * Adds a subtle 3D mouse-tilt parallax to the hero product visual.
 * Disabled automatically on touch (coarse-pointer) devices.
 */
export function initHero() {
  const hero = document.getElementById("home");
  const visual = document.getElementById("hero-visual");

  if (!hero || !visual) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;

  hero.addEventListener("mousemove", (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    visual.style.transform = `perspective(900px) rotateX(${(-y * TILT_DEGREES).toFixed(2)}deg) rotateY(${(
      x * TILT_DEGREES
    ).toFixed(2)}deg) translateZ(0)`;
  });

  hero.addEventListener("mouseleave", () => {
    visual.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  });
}
