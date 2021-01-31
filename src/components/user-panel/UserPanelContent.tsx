import womanIcon from "../../assets/woman-icon.svg";
import manIcon from "../../assets/man-icon.svg";
import { UserPanel } from "./UserPanel";
import { UserSession } from "../../utils/user-session";
import { LoginFormWithRouter } from "../forms/LoginForm";
import { PanelButton } from "../button/Button";

export function UserPanelHeader() {
    return (
        <div className="user-panel-header">
            <span className="user-panel-greeting">
                Witaj, <br/><strong>{ UserSession.isActive ? UserSession.username : 'nieznajoma/y' }</strong>!
            </span>
            <img className="user-panel-icon" src={Math.random() > 0.5 ? womanIcon : manIcon} alt="icon"/>
        </div>
    )
}

export function UnknownUserPanelBody() {
    return (
        <div className="user-panel-body">
            <LoginFormWithRouter mini={ true } />
        </div>
    )
}

export function UserPanelBody() {
    return (
        <div className="user-panel-body">
            <PanelButton text="Mój profil" onClick={ () => { console.log("Mój profil") }} />
            <PanelButton text="Edytuj profil" onClick={ () => { console.log("Edytuj profil") }} />
            <PanelButton text="Wyloguj się" onClick={ () => { UserSession.removeToken() }} />
        </div>
    )
}