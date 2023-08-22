import gsap from 'gsap';

const body = document.body;
const modal = createModal(document.querySelector('#modal-1'));

export function startModalAnimation() {
  modal.open();
}

export function closeModalAnimation() {
  modal.close();
}

function createModal(container) {
  const content = container.querySelector('.modal-content');
  const dialog = container.querySelector('.modal-dialog');
  const polygon = container.querySelector('.modal-polygon');
  const svg = container.querySelector('.modal-svg');

  const point1 = createPoint(45, 45);
  const point2 = createPoint(55, 45);
  const point3 = createPoint(55, 55);
  const point4 = createPoint(45, 55);

  const animation = new TimelineMax({
    onReverseComplete: onReverseComplete,
    onStart: onStart,
    paused: true,
  })
    .to(
      point1,
      0.3,
      {
        x: 15,
        y: 30,
        ease: Power4.easeIn,
      },
      0
    )
    .to(
      point4,
      0.3,
      {
        x: 5,
        y: 80,
        ease: Power2.easeIn,
      },
      '-=0.1'
    )
    .to(point1, 0.3, {
      x: 0,
      y: 0,
      ease: Power3.easeIn,
    })
    .to(
      point2,
      0.3,
      {
        x: 100,
        y: 0,
        ease: Power2.easeIn,
      },
      '-=0.2'
    )
    .to(point3, 0.3, {
      x: 100,
      y: 100,
      ease: Power2.easeIn,
    })
    .to(
      point4,
      0.3,
      {
        x: 0,
        y: 100,
        ease: Power2.easeIn,
      },
      '-=0.1'
    )
    .to(
      container,
      1,
      {
        autoAlpha: 1,
      },
      0
    )
    .to(content, 1, {
      autoAlpha: 1,
    });

  const modal = {
    animation: animation,
    container: container,
    content: content,
    dialog: dialog,
    isOpen: false,
    open: open,
    close: close,
  };

  body.removeChild(container);

  function onClick() {
    if (modal.isOpen) {
      close();
    }
  }

  function onStart() {
    body.appendChild(container);
    container.addEventListener('click', onClick);
  }

  function onReverseComplete() {
    container.removeEventListener('click', onClick);
    body.removeChild(container);
  }

  function open() {
    modal.isOpen = true;
    animation.play().timeScale(2);
  }

  function close() {
    modal.isOpen = false;
    animation.reverse().timeScale(3);
  }

  function createPoint(x, y) {
    const point = polygon.points.appendItem(svg.createSVGPoint());
    point.x = x || 0;
    point.y = y || 0;
    return point;
  }

  return modal;
}
