import "./Hero.css";
import hero from "../../assets/hero-1.png";

export default function Hero() {
  return (
    <section className="hero-container">
      <div className="hero-text">
        <p className="hero-subtitle">NUESTROS PRODUCTOS MÁS VENDIDOS</p>
        <h1 className="hero-title">Productos más recientes</h1>
        <p className="hero-cta">COMPRA AHORA</p>
      </div>

      <div className="hero-image">
        <img className="image" src={ hero } alt="Hero"/>
      </div>
    </section>
  )
}
