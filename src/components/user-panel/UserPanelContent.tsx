import womanIcon from "../../assets/woman-icon.svg";
import manIcon from "../../assets/man-icon.svg";
import { UserPanel } from "./UserPanel";
import { UserSession } from "../../utils/user-session";

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
            FORMULARZ LOGOWANIA
        </div>
    )
}

export function UserPanelBody() {
    return (
        <div className="user-panel-body">
            PANEL UŻYTKOWNIKA
        </div>
    )
}