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


const main = document.getElementsByTagName('main')[0];

addEventListener('click', function (e) {
    let href = '';
    e.path.find((a) => {
        return href = a.pathname
    });

    if (/\/[a-z]{0,}$|^\/$/.test(href)) {
        const part = href.split('/');
        const last = part[part.length-1];
        if (last.length && last.split('.').length === 1 && last[last.length-1] !== '/') href+='/'; 
        e.preventDefault();
        if (location.pathname !== href && location.pathname + '/' !== href) {
            history.pushState(null, null, href);
            fetch(href)
            .then(e => e.text())
            .then(e => {
                main.innerHTML = e.match(/<main>.+<\/main>/)[0].replace(/<main>|<\/main>/g, '');
                const header = document.getElementsByTagName('header')[0];
                header.outerHTML = e.match(/<header id=['|"].+['|"]>.+<\/header>/)[0];
                scroll(0, 0);
                document.getElementById('treatment').checked = false;
            })
        }
    }
    else if (event.target.innerText === '»') T(n);
    else if (event.target.innerText === '«') T(p);
});

// if('serviceWorker' in navigator) {
//     try {
//         navigator.serviceWorker.register('/sw.js');
//     } catch(error) {
//         console.error('serviceWorker registration failed', error);
//     }
// }