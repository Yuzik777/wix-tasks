import uuid from 'uuid/v4';


function getRandomChar(start: string, end: string){
  return String.fromCharCode(start.charCodeAt(0) + Math.floor((end.charCodeAt(0) - start.charCodeAt(0)) * Math.random()));
}

function getLowercaseChar(){
  return getRandomChar('a', 'z');
}

function getUppercaseChar(){
  return getRandomChar('A', 'Z');
}

export default function getApiKey(): string{
  const keyLength = 12;
  let key = '';
  for(let i = 0; i < keyLength; ++i) {
    key +=  Math.random() > 0.5 ? getLowercaseChar() : getUppercaseChar();
  }
  return key;
}