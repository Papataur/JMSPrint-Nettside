import logo from "./JMSPrint.png";
import boksaapner from "./boksaapner.jpg";
import headsetholder from "./headsetholder.jpg";
import salttrakt from "./salttrakt.jpg";
import plantemerker from "./plantemerker.jpg";
import React from "react";
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
              Praktiske 3D-printede løsninger laget i Norge
            </p>

            <h1>
              Smarte 3D-printede løsninger for hobby, hjem og garasje.
            </h1>

            <p className="lead">
              Vi designer og 3D-printer praktiske produkter, smådeler og
              spesialløsninger for folk som liker smarte idéer,
              hobbyprosjekter og ting som faktisk fungerer.
            </p>

            <div className="buttons">
              <a href="#produkter" className="btn primary">
                Utforsk produkter
              </a>

              <a href="#kontakt" className="btn secondary">
                Bestill custom print
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
                  <h2>3D Print Studio</h2>
                </div>

                <Box size={44} />
              </div>

              <div className="checklist">
                {[
                  "Custom braketter og holdere",
                  "Smådeler som er vanskelige å få tak i",
                  "Praktiske løsninger til hobby og hjem",
                  "Produkter printet på bestilling",
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
            image={boksaapner}
            title="10-pk boksåpnere"
            price="99 kr + frakt"
            text="Praktiske boksåpnere printet i PETG. Perfekt til kjøkken, tur, festival eller hytte."
          />

          <ProductItem
            image={headsetholder}
            title="Headset-holder"
            price="Fra 149 kr"
            text="Solid holder til headset for skrivebord eller gaming-oppsett. Kan lages i flere farger."
          />

          <ProductItem
            image={salttrakt}
            title="Salttrakt til oppvaskmaskin"
            price="69 kr + frakt"
            text="Gjør påfylling av oppvasksalt enklere uten søl. Printet i slitesterk PETG."
          />

          <ProductItem
            image={plantemerker}
            title="Plantemerker"
            price="Fra 49 kr"
            text="Praktiske plantemerker til drivhus, potter og hage. Kan lages i flere farger."
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
    </main>
  );
}

function ProductItem({ image, title, price, text }) {
  return (
    <div className="shopCard">
      <img src={image} alt={title} className="shopImage" />

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
      <div className="icon">{React.cloneElement(icon, { size: 28 })}</div>

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
