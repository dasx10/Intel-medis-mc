var i = 0,
c,a,t,
C='className'
S=setTimeout;
function f() {
    c = document.getElementById('c');
    if (c) a = c.children[2].children;
    else a = null;
}
f();

function r(c){
    if (a) {
        a[i][C]='';
        c();
        a[i][C]='a';
    }
}

function n(){
    r(function(){if(++i>=a.length)i=0;});
}

function p(e){
    r(function(){if(--i<0)i=a.length-1;});
}

function T(c){
    clearTimeout(t);
    c();
    t=S(s,30000);
}

function s() {
    f();
    n();
    t=S(s,7000);
}
t=S(s,7000);

addEventListener('click', function (event) {
    if (/\/[a-z]{0,}$|^\/$/.test(event.target.pathname)) {
        // event.preventDefault();
        console.dir(event.target);
    }
    else if (event.target.innerText === '»') T(n);
    else if (event.target.innerText === '«') T(p);
});