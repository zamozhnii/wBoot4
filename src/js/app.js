const btnSidebar = document.querySelector('.btn-sidebar');

var menuOpen = 'true';

btnSidebar.addEventListener('click', () => {
    let menuNav = document.querySelector('.wrap-nav');
    menuNav.classList.toggle('wrap-left');
});


const navigations = document.querySelectorAll('.navigation__item a');
navigations.forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        let target = e.target;
        let content = e.target.text;
        if(content !== 'Pipe Tobacco') {
            document.querySelector('.quality-wrap__item small').innerHTML = '';
            document.querySelector('.quality-wrap__tob').innerHTML = content;
            document.querySelector('.wrap-descr').style.visibility = 'hidden';
        } else {
            document.querySelector('.quality-wrap__item small').innerHTML = 'Pipe';
            document.querySelector('.quality-wrap__tob').innerHTML = 'Tobacco';
            document.querySelector('.wrap-descr').style.visibility = 'visible';
        }
    })
});


const search = document.querySelector('.btn-search');

search.addEventListener('click', () => document.querySelector('.search-input').classList.toggle('search-input-visib'));