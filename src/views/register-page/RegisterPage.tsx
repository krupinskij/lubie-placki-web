import React from 'react';

import { RegistrationFormWithRouter } from '../../components/forms/RegistrationForm';
import { Component } from '../../templates/Component';
import { View } from '../../templates/View';

export function RegisterPage() {
    return(
        <View>
            <Component>
                <RegistrationFormWithRouter/>
            </Component>
        </View>
    )
}