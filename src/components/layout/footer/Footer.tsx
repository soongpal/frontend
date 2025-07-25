import type React from "react";
import { Instagram } from 'react-bootstrap-icons';

const Footer: React.FC = () =>{

    return(
      <footer>
        <div>
            <img src="/logo/Soongpal.svg" alt="logo" width={100} />
            <p className=" text-muted">
                EMAIL: soongpal@gmail.com<br />
                호스팅서비스 제공자: Netlify<br />
                © 2025 Team Soongpal. All rights reserved.
            </p>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" >
                <Instagram size={20} color="grey"/>
            </a>
        </div>
      </footer>
    );
}

export default Footer;