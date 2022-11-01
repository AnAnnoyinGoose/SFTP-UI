let toggleTree = () => {
    let section = document.getElementById('tree-container');
    if (section.style.display === 'none') {
        section.style.display = 'block';
    }
    else {
        section.style.display = 'none';
    }
}

// when the user right-clicks on the tree
// a context menu appears
// containing the options to download, upload, delete, and rename
// the file or folder

const contextMenu = (e) => {
    e.preventDefault();
    let menu = document.getElementById('context-menu');
    menu.style.display = 'block';
    menu.style.top = e.pageY + 'px';
    menu.style.left = e.pageX + 'px';
    let menuItems = document.getElementsByClassName('menu-item');
    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('click', (e) => {
            console.log(e.target.innerText);
            menu.style.display = 'none';
        })
    }
}

