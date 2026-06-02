import { useState } from "react";
import heroImage from "./heroimage.png";
import "./style.css";
import JMSPrint from "./logo.png";

import salttrakt from "./salttrakt.jpg";
import deskholder from "./deskholder.jpg";
import holderpink from "./holderpink.jpg";

function ProductItem({ image, title, price, text, onImageClick, onAddToCart }) {
  return (
    <div className="shopCard">
       <div className="badge">På lager</div>
      <img
        src={image}
        alt={title}
        className="shopImage"
        onClick={() => onImageClick(image)}
      />

     <div className="shopContent">
  <h3>{title}</h3>
  <div className="stars">★★★★★</div>
       
  <div className="price">{price}</div>
 <p className="madeIn">Produsert i Norge</p>
  
  <p className="colorLabel">Tilgjengelige farger</p>

  <div className="colorOptions">
    <span className="colorDot black" title="Sort"></span>
    <span className="colorDot white" title="Hvit"></span>
    <span className="colorDot gray" title="Grå"></span>
    <span className="colorDot blue" title="Blå"></span>
    <span className="colorDot pink" title="Rosa"></span>
  </div>

  <p>{text}</p>
  <p className="delivery">Levering: 2–5 dager</p>

 <button
  className="cartButton"
  onClick={() => onAddToCart({ title, price })}
>
  🛒 Legg i handlekurv
</button>
       
</div>
    </div>
  );
}

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({
  name: "",
  address: "",
  phone: "",
});
  const [showToast, setShowToast] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

const addToCart = (product) => {
  setCart([...cart, product]);

  setShowToast(true);

  setTimeout(() => {
    setShowToast(false);
  }, 2200);
};

  const removeFromCart = (indexToRemove) => {
  setCart(cart.filter((_, index) => index !== indexToRemove));
};

const totalPrice = cart.reduce((total, item) => {
  return total + parseInt(item.price);
}, 0);
  
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
                src={heroImage}
                alt="Produkter"
                onClick={() => setSelectedImage(heroImage)}
                style={{ cursor: "pointer" }}
            />
        </div>
          
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
            onAddToCart={addToCart}
          />

          <ProductItem
            image={deskholder}
            title="Justerbar bordholder"
            price="149 kr + frakt"
            text="Praktisk holder til headset, kabler eller utstyr. Festes enkelt på skrivebord eller hylle. Printet i slitesterk PETG."
            onImageClick={setSelectedImage}
            onAddToCart={addToCart}
          />

          <ProductItem
            image={holderpink}
            title="Praktisk veggholder"
            price="89 kr + frakt"
            text="Solid 3D-printet holder til headset, kabler eller småting. Kan monteres med skruer eller tape. Printet i slitesterk PETG."
            onImageClick={setSelectedImage}
            onAddToCart={addToCart}
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
         
      {showToast && (
  <div className="toast">
    ✔ Produkt lagt til i handlekurv
  </div>
)}
         {cart.length > 0 && (
         <div className="cartBox">
         <div className="cartHeader">
  <h3>Handlekurv ({cart.length})</h3>

  <button
    className="clearCartButton"
    onClick={() => setCart([])}
  >
    Tøm
  </button>
</div>

         {cart.map((item, index) => (
  <div className="cartItem" key={index}>

    <div className="cartInfo">
      <span>{item.title}</span>
      <strong>{item.price}</strong>
    </div>

    <button
      className="removeButton"
      onClick={() => removeFromCart(index)}
    >
      ❌
    </button>

  </div>
))}
           <div className="cartTotal">
  Total: {totalPrice} kr
</div>

        <div className="checkoutForm">
  <input
    type="text"
    placeholder="Navn"
    value={customer.name}
    onChange={(e) =>
      setCustomer({ ...customer, name: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Adresse"
    value={customer.address}
    onChange={(e) =>
      setCustomer({ ...customer, address: e.target.value })
    }
  />

  <input
    type="tel"
    placeholder="Telefon"
    value={customer.phone}
    onChange={(e) =>
      setCustomer({ ...customer, phone: e.target.value })
    }
  />

  <button
  className="cartCheckout"
  onClick={() => {
    if (
      !customer.name ||
      !customer.address ||
      !customer.phone
    ) {
      setCheckoutError("Fyll inn alle feltene");
      return;
    }

    setCheckoutError("");

    alert("Bestilling sendt 😄");
  }}
>
  Send bestilling →
</button>

  {checkoutError && (
  <p className="checkoutError">
    {checkoutError}
  </p>
)}        
  <button className="vippsButton">
    Betal med Vipps
  </button>

  <p className="checkoutNote">
    Bestillingen bekreftes manuelt før betaling.
  </p>
</div>

</div>
)}
     
      {selectedImage && (
        <div
          className="imageModal"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="closeButton"
            onClick={() => setSelectedImage(null)}
          >
            X
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
