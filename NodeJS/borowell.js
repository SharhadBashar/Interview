function funA(){
    console.log('A');
}

function funB(){
    console.log('B');
}

function funC(){
    console.log('C');
}

function funD(){
    console.log('D');
}

funA();
funB();
setTimeout(funC, 0);
funD();