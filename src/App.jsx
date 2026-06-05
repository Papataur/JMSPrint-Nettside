import { useState } from "react";
import heroImage from "./heroimage.jpg";
import "./style.css";
import JMSPrint from "./logo.jpg";

import deskholder from "./deskholder.jpg";
import deskholderBlack from "./deskholder-black.jpg";
import deskholderBlue from "./deskholder-blue.jpg";
import deskholderPink from "./deskholder-pink.jpg";
import deskholderWhite from "./deskholder-white.jpg";

import holderpink from "./holderpink.jpg";
import holderpinkBlack from "./holderpink-black.jpg";
import holderpinkWhite from "./holderpink-white.jpg";
import holderpinkGrey from "./holderpink-grey.jpg";
import holderpinkBlue from "./holderpink-blue.jpg";

import salttraktWhite from "./salttrakt.jpg";
import salttraktBlack from "./salttrakt-black.jpg";
import salttraktGrey from "./salttrakt-grey.jpg";
import salttraktBlue from "./salttrakt-blue.jpg";
import salttraktPink from "./salttrakt-pink.jpg";

import boksaapner from "./boksaapner.jpg";
import boksaapnerBlack from "./boksaapner-black.jpg";
import boksaapnerBlue from "./boksaapner-blue.jpg";
import boksaapnerGrey from "./boksaapner-grey.jpg";
import boksaapnerWhite from "./boksaapner-white.jpg";

import justerbarStraaledyse from "./justerbar-straaledyse.jpg";
import justerbarStraaledyseBlack from "./justerbar-straaledyse-black.jpg";
import justerbarStraaledyseWhite from "./justerbar-straaledyse-white.jpg";
import justerbarStraaledyseBlue from "./justerbar-straaledyse-blue.jpg";
import justerbarStraaledysePink from "./justerbar-straaledyse-pink.jpg";

import snusboks from "./snusboks.jpg";
import snusboksBlack from "./snusboks-black.jpg";
import snusboksWhite from "./snusboks-white.jpg";
import snusboksBlue from "./snusboks-blue.jpg";
import snusboksPink from "./snusboks-pink.jpg";

