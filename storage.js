if(localStorage.getItem('Local count')!=null){
    let t=localStorage.getItem('Local count');
    document.getElementById('head1').innerHTML=t;
}
else{
    localStorage.setItem('Local count',0);
    document.getElementById('head1').innerHTML=0;
}
// document.getElementById(v).innerHTML=c;
if(sessionStorage.getItem('Session count')!=null){
    let t=sessionStorage.getItem('Session count');
    document.getElementById('head2').innerHTML=t;
}
else{
    sessionStorage.setItem('Session count',0);
    document.getElementById('head2').innerHTML=0;
}

function f1(){
    let val1=localStorage.getItem('Local count')
    localStorage.setItem('Local count',++val1);
    f3('head1',val1);
    let val2=sessionStorage.getItem('Session count');
    sessionStorage.setItem('Session count',++val2);
    f3('head2',val2);
}

function f3(v,c){
    document.getElementById(v).innerHTML=c;
}