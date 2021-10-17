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


const nav = (path = location.pathname) => {
    const list = document.querySelectorAll('#n>ul>li');
    const next = list[4].querySelectorAll('ul>li');
    const cur = path.replace(/[^a-zA-Z_]/g, '');
    if (cur) {
        list.forEach(e => e.className='');
        next.forEach(e => e.className='');
        switch (cur) {
            case 'contacts':  list[1].className = 'active'; break;
            case 'documents': list[2].className = 'active'; break;
            case 'cost':      list[3].className = 'active'; break;
            default: {
                list[4].className = 'active';
                switch (cur) {
                    case 'drink':        next[0].className = 'active'; break;
                    case 'alcohol':      next[1].className = 'active'; break;
                    case 'drug':         next[2].className = 'active'; break;
                    case 'game':         next[3].className = 'active'; break;
                    default:             next[4].className = 'active'; break;
                }
                break;
            }
        }
    } else {
        list[0].className = 'active';
        list[4].className = list[1].className = list[2].className = list[3].className = '';
    }
}
nav();


addEventListener('click', function (e) {
    let href = '';
    e.path.find((a) => href = a.pathname);
    if (/\/[a-zA-Z_]{0,}$|^\/$/.test(href)) {
        const part = href.split('/');
        const last = part[part.length-1];
        if (last.length&&last.split('.').length===1&&last[last.length-1]!=='/')href+='/'; 
        e.preventDefault();
        if (location.pathname !== href && location.pathname + '/' !== href) {
            fetch(href).then(e=>e.text()).then(e=>{
                try{
                    const h2     = document.querySelector('body>h2.d');
                    const header = document.querySelector('body>header');
                    const main   = document.querySelector('body>main');                    
                    document.title =   e.match(/<title(.+)<\/title>/)[0].substr(7).replace('</title>', '');
                    h2.outerHTML   =   e.match(/<h2 class=['|"]d['|"]>[^<]+<\/h2>/)[0];
                    main.outerHTML =   e.match(/<main(.+)<\/main>/)[0];
                    header.outerHTML = e.match(/<header(.+)<\/header>/)[0];
                    history.pushState(null, null, href);
                    nav(href);
                    const input = document.getElementById('treatment');
                    if (input) input.checked = false;
                    window.scroll(0, 0);
                    f();
                } catch {
                    location.href = href;
                }
            })
        }
    }
    else if (e.target.innerText === '»') T(n);
    else if (e.target.innerText === '«') T(p);
});

// if('serviceWorker' in navigator) {
//     try {
//         navigator.serviceWorker.register('/sw.js');
//     } catch(error) {
//         console.error('serviceWorker registration failed', error);
//     }
// }