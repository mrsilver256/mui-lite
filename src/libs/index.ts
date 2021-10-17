export const animatePointer = (e: any, duration: number) => {
  const offset = e.currentTarget.getBoundingClientRect()
  const scaleLevel =
    // take the scale level based on the bigger number between height and width then double it
    // so that the circle drawn can spread to the whole box wherever the click / touch is
    offset.width - offset.height > 0
      ? (offset.width * 2) / 20
      : (offset.height * 2) / 20

  // left and top distance from the click / touch position to the left and top of the box IN THE CURRENT VISIBLE PAGE (approximately equal to the screen size), not the whole PAGE
  const left = e.clientX - offset.left - 10 // the size of the base box is 20, minus 10 to make it grow from the center
  const top = e.clientY - offset.top - 10

  // drawing the animation circle
  const Anim = document.createElement('div')
  Anim.style.top = top.toString() + 'px'
  Anim.style.left = left.toString() + 'px'
  Anim.style.position = 'absolute'
  Anim.style.borderRadius = '50%'
  Anim.style.opacity = '0.6'
  Anim.style.width = '20px'
  Anim.style.height = '20px'
  Anim.style.transition = 'all ' + duration / 1000 + 's'
  Anim.style.webkitBorderRadius = '50%'
  Anim.style.background = 'whitesmoke'
  Anim.style.transformOrigin = '50% 50%'
  if (
    getComputedStyle(e.currentTarget).position !== 'relative' ||
    getComputedStyle(e.currentTarget).overflow !== 'hidden'
  ) {
    console.error(
      'An animated view requires position value is relative and overflow value is hidden'
    )
  }
  // add it to the current element dom (animate inside it)
  e.currentTarget.appendChild(Anim)

  window.requestAnimationFrame(() => {
    setTimeout(() => {
      Anim.style.opacity = '0'
      Anim.style.transform = 'scale(' + scaleLevel * 1.2 + ')' // multiple with 1.2 just to make it more natural
      setTimeout(() => {
        Anim.remove()
      }, duration * 2)
    })
  })
}
