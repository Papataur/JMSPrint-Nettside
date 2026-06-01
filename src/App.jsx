import heroimage from "./heroimage.png";
import "./style.css";
import JMSPrint from "./logo.png";

import salttrakt from "./salttrakt.jpg";
import deskholder from "./deskholder.jpg";
import holderpink from "./holderpink.jpg";

import { useState } from "react";

function ProductItem({ image, title, price, text, onImageClick }) {
  return (
    <div className="shopCard">
      <img
        src={image}
        alt={title}
        className="shopImage"
        onClick={() => onImageClick(image)}
      />

      <div className="shopContent">
        <h3>{title}</h3>

        <div className="price">{price}</div>

        <p>{text}</p>

        <a href="#kontakt">Kontakt for bestilling</a>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <main className="page">
      <section className="hero">
        <div className="heroGrid">
          <div>
            <img src={JMSPrint} alt="JMSPrint" className="logo" />

            <div className="pill">Produkter</div>

            <h1>
              Produkter laget
              <br />
              for <span>ekte behov</span>
            </h1>

            <p className="lead">
              Vi lager praktiske og kreative 3D-printede produkter —
              fra hobbytilbehør til smarte løsninger for hjem,
              garasje, båt og teknologi.
            </p>

            <div className="buttons">
              <a href="#butikk" className="btn primary">
                Se produkter
              </a>

              <a href="#kontakt" className="btn secondary">
                Kontakt oss
              </a>
            </div>
          </div>

          <div className="showcase">
         <img
          src={heroimage}
          alt="JMSPrint produkter"
          style={{
          width: "100%",
          borderRadius: "24px",
          display: "block",
         }}
       />
  </div>
     
      <section className="features">
        <div className="feature">
          <h3>3D-printet i Norge</h3>
          <p>Lokalt produsert på bestilling.</p>
        </div>

        <div className="feature">
          <h3>Høy kvalitet</h3>
          <p>Printet i slitesterk PETG.</p>
        </div>

        <div className="feature">
          <h3>Flere farger</h3>
          <p>Velg fargen du liker best.</p>
        </div>

        <div className="feature">
          <h3>Praktiske løsninger</h3>
          <p>Laget for ekte behov i hverdagen.</p>
        </div>
      </section>

      
        <div className="products">
          <div className="productCard">
            <div className="icon">⚡</div>

            <h3>Custom Design</h3>

            <p>
              Vi kan lage spesialtilpassede løsninger og modeller
              etter behov.
            </p>
          </div>

          <div className="productCard">
            <div className="icon">🔧</div>

            <h3>Smarte Smådeler</h3>

            <p>
              Reservedeler, braketter, holdere og praktiske produkter
              laget med 3D-print.
            </p>
          </div>

          <div className="productCard">
            <div className="icon">📦</div>

            <h3>Prototype & Hobby</h3>

            <p>
              Perfekt for hobbyprosjekter, garage, RC, akvarium og
              kreative idéer.
            </p>
          </div>
        </div>
      </section>

      <section className="shopSection" id="butikk">
        <div className="sectionIntro">
          <p>Klare produkter</p>

          <h2>Bestill praktiske 3D-print</h2>

          <span>
            Produktene printes i slitesterk PETG. Flere farger kan
            velges ved bestilling.
          </span>
        </div>

        <div className="shopGrid">
          <ProductItem
            image={salttrakt}
            title="Salttrakt til oppvaskmaskin"
            price="69 kr + frakt"
            text="Gjør påfylling av oppvasksalt enklere uten søl. Printet i slitesterk PETG."
            onImageClick={setSelectedImage}
          />

          <ProductItem
            image={deskholder}
            title="Justerbar bordholder"
            price="149 kr + frakt"
            text="Praktisk holder til headset, kabler eller utstyr. Festes enkelt på skrivebord eller hylle. Printet i slitesterk PETG."
            onImageClick={setSelectedImage}
          />

          <ProductItem
            image={holderpink}
            title="Praktisk veggholder"
            price="89 kr + frakt"
            text="Solid 3D-printet holder til headset, kabler eller småting. Kan monteres med skruer eller tape. Printet i slitesterk PETG."
            onImageClick={setSelectedImage}
          />
        </div>
      </section>

      <section className="contact" id="kontakt">
        <h2>Har du en idé?</h2>

        <p>
          Vi kan ofte lage en løsning som passer perfekt til ditt
          behov.
        </p>

        <div className="contactBox">
          <p className="contactTitle">Kontakt oss</p>

          <p>
            Send gjerne bilde, mål eller forklaring på hva du ønsker
            laget.
          </p>

          <p>
            E-post:{" "}
            <a
              className="mailLink"
              href="mailto:kontakt@jmsprint.no"
            >
              kontakt@jmsprint.no
            </a>
          </p>
        </div>
      </section>

      {selectedImage && (
        <div
          className="imageModal"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="closeButton"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>

          <img
            src={selectedImage}
            alt="Produkt"
            className="modalImage"
          />
        </div>
      )}
    </main>
  );
}
