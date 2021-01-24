import womanIcon from "../../assets/woman-icon.svg";
import manIcon from "../../assets/man-icon.svg";

export function UnknownUserPanelHeader() {
    return (
        <div className="user-panel-header">
            <span className="user-panel-greeting">Witaj, <br/><strong>nieznajoma/y</strong>!</span>
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