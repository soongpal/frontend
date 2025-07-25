import type React from "react";
import { Container } from "react-bootstrap";
import { Instagram } from 'react-bootstrap-icons';

const Footer: React.FC = () =>{

    return(
      <footer>
        <Container className="align-items-center ">
            <img src="/logo/Soongpal.svg" alt="logo" width={100} />
            <p className=" text-muted">
                EMAIL: soongpal@gmail.com<br />
                호스팅서비스 제공자: Netlify<br />
                © 2025 Team Soongpal. All rights reserved.
            </p>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" >
                <Instagram size={20} color="black"/>
            </a>
        </Container>
      </footer>
    );
}

export default Footer;