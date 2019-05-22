import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#d95d49',
  secondary: '#32db64',
  light: '#f4f4f4',
  dark: '#222',
  success: '#239846',
  warning: '#dbc024',
  info: '#3388ff',
  danger: '#f53d3d',
};

const appStyles = StyleSheet.create({
  
  buttomFooter: {
    height: 50,
    padding: 10,
    backgroundColor: colors.primary
  },
  buttomFooterText: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center'
  },
});

export default appStyles;