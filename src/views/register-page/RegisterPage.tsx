import React from 'react';
import { View } from '../../templates/View';
import { Component } from '../../templates/Component';
import { RegistrationFormWithRouter } from '../../components/forms/RegistrationForm';

export function RegisterPage() {
  return (
    <View>
      <RegistrationFormWithRouter />
    </View>
  );
}