function ProductItem({
  image,
  colorImages = {},
  title,
  price,
  text,
  stockStatus = "Bestillingsvare",
  onImageClick,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) {
  const [selectedImage, setSelectedImage] = useState(image);
  const [selectedColor, setSelectedColor] = useState("Ikke valgt");

  const chooseColor = (color, img) => {
    if (!img) return;
    setSelectedColor(color);
    setSelectedImage(img);
  };

  return (
    <div className="shopCard">
      <div className={`badge ${stockStatus === "Bestillingsvare" ? "orderBadge" : ""}`}>
  {stockStatus}
</div>

      <button
        className={`favoriteButton ${isFavorite ? "active" : ""}`}
        onClick={() => onToggleFavorite(title)}
      >
        ❤️
      </button>

      <img
        src={selectedImage}
        alt={title}
        className="shopImage"
        onClick={() => onImageClick(selectedImage)}
      />

      <div className="shopContent">
        <h3>{title}</h3>
        <div className="stars">★★★★★</div>

        <div className="price">{price}</div>
        <p className="madeIn">Produsert i Norge</p>

        <p className="colorLabel">Tilgjengelige farger</p>

        <div className="colorOptions">
          <span className={`colorDot black ${selectedColor === "Sort" ? "selected" : ""}`} title="Sort" onClick={() => chooseColor("Sort", colorImages.black)} />
          <span className={`colorDot white ${selectedColor === "Hvit" ? "selected" : ""}`} title="Hvit" onClick={() => chooseColor("Hvit", colorImages.white || image)} />
          <span className={`colorDot grey ${selectedColor === "Grå" ? "selected" : ""}`} title="Grå" onClick={() => chooseColor("Grå", colorImages.grey)} />
          <span className={`colorDot blue ${selectedColor === "Blå" ? "selected" : ""}`} title="Blå" onClick={() => chooseColor("Blå", colorImages.blue)} />
          <span className={`colorDot pink ${selectedColor === "Rosa" ? "selected" : ""}`} title="Rosa" onClick={() => chooseColor("Rosa", colorImages.pink)} />
        </div>

        <p>{text}</p>
        <p className="delivery">Levering: 2–5 dager</p>

        <button
          className="cartButton"
          onClick={() => {
            if (selectedColor === "Ikke valgt") {
              alert("Velg farge før du legger produktet i handlekurven");
              return;
            }

            onAddToCart({
              title,
              price,
              color: selectedColor,
            });
          }}
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
    email: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [isSendingOrder, setIsSendingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [lastOrderNumber, setLastOrderNumber] = useState("");
  const [vippsSuccess, setVippsSuccess] = useState(false);
  const [favorites, setFavorites] = useState([]);

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

  const shippingPrice = cart.length > 0 ? 69 : 0;

const productTotal = cart.reduce((total, item) => {
  return total + parseInt(item.price);
}, 0);

const totalPrice = productTotal + shippingPrice;

  const toggleFavorite = (title) => {
    if (favorites.includes(title)) {
      setFavorites(favorites.filter((fav) => fav !== title));
    } else {
      setFavorites([...favorites, title]);
    }
  };

  const validateCustomer = () => {
    if (!customer.name || !customer.address || !customer.phone || !customer.email) {
      setCheckoutError("Fyll inn alle feltene");
      return false;
    }

    setCheckoutError("");
    return true;
  };

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
              Vi lager praktiske og kreative 3D-printede produkter — fra
              hobbytilbehør til smarte løsninger for hjem, garasje, båt og
              teknologi.
            </p>

            <div className="buttons">
              <a href="#butikk" className="btn primary">Se produkter</a>
              <a href="#kontakt" className="btn secondary">Kontakt oss</a>
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
            <p>Vi kan lage spesialtilpassede løsninger og modeller etter behov.</p>
          </div>

          <div className="productCard">
            <div className="icon">🔧</div>
            <h3>Smarte Smådeler</h3>
            <p>Reservedeler, braketter, holdere og praktiske produkter laget med 3D-print.</p>
          </div>

          <div className="productCard">
            <div className="icon">📦</div>
            <h3>Prototype & Hobby</h3>
            <p>Perfekt for hobbyprosjekter, garage, RC, akvarium og kreative idéer.</p>
          </div>
        </div>
      </section>

      <section className="shopSection" id="butikk">
        <div className="sectionIntro">
          <p>Klare produkter</p>
          <h2>Bestill praktiske 3D-print</h2>
          <span>
            Produktene printes i slitesterk PETG. Flere farger kan velges ved bestilling.
          </span>
        </div>

        <div className="shopGrid">
          <ProductItem
            image={salttraktWhite}
            colorImages={{
              white: salttraktWhite,
              black: salttraktBlack,
              grey: salttraktGrey,
              blue: salttraktBlue,
              pink: salttraktPink,
            }}
            title="Salttrakt til oppvaskmaskin"
            price="69 kr"
            text="Gjør påfylling av oppvasksalt enklere uten søl. Printet i slitesterk PETG."
            onImageClick={setSelectedImage}
            onAddToCart={addToCart}
            isFavorite={favorites.includes("Salttrakt til oppvaskmaskin")}
            onToggleFavorite={toggleFavorite}
          />

          <ProductItem
            image={deskholder}
            colorImages={{
              black: deskholderBlack,
              white: deskholderWhite,
              blue: deskholderBlue,
              pink: deskholderPink,
              grey: deskholder,
            }}
            title="Justerbar bordholder"
            price="129 kr"
            text="Praktisk holder til headset, kabler eller utstyr. Festes enkelt på skrivebord eller hylle. Printet i slitesterk PETG."
            onImageClick={setSelectedImage}
            onAddToCart={addToCart}
            isFavorite={favorites.includes("Justerbar bordholder")}
            onToggleFavorite={toggleFavorite}
          />
    
           <ProductItem
            image={holderpink}
            colorImages={{
              pink: holderpink,
              black: holderpinkBlack,
              white: holderpinkWhite,
              grey: holderpinkGrey,
              blue: holderpinkBlue,
            }}
            title="Praktisk veggholder"
            price="69 kr"
            text="Solid 3D-printet holder til headset, kabler eller småting. Kan monteres med skruer eller tape. Printet i slitesterk PETG."
            onImageClick={setSelectedImage}
            onAddToCart={addToCart}
            isFavorite={favorites.includes("Praktisk veggholder")}
            onToggleFavorite={toggleFavorite}
           />
          
           <ProductItem
            image={boksaapner}
            colorImages={{
              pink: boksaapner,
              black: boksaapnerBlack,
              white: boksaapnerWhite,
              grey: boksaapnerGrey,
              blue: boksaapnerBlue,
            }}
            title="Boksåpner"
            price="49 kr"
            text="Praktisk boksåpner som gjør det enklere å åpne bokser. Printet i slitesterk PETG."
            onImageClick={setSelectedImage}
            onAddToCart={addToCart}
            isFavorite={favorites.includes("Boksåpner")}
            onToggleFavorite={toggleFavorite}
           />

            <ProductItem
             image={justerbarStraaledyse}
             colorImages={{
             grey: justerbarStraaledyse,
             pink: justerbarStraaledysePink,
             blue: justerbarStraaledyseBlue,
             white: justerbarStraaledyseWhite,
             black: justerbarStraaledyseBlack,               
            }}
            title="Justerbar stråledyse"
            price="99 kr"
            text="Justerbar dyse for hageslange. Gir bedre kontroll på vannstrålen. Printet i slitesterk PETG."
            onImageClick={setSelectedImage}
            onAddToCart={addToCart}
            isFavorite={favorites.includes("Justerbar stråledyse")}
            onToggleFavorite={toggleFavorite}
           />

             <ProductItem
              image={snusboks}
              colorImages={{
              grey: snusboks,
              pink: snusboksPink,
              blue: snusboksBlue,
              white: snusboksWhite,
              black: snusboksBlack,
             }}
             title="Snusboks"
             price="79 kr"
             text="Solid 3D-printet snusboks med lokk. Praktisk oppbevaring til snus eller smådeler."
             onImageClick={setSelectedImage}
             onAddToCart={addToCart}
             isFavorite={favorites.includes("Snusboks")}
             onToggleFavorite={toggleFavorite}
            />
          </div>
         </section>

      <section className="contact" id="kontakt">
        <h2>Ønsker du et spesialdesignet 3D-print?</h2>

        <p> Har du en egen idé eller trenger en spesialtilpasset løsning? Ta kontakt, så ser vi på mulighetene for å designe og 3D-printe en løsning for deg. </p>

        <div className="contactBox">
          <p className="contactTitle">Kontakt oss</p>

          <p>Send gjerne bilde, mål eller forklaring på hva du ønsker laget.</p>

          <p>
            E-post:{" "}
            <a className="mailLink" href="mailto:kontakt@jmsprint.no">
              kontakt@jmsprint.no
            </a>
          </p>
        </div>
      </section>

      {showToast && (
        <div className="toast">✔ Produkt lagt til i handlekurv</div>
      )}

      {cart.length > 0 && (
        <div className="cartBox">
          <div className="cartHeader">
            <h3>Handlekurv ({cart.length})</h3>

            <button className="clearCartButton" onClick={() => setCart([])}>
              Tøm
            </button>
          </div>

          {cart.map((item, index) => (
            <div className="cartItem" key={index}>
              <div className="cartInfo">
                <span>{item.title}</span>
                <small>Farge: {item.color}</small>
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
  Varer: {productTotal} kr
  <br />
  Frakt: {shippingPrice} kr
  <hr />
  <strong>Total: {totalPrice} kr</strong>
</div>
<p className="shippingInfo">
  📦 Fast frakt: 69 kr i hele Norge
</p>
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

            <input
              type="email"
              placeholder="E-post"
              value={customer.email}
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
            />

            <button
              className="cartCheckout"
              disabled={isSendingOrder || isPaying || orderSuccess || vippsSuccess}
              onClick={async () => {
                if (!validateCustomer()) return;

                setCheckoutError("");
                setOrderSuccess(false);
                setVippsSuccess(false);
                setIsSendingOrder(true);

                const orderText = cart
                  .map(
                    (item, index) =>
                      `${index + 1}. ${item.title} - ${item.color} - ${item.price}`
                  )
                  .join("\n");
                 const orderNumber =
                 "JMS-" +
                 new Date().toISOString().slice(0, 10).replace(/-/g, "") +
                  "-" +
                 Math.floor(1000 + Math.random() * 9000);
                 setLastOrderNumber(orderNumber);
         
                try {
                  const response = await fetch("https://formspree.io/f/xlgkegbv", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    body: JSON.stringify({
                    ordrenummer: orderNumber,
                    navn: customer.name,
                    adresse: customer.address,
                    telefon: customer.phone,
                    email: customer.email,
                    varer: orderText,
                    total: `${totalPrice} kr`,
                    }),
                  });

                  if (!response.ok) {
                    throw new Error("Kunne ikke sende bestilling");
                  }

                  setIsSendingOrder(false);
                  setOrderSuccess(true);

                  setTimeout(() => {
                    setCart([]);
                    setOrderSuccess(false);
                    setLastOrderNumber("");
                    setCustomer({
                      name: "",
                      address: "",
                      phone: "",
                      email: "",
                    });
                  }, 6000);
                } catch (error) {
                  setIsSendingOrder(false);
                  setCheckoutError("Noe gikk galt. Prøv igjen eller kontakt oss direkte.");
                }
              }}
            >
              {isSendingOrder ? "Sender bestilling..." : "Send bestilling →"}
            </button>

            {checkoutError && (
              <p className="checkoutError">{checkoutError}</p>
            )}

            <button
              className="vippsButton"
              disabled={isPaying || isSendingOrder || orderSuccess || vippsSuccess}
              onClick={() => {
                if (!validateCustomer()) return;

                setVippsSuccess(false);
                setOrderSuccess(false);
                setIsPaying(true);

                setTimeout(() => {
                  setIsPaying(false);
                  setVippsSuccess(true);

                  setTimeout(() => {
                    setCart([]);
                    setVippsSuccess(false);
                  }, 3500);
                }, 2200);
              }}
            >
              {isPaying ? "Behandler Vipps..." : "Betal med Vipps"}
            </button>

            {orderSuccess && (
            <div className="paymentSuccess">
            <strong>✅ Bestilling sendt!</strong>
            <br />
            Ordrenummer: {lastOrderNumber}
            <br />
            Vi tar kontakt så snart som mulig.
            </div>
            )}

            {vippsSuccess && (
              <div className="paymentSuccess">✅ Betaling fullført</div>
            )}

            <p className="checkoutNote">
              Bestillingen bekreftes manuelt før betaling.
            </p>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="imageModal" onClick={() => setSelectedImage(null)}>
          <button
            className="closeButton"
            onClick={() => setSelectedImage(null)}
          >
            X
          </button>

          <img src={selectedImage} alt="Produkt" className="modalImage" />
        </div>
      )}
    </main>
  );
}
