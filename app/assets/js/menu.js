function openMenu () {
  let x = document.getElementById("navbar");
  // x.style.display = 'block'
  x.style.top = '-1px'
  x.style.transition = '.3s'
}

function  closeMenu () {
  let x = document.getElementById("navbar");
  // x.style.display = 'none'
  x.style.top = '-590px'
  x.style.transition = '.3s'
}