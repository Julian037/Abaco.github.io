import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignIn from './app/screens/SignIn/SignIn';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './app/screens/SignIn/SignInStyle'; 

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = mockLocalStorage;

describe('SignIn component', () => {
  it('should render the sign in form', () => {
    const { getByLabelText, getByText } = render(
      <ThemeProvider theme={theme}>
        <SignIn />
      </ThemeProvider>
    );
    
    expect(getByLabelText('Correo')).toBeInTheDocument();
    expect(getByLabelText('Contraseña')).toBeInTheDocument();
    expect(getByText('Ingresar')).toBeInTheDocument();
  });

  it('should show error message when submitting empty form', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <SignIn />
      </ThemeProvider>
    );
    fireEvent.click(getByText('Ingresar'));

    expect(getByText('Introduce tu contraseña')).toBeInTheDocument();
  });

  it('should show error message when submitting incorrect credentials', () => {

    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([{ email: 'test@example.com', password: 'password123' }]));

    const { getByLabelText, getByText } = render(
      <ThemeProvider theme={theme}>
        <SignIn />
      </ThemeProvider>
    );
    fireEvent.change(getByLabelText('Correo'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(getByLabelText('Contraseña'), { target: { value: 'wrongpassword' } });
    fireEvent.click(getByText('Ingresar'));

    expect(getByText('Algo salió mal. Parece que el usuario o la contraseña que ingresaste no son correctos.')).toBeInTheDocument();
  });

  it('should navigate to "/home" when submitting correct credentials', () => {
    mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify([{ email: 'test@example.com', password: 'password123' }]));

    const { getByLabelText, getByText } = render(
      <ThemeProvider theme={theme}>
        <SignIn />
      </ThemeProvider>
    );
    fireEvent.change(getByLabelText('Correo'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.click(getByText('Ingresar'));
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });
});