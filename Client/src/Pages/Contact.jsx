import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26185.58720890866!2d-1.3304137154010431!3d34.87636393382952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd78c852fa7f18ef%3A0xe816b7839010cd91!2sClinque%20les%20Dahlias!5e0!3m2!1sfr!2sdz!4v1714260318065!5m2!1sfr!2sdz"; // Replace with the actual embed code
    iframe.width = "600";
    iframe.height = "450";
    iframe.style.border = "0";
    iframe.allowFullscreen = true;
    // iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";

    const mapContainer = document.getElementById("map-container");
    if (mapContainer) mapContainer.appendChild(iframe);

    return () => {
      if (mapContainer) mapContainer.removeChild(iframe);
    };
  }, []);

  return (
    <>
      <h1>Contact</h1>
      <div id="map-container" style={{ width: "600px", height: "450px" }} />
    </>
  );
};

export default Contact;
