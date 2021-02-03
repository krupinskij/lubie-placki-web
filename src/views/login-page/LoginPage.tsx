import React from 'react';

import { LoginFormWithRouter } from '../../components/forms/LoginForm';
import { Component } from '../../templates/Component';
import { View } from '../../templates/View';

export function LoginPage() {
    return(
        <View>
            <Component>
                <LoginFormWithRouter/>
            </Component>
        </View>
    )
}