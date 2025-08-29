import type React from "react";
import { Instagram } from 'react-bootstrap-icons';

const Footer: React.FC = () =>{

    return(
      <footer>
        <div className="ms-3">
            <img src="/logo/Soongpal.svg" alt="logo" width={50} className="mb-2"/>
            <p className=" text-muted">
                EMAIL: soongpal2@gmail.com<br />
                © 2025 Team Soongpal. All rights reserved.
            </p>
            <a href="https://www.instagram.com/soongpal2?igsh=MTcyOHczdTQxdzN4aw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" >
                <Instagram size={20} color="grey"/>
            </a>
        </div>
      </footer>
    );
}

export default Footer;