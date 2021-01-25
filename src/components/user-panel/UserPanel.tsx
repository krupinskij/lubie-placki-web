import { UnknownUserPanelBody, UnknownUserPanelHeader } from "./UnknownUserPanel";

import "./UserPanel.scss";

export function UserPanel() {
    return(
        <div className="user-panel">
            <UnknownUserPanelHeader/>
            <UnknownUserPanelBody/>
        </div>
    )
}