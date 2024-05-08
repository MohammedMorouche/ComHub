import { useEffect } from "react";
import Facebook from "./Contact_Images/Facebook.png";
import Instgram from "./Contact_Images/Instgram.png";
import Telegram from "./Contact_Images/Telegram.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SocialMediaContainer = styled.div`
    position: absolute;
    top: 240px;
    right: 40px;
    display: flex;
    margin-bottom: 15px;
    flex-direction: column;
    align-items: center;
`;

const SocialMediaImage = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-bottom: 10px;

    &:hover {
        transform: translateY(-5px);
    }
`;

const Text = styled.p`
    font-size: 25px;
    margin-right: 20px;
    color: white;
    font-weight: bold;
`;
const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Map = styled.div`
  width: 600px;
  height: 450px;
  border-radius: 9px;
  overflow: hidden;
`;

const Contact = () => {
    useEffect(() => {
        const iframe = document.createElement("iframe");
        iframe.src =
            "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13091.557871062272!2d-1.3139166!3d34.8841218!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd78c9038d4e4bbb%3A0x71430e7e6e7041eb!2sComhub!5e0!3m2!1sfr!2sdz!4v1714758542346!5m2!1sfr!2sdz";
        iframe.width = "600";
        iframe.height = "450";
        iframe.style.border = "0";
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "no-referrer-when-downgrade";

        const mapContainer = document.getElementById("map-container");
        if (mapContainer) mapContainer.appendChild(iframe);

        return () => {
            if (mapContainer) mapContainer.removeChild(iframe);
        };
    }, []);

    return (
        <>
            <SocialMediaContainer>
                <Link to="https://www.facebook.com/profile.php?id=61559219765823">
                    <SocialMediaImage src={Facebook} alt="Facebook" />
                </Link>
                <Link to="https://www.instagram.com/com___hub?igsh=ZTZoN3Y0ZDVpeDhp">
                    <SocialMediaImage src={Instgram} alt="Instgram" />
                </Link>
                <Link to="https://www.facebook.com/profile.php?id=61559219765823">
                    <SocialMediaImage src={Telegram} alt="Facebook" />
                </Link>
            </SocialMediaContainer>
            <h1>Contact</h1>
            <MapContainer>
                <Map id="map-container"></Map>
            </MapContainer>
        </>
    );
};

export default Contact;
