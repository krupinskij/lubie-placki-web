import React from 'react';

import './Component.scss'

export const Component: React.FC = ({ children }) => 
    <div className="component">
        {children}
    </div>;