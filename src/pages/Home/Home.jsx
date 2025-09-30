import { Route } from "react-router";
import Title from "../../components/Title/Title";
import Menu from "../Templates/Menu/Menu";
import "./Home.css";
import Parqueo from "./subhome/Parqueo/Parqueo";
import { useState } from "react";
import AreaComun from "./subhome/AreaComun/AreaComun";
import Usuario from "./subhome/Usuario/Usuario";
import Navbar from "../../components/Navbar/Navbar";

export function Home() {
    const [pageSelected,setPageSelected]=useState("")

    const renderPage=()=>{
        switch (pageSelected) {
            case "":
                return <Title p_text="Siu HOME"/>
            case "parqueo":
                return <Parqueo />
            case "areaComun":
                return <AreaComun />
            case "usuario":
                return <Usuario/>
            case "pagos":
                return <Title p_text="pagos"/>
            case "depas":
                return <Title p_text="depas"/>
            default:
                break;
        }
    }

    return <div className="c_home-container">
        <Menu p_pageSelected={pageSelected} p_setPageSelected={setPageSelected} />
        <div className="c_home-contentContainer">
            {renderPage()}
        </div>
    </div>
}

export default Home