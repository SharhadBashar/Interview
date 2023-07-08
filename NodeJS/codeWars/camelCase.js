/*
Complete the method/function so that it converts dash/underscore delimited words into camel casing. The first word within the output should be capitalized only if the original word was capitalized.

Examples
toCamelCase("the-stealth-warrior") // returns "theStealthWarrior"

toCamelCase("The_Stealth_Warrior") // returns "TheStealthWarrior"
*/

function toCamelCase(s){
  if (s.includes('-')){
    var res = s.split('-');
    var camelString = res[0];
    for (var i = 1; i < res.length; i++){
      res[i] = res[i].charAt(0).toUpperCase() + res[i].slice(1);;
      camelString += res[i];
    }
  }
  else if (s.includes('_')){
    var res = s.split('_');
    var camelString = res[0];
    for (var i = 1; i < res.length; i++){
      res[i] = res[i].charAt(0).toUpperCase() + res[i].slice(1);;
      camelString += res[i];
    }
  }
  return camelString;
}

console.log(toCamelCase("the-stealth-warrior"));
console.log(toCamelCase("The_Stealth_Warrior"));