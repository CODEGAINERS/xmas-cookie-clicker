"use client"; // Markiert die Datei als Client-seitig, da sie interaktive Logik enthält
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Image from "next/image";

export default function Home() {
  const [cookieCount, setCookieCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(createSnowflake, 200);
    return () => clearInterval(intervalId); // Aufräumen des Intervalls bei unmount
  }, []);

  const createFLoatingPoint = (x, y) => {
    const floatingPoint = document.createElement("div");
    floatingPoint.textContent = "+1";
    floatingPoint.className = "floating-point";
    document.body.appendChild(floatingPoint);
    floatingPoint.style.left = `${x}px`;
    floatingPoint.style.top = `${y}px`;
    floatingPoint.addEventListener("animationend", () => floatingPoint.remove());
  };

  const createFlyingLebkuchen = () => {
    const flyinglebkuchen = document.createElement("img");
    flyinglebkuchen.src = "/lebkuchen.png"; // Pfad zum Bild
    flyinglebkuchen.className = "flying-lebkuchen";
    document.body.appendChild(flyinglebkuchen);
    
    // Dynamischer Wert für 'left'
    flyinglebkuchen.style.left = `${Math.random() * window.innerWidth}px`; // Berechnet die horizontale Position

    flyinglebkuchen.addEventListener("click", () => {
      setCookieCount(cookieCount + 50);
      flyinglebkuchen.remove();
    });

    flyinglebkuchen.addEventListener("animationend", () => flyinglebkuchen.remove());
  };

  const createSnowflake = () => {
    const snowflake = document.createElement("div");
    snowflake.className = "falling-snow";
    snowflake.style.left = `${Math.random() * window.innerWidth}px`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    document.body.appendChild(snowflake);
    snowflake.addEventListener("animationend", () => snowflake.remove());
  };

  const launchConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: 5,
        angle: Math.random() * 360,
        spread: 50,
        origin: { x: 0.5, y: 0.5 },
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleClick = (event) => {
    setCookieCount((prevCount) => {
      const newCount = prevCount + 1;

      // Bei jedem Klick die Shake-Animation hinzufügen
      const cookieElement = document.getElementById("cookie");
      cookieElement.classList.add("shake");

      // Entfernen der Shake-Animation nach der Dauer
      cookieElement.addEventListener("animationend", () => {
        cookieElement.classList.remove("shake");
      });

      if (newCount % 10 === 0) {
        document.getElementById("cookie-count").style.color = "yellow";
        setTimeout(() => {
          document.getElementById("cookie-count").style.color = "white";
        }, 200);
      }

      if (newCount % 20 === 0) {
        launchConfetti();
      }

      if (newCount % 30 === 0) {
        createFlyingLebkuchen();
      }

      createFLoatingPoint(event.clientX, event.clientY);
      return newCount;
    });
  };

  return (
    <div className="container">
      <h1>X-MAS COOKIE CLICKER</h1>
      <Image
        id="cookie"
        src="/lebkuchen.png" // Pfad zum Bild
        alt="Lebkuchen"
        width={200}
        height={200}
        onClick={handleClick}
      />
      <div id="cookie-count">{cookieCount}</div>
    </div>
  );
}
