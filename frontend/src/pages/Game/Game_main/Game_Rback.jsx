/* import { useEffect, useRef } from "react";
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
    const particleCount = 500;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const angularSpeedMin = 0.003;
    const angularSpeedMax = 0.005;

    const radiusSpeedMin = -0.05;
    const radiusSpeedMax = 0.05;

    const minRadius = 70;
    const maxRadius = Math.min(canvas.width, canvas.height) / 1.5;

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
        radiusSpeed: (Math.random() - 0.5) * 1.2,
        angularSpeed: Math.random() * 0.009 + 0.004,
      });
    }

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
 */

import { useEffect, useRef } from "react";
import "./Game_Rback.scss";

export default function RBack() {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const particleCount = 500;
    const minRadius = 70;
    const maxRadius = Math.min(window.innerWidth, window.innerHeight) / 1.5;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * (maxRadius - minRadius) + minRadius;
      const angle = Math.random() * 2 * Math.PI;
      particles.push({
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.5 + 0.3,
        angle,
        radius,
        radiusSpeed: (Math.random() - 0.5) * 1.2,
        angularSpeed: Math.random() * 0.009 + 0.004,
      });
    }

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
        const y = centerY + Math.sin(p.angle * 1.1) * p.radius * 0.6;

        ctx.beginPath();
        ctx.fillStyle = `rgba(125, 135, 155, ${p.opacity})`;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationIdRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  return (
    <section className="rankingmodebackground">
      <canvas ref={canvasRef} className="sandstorm-canvas" />
    </section>
  );
}
