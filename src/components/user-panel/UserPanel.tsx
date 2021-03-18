import { UserSession } from '../../utils/user-session';

import './UserPanel.scss';
import { UserPanelHeader, UnknownUserPanelBody, UserPanelBody } from './UserPanelContent';

export function UserPanel() {
  return (
    <div className="user-panel">
      <UserPanelHeader />
      {UserSession.isActive ? <UserPanelBody /> : <UnknownUserPanelBody />}
    </div>
  );
}
