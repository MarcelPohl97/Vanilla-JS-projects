const container = document.querySelector('.seat-container');

container.addEventListener('click', e => {
    if (
      e.target.classList.contains('seat') &&
      !e.target.classList.contains('taken')
    ) {
      e.target.classList.toggle('selection');
    }
  });