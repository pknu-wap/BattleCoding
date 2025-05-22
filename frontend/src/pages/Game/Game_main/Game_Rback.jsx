import { useEffect, useRef } from "react";
import "./Game_Rback.scss";

export default function RBack() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const particleCount = 1500;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const angularSpeedMin = 0.003;
    const angularSpeedMax = 0.005;

    const radiusSpeedMin = -0.05;
    const radiusSpeedMax = 0.05;

    const minRadius = 50;
    const maxRadius = Math.min(canvas.width, canvas.height) / 1.2;

    //    const maxRadius = canvas.width / 1.5;
    //    const minRadius = 10;

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * (maxRadius - minRadius) + minRadius;
      const angle = Math.random() * 2 * Math.PI;
      particles.push({
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.5 + 0.3,

        speedX: Math.random() * 3 + 2,
        speedY: Math.random() * 1 - 0.5,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        angle: angle,
        radius: radius,
        radiusSpeed: (Math.random() - 0.5) * 1.5,
        angularSpeed: Math.random() * 0.009 + 0.004,

        // radiusSpeed: Math.random() * (radiusSpeedMax - radiusSpeedMin) + radiusSpeedMin,
        // angularSpeed: Math.random() * (angularSpeedMax - angularSpeedMin) + angularSpeedMin,
      });
    }

    /* 오른쪽 -> 왼쪽 */
    /* function animate() {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(120, 100, 80, ${p.opacity})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x -= p.speedX;
        p.y += p.speedY;

        if (p.x < 0) {
          p.x = canvas.width + Math.random() * 50;
          p.y = Math.random() * canvas.height;
        }
      }); */

    /* 소용돌이 */
    /*     function animate() {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "lighter";

      particles.forEach((p) => {
        const speedFactor = (maxRadius - p.radius) / maxRadius;
        const adjustedAngularSpeed = p.angularSpeed * (0.3 + 0.7 * speedFactor);

        p.angle += adjustedAngularSpeed;
        p.radius += p.radiusSpeed;

        if (p.radius > maxRadius) p.radiusSpeed *= -1;
        if (p.radius < minRadius) p.radiusSpeed *= -1;

        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * p.radius;

        ctx.beginPath();
        ctx.fillStyle = `rgba(120, 100, 80, ${p.opacity})`;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }); */

    /* 파형 */
    function animate() {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "overlay";

      particles.forEach((p) => {
        const speedFactor = (maxRadius - p.radius) / maxRadius;
        const adjustedAngularSpeed = p.angularSpeed * (0.4 + 0.6 * speedFactor);

        p.angle += adjustedAngularSpeed;
        p.radius += p.radiusSpeed;
        p.opacity = 0.15 + Math.random() * 0.1;

        if (p.radius > maxRadius || p.radius < minRadius) {
          p.radiusSpeed *= -1;
        }

        const x = centerX + Math.cos(p.angle) * p.radius;
        // 제거 버전 const y = centerY + Math.sin(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle * 1.1) * p.radius * 0.6;

        ctx.beginPath();
        ctx.fillStyle = `rgba(125, 135, 155, ${p.opacity})`;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      /* 무한대모양 */
      /*     function animate() {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "lighter";

      particles.forEach((p) => {
        const speedFactor = (p.radius - minRadius) / (maxRadius - minRadius);
        const adjustedAngularSpeed = p.angularSpeed * (0.5 + 1.5 * speedFactor);

        p.angle += adjustedAngularSpeed;
        p.radius += p.radiusSpeed;

        if (p.radius > maxRadius || p.radius < minRadius) {
          p.radiusSpeed *= -1;
        }

        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle * 1.3) * p.radius * 0.9;

        ctx.beginPath();
        ctx.fillStyle = `rgba(120, 100, 80, ${p.opacity})`;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }); */

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section className="rankingmodebackground">
      <canvas ref={canvasRef} className="sandstorm-canvas" />
    </section>
  );
}
