document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const pages = document.querySelectorAll('[data-page]');
    const totalPages = pages.length;
    const modal = document.getElementById('modal');
  
    document.body.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
  
      const action = button.getAttribute('data-action');
  
      if (action) {
        const actions = action.split('-');
  
        actions.forEach((act) => {
          if (act === 'open') {
            modal.showModal();
          } else if (act === 'close') {
            modal.close();
          } else if (['next', 'prev', 'goto'].includes(act)) {
            let targetPage;
            if (act === 'goto') {
              targetPage = parseInt(button.getAttribute('data-target-page'), 10);
            } else {
              const direction = act === 'next' ? 1 : -1;
              targetPage = currentPage + direction;
            }
            navigateToPage(targetPage);
          }
        });
      }
    });
  
    function navigateToPage(newPage) {
      if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
  
      const currentPageEl = document.querySelector(`[data-page="${currentPage}"]`);
      const newPageEl = document.querySelector(`[data-page="${newPage}"]`);
  
      const isForward = newPage > currentPage;
      const exitDirection = isForward ? 'left' : 'right';
      const enterDirection = isForward ? 'right' : 'left';
  
      animatePageTransition(currentPageEl, newPageEl, exitDirection, enterDirection);
      currentPage = newPage;
    }
  
    function animatePageTransition(currentEl, newEl, exitDir, enterDir) {
      currentEl.setAttribute('data-animation', `exit-${exitDir}`);
  
      currentEl.addEventListener('animationend', function onExit() {
        currentEl.removeEventListener('animationend', onExit);
        currentEl.setAttribute('data-visible', 'hidden');
        currentEl.removeAttribute('data-animation');
  
        newEl.setAttribute('data-visible', `stage-${enterDir}`);
        requestAnimationFrame(() => {
          newEl.setAttribute('data-animation', `enter-${enterDir}`);
        });
  
        newEl.addEventListener('animationend', function onEnter() {
          newEl.removeEventListener('animationend', onEnter);
          newEl.setAttribute('data-visible', 'active');
          newEl.removeAttribute('data-animation');
        });
      });
    }
  });
  