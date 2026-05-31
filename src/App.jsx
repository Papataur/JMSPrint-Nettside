import holderpink from "./holderpink.jpg";
import deskholder from "./deskholder.jpg";
import React, { useState } from "react";
import logo from "./JMSPrint.png";
import salttrakt from "./salttrakt.jpg";

import {
  ShieldCheck,
  Box,
  Wrench,
  MapPin,
  ShoppingBag,
  Sparkles,
  Cuboid,
  CheckCircle2,
} from "lucide-react";

import { motion } from "framer-motion";
import "./style.css";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <main className="page">
      <section className="hero">
        <div className="heroGrid">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={logo} alt="JMSPrint logo" className="logo" />

            <p className="pill">
              Praktiske produkter laget med 3D-print
            </p>

            <h1>
              Smarte ting du faktisk kan bruke.
            </h1>

            <p className="lead">
              JMSPrint lager praktiske produkter, holdere, smådeler og
              spesialløsninger på bestilling. Alt produseres i Norge med fokus
              på kvalitet og brukervennlighet.
            </p>

            <div className="buttons">
              <a href="#butikk" className="btn primary">
                Se produkter
              </a>

              <a href="#kontakt" className="btn secondary">
                Få laget noe eget
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="showcase"
          >
            <div className="card inner">
              <div className="cardHeader">
                <div>
                  <p>Mulige produkter</p>
                  <h2>JMSPrint Studio</h2>
                </div>

                <Box size={44} />
              </div>

              <div className="checklist">
                {[
                  "Holdere og smarte løsninger",
                  "Reservedeler og smådeler",
                  "Produkter til hjem og hobby",
                  "Laget på bestilling i Norge",
                ].map((item) => (
                  <div key={item} className="check">
                    <CheckCircle2 size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="produkter" className="section">
        <div className="sectionIntro">
          <p>Produkter</p>

          <h2>Produkter laget for ekte behov</h2>

          <span>
            Vi lager praktiske og kreative 3D-printede produkter — fra
            hobbytilbehør til smarte løsninger for hjem, garasje, båt og
            teknologi.
          </span>
        </div>

        <div className="products">
          <ProductCard
            icon={<Sparkles />}
            title="Custom Design"
            text="Vi kan lage spesialtilpassede løsninger og modeller etter behov."
          />

          <ProductCard
            icon={<Wrench />}
            title="Smarte Smådeler"
            text="Reservedeler, braketter, holdere og praktiske produkter laget med 3D-print."
          />

          <ProductCard
            icon={<Cuboid />}
            title="Prototype & Hobby"
            text="Perfekt for hobbyprosjekter, garasje, RC, akvarium og kreative idéer."
          />
        </div>
      </section>

      <section className="features">
        <Feature
          icon={<MapPin />}
          title="3D-printet lokalt"
          text="Designet og produsert med fokus på kvalitet og praktisk bruk."
        />

        <Feature
          icon={<ShieldCheck />}
          title="Custom løsninger"
          text="Har du en idé? Vi kan ofte lage en løsning som passer."
        />

        <Feature
          icon={<ShoppingBag />}
          title="Høy kvalitet"
          text="Printet med moderne utstyr for pene og sterke resultater."
        />

        <Feature
          icon={<Box />}
          title="Laget på bestilling"
          text="Produkter produseres etter behov og kan tilpasses kunden."
        />
      </section>

      <section id="butikk" className="shopSection">
        <div className="sectionIntro">
          <p>Klare produkter</p>

          <h2>Bestill praktiske 3D-print</h2>

          <span>
            Produktene printes i slitesterk PETG. Flere farger kan velges ved
            bestilling.
          </span>
        </div>

        <div className="shopGrid">
          <ProductItem
            image={salttrakt}
            title="Salttrakt til oppvaskmaskin"
            price="69 kr + frakt"
            text="Gjør påfylling av oppvasksalt enklere uten søl. Printet i slitesterk PETG."
            onImageClick={() => setSelectedImage(salttrakt)}
          />

          <ProductItem
            image={deskholder}
            title="Justerbar bordholder"
            price="149 kr + frakt"
            text="Praktisk holder til headset, kabler eller utstyr. Festes enkelt på skrivebord eller hylle. Printet i slitesterk PETG."
            onImageClick={() => setSelectedImage(deskholder)}
          />

          <ProductItem
            image={holderpink}
            title="Praktisk veggholder"
            price="89 kr + frakt"
            text="Solid 3D-printet holder til headset, kabler eller småting. Kan monteres med skruer eller tape. Printet i slitesterk PETG."
            onImageClick={() => setSelectedImage(holderpink)}
          />
        </div>
      </section>

      <section id="kontakt" className="contact">
        <h2>Har du en idé du ønsker printet?</h2>

        <p>
          Send oss en skisse, et bilde eller en forklaring — så ser vi om vi
          kan lage det med 3D-print.
        </p>

        <div className="contactBox">
          <p className="contactTitle">Kontakt</p>

          <a
            href="mailto:kontakt@jmsprint.no?subject=Forespørsel%20om%20custom%203D-print&body=Hei%20JMSPrint%2C%0A%0AJeg%20ønsker%20pris%20på%20custom%203D-print.%0A"
            className="mailLink"
          >
            kontakt@jmsprint.no
          </a>

          <p>Facebook / Finn.no / TikTok / Nettbutikk kommer snart</p>
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

function ProductItem({
  image,
  title,
  price,
  text,
  onImageClick,
}) {
  return (
    <div className="shopCard">
      <img
        src={image}
        alt={title}
        className="shopImage"
        onClick={onImageClick}
      />

      <div className="shopContent">
        <h3>{title}</h3>

        <p className="price">{price}</p>

        <p>{text}</p>

        <a
          href={`mailto:kontakt@jmsprint.no?subject=Bestilling%20-%20${encodeURIComponent(
            title
          )}&body=Hei%20JMSPrint%2C%0A%0AJeg%20ønsker%20å%20bestille%3A%20${encodeURIComponent(
            title
          )}%0A%0AØnsket%20farge%3A%0AAntall%3A%0AAdresse%3A%0A`}
          className="orderButton"
        >
          Kontakt for bestilling
        </a>
      </div>
    </div>
  );
}

function ProductCard({ icon, title, text }) {
  return (
    <div className="productCard">
      <div className="icon">
        {React.cloneElement(icon, { size: 28 })}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <div>{React.cloneElement(icon, { size: 28 })}</div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  );
}
