import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13091.557871062272!2d-1.3139166!3d34.8841218!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd78c9038d4e4bbb%3A0x71430e7e6e7041eb!2sComhub!5e0!3m2!1sfr!2sdz!4v1714758542346!5m2!1sfr!2sdz"; // Replace with the actual embed code
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
