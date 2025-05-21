import { useEffect, useRef } from "react";
import "./Game_Rback.scss";

export default function RBack() {
  const canvasRef = useRef(null);

  /*   useEffect(() => {
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

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 0.7 + 0.3,
        speedX: Math.random() * 3 + 2,
        speedY: Math.random() * 1 - 0.5,
        opacity: Math.random() * 0.3 + 0.05,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(210, 180, 140, ${p.opacity})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x -= p.speedX;
        p.y += p.speedY;

        if (p.x < 0) {
          p.x = canvas.width + Math.random() * 50;
          p.y = Math.random() * canvas.height;
        }
      });

      소용돌이

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const particleCount = 1000;

    const maxRadius = canvas.width / 1.5;
    const minRadius = 10;

    const angularSpeedMin = 0.01;
    const angularSpeedMax = 0.03;

    const radiusSpeedMin = -0.05;
    const radiusSpeedMax = 0.05;

    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const radius = Math.random() * (maxRadius - minRadius) + minRadius;
      particles.push({
        angle: angle,
        radius: radius,
        radiusSpeed: Math.random() * (radiusSpeedMax - radiusSpeedMin) + radiusSpeedMin,
        angularSpeed: Math.random() * (angularSpeedMax - angularSpeedMin) + angularSpeedMin,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.3 + 0.2,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        ctx.fillStyle = `rgba(194, 158, 109, ${p.opacity})`;
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []); */

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const particles = [];
    const particleCount = 1000;

    const angularSpeedMin = 0.001;
    const angularSpeedMax = 0.003;

    const minRadius = 50;
    const maxRadius = Math.min(canvas.width, canvas.height) / 1.2;

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * (maxRadius - minRadius) + minRadius;

      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius,
        radiusSpeed: 0,
        // Math.random() * 0.5 - 0.25,
        angularSpeed: 0.002,
        // Math.random() * (angularSpeedMax - angularSpeedMin) + angularSpeedMin,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        const speedFactor = (maxRadius - p.radius) / maxRadius;
        const adjustedAngularSpeed = p.angularSpeed * (0.4 + 0.6 * speedFactor);

        p.angle += adjustedAngularSpeed;
        p.radius += p.radiusSpeed;

        if (p.radius > maxRadius || p.radius < minRadius) {
          p.radiusSpeed *= -1;
        }

        const x = centerX + Math.cos(p.angle) * p.radius;
        // 제거 버전 const y = centerY + Math.sin(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle * 1.1) * p.radius * 0.6;

        ctx.beginPath();
        ctx.fillStyle = `rgba(210, 180, 140, ${p.opacity})`;
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
