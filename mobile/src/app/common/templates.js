import { StyleSheet } from 'react-native';
import Default from './templates/default';
console.log(Default);
function createStylesheet(template){
  return StyleSheet.create(template);
}
export const templateSelector = (templateName) =>{
  var styles;
  switch (templateName) {
    case 'default':
      styles = createStylesheet(Default);
      break;
    default:

  }
  return styles;
}
