import React from 'react';
import { View } from '../../templates/View';
import { Component } from '../../templates/Component';
import { LoginFormWithRouter } from '../../components/forms/LoginForm';

export function LoginPage() {
  return (
    <View>
      <LoginFormWithRouter />
    </View>
  );
}
