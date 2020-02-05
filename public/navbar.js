function classToggle() {
    const navs = document.querySelectorAll('.Navbar_Items')

    navs.forEach(nav => nav.classList.toggle('Navbar_ToggleShow'));
}

document.querySelector('.Navbar_Link-toggle').addEventListener('click', classToggle);