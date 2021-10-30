var 
i = 0,
c,
a,
t,
m,    // cahce match
P={}, // cahce page
C='className',
O='children',
A='active', // active link class
Z=7000,
S=setTimeout;
function $(e){return document.querySelector(e);} 
function f() {
    c = document.getElementById('c');
    a = c?c[O][2][O]:null;
}
f();

function r(c){if(a)a[i][C]='',c(),a[i][C]='a';}
function n(){r(function(){if(++i>=a.length)i=0;});} // next
function p(){r(function(){if(--i<0)i=a.length-1;});}// prev

function T(c){
    clearTimeout(t);
    c();
    t=S(s,30000);
}

function s() {
    f();
    n();
    t=S(s,Z);
}
t=S(s,Z);

const list = document.querySelectorAll('#n>ul>li');
const next = list[4].querySelectorAll('ul>li');
const nav = (path = location.pathname) => {
    for(m=0;m<list.length;m++)list[m][C]='';
    for(m=0;m<next.length;m++)next[m][C]='';
    const cur = path.replace(/[^a-zA-Z_]/g, '');
    if (cur) {
        switch (cur) {
            case 'contacts':  list[1][C] = A; break;
            case 'documents': list[2][C] = A; break;
            case 'cost':      list[3][C] = A; break;
            default: {
                list[4][C] = A;
                switch (cur) {
                    case 'drink':   next[0][C] = A; break;
                    case 'alcohol': next[1][C] = A; break;
                    case 'drug':    next[2][C] = A; break;
                    case 'game':    next[3][C] = A; break;
                    default:        next[4][C] = A;
                }
            }
        }
    } else {
        list[0][C] = A;
        for(m=4;m>0;)list[m--][C]='';
    }
}
nav();

function getPage (href) {
    if (P[href]) {
        document.title = P[href].match(/<title(.+)<\/title>/)[0].substr(7).replace('</title>', '');
        $('body>h2.d').outerHTML = P[href].match(/<h2 class=['|"]d['|"]>[^<]+<\/h2>/)[0];
        $('body>main').outerHTML = P[href].match(/<main(.+)<\/main>/)[0];
        $('body>header').outerHTML = P[href].match(/<header(.+)<\/header>/)[0];
        history.pushState(null, null, href);
        nav(href);
        window.scroll(0, 0);
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', href);
        xhr.onload = function (e) {
            P[href] = e.target.response;
            getPage(href);
        };
        xhr.send();
    }
}

function hr (e) {
    if (e.href) return e.href;
    else if (e.parentNode) return hr(e.parentNode);
    return '';
}

function Page (e) {
    let href = hr(e.target);
    if (href.indexOf(location.host) > -1) {
        e.preventDefault();
        href = href.replace(location.origin,'');
        if (href.length > 1 && href[href.length-1]!=='/') href+='/';
        const input = document.getElementById('treatment');
        if (input) input.checked = false;
        const input2 = document.getElementById('m');
        if (input2) input2.checked = false;
        getPage(href);
    }
}

addEventListener('popstate',function(){return getPage(location.href)});
addEventListener('click', function (e) {
    switch(e.target.innerText){
        case '»':return T(n); case '«':return T(p);
        default: Page(e);
    }
});

// if('serviceWorker' in navigator) {
//     try {
//         navigator.serviceWorker.register('/sw.js');
//     } catch(error) {
//         console.error('serviceWorker registration failed', error);
//     }
// }