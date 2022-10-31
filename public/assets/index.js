let toggleTree = () => {
    let section = document.getElementById('tree-container');
    if (section.style.display === 'none') {
        section.style.display = 'block';
    }
    else {
        section.style.display = 'none';
    }
}