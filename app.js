document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('sakthivel-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('sakthivel-theme', newTheme);
        });
    }

    // Active Section Highlight on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-btn');
    const navLinksContainer = document.getElementById('nav-links');

    if (mobileBtn && navLinksContainer) {
        mobileBtn.addEventListener('click', () => {
            if (navLinksContainer.style.display === 'flex') {
                navLinksContainer.style.display = 'none';
            } else {
                navLinksContainer.style.display = 'flex';
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '76px';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.right = '0';
                navLinksContainer.style.background = 'var(--bg-nav)';
                navLinksContainer.style.padding = '20px';
                navLinksContainer.style.borderBottom = '1px solid var(--border-color)';
                navLinksContainer.style.gap = '12px';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    navLinksContainer.style.display = 'none';
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                navLinksContainer.style.display = 'flex';
                navLinksContainer.style.flexDirection = 'row';
                navLinksContainer.style.position = 'static';
                navLinksContainer.style.background = 'transparent';
                navLinksContainer.style.padding = '0';
                navLinksContainer.style.borderBottom = 'none';
            } else {
                navLinksContainer.style.display = 'none';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.close-modal');
  const certButtons = document.querySelectorAll('.view-cert-btn');

  // 1. Open Modal and set image source
  certButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      // Get the image path from the data attribute
      const imageSrc = button.getAttribute('data-cert-src');
      
      // Set the modal image source
      modalImg.src = imageSrc;
      
      // Show the modal
      modal.classList.add('show');
      
      // Prevent background scrolling while modal is open
      document.body.style.overflow = 'hidden'; 
    });
  });

  // Function to close the modal
  const closeModal = () => {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore background scrolling
    
    // Clear the image source after the fade-out transition finishes
    setTimeout(() => {
      modalImg.src = '';
    }, 300); 
  };

  // 2. Close when clicking the "X"
  closeBtn.addEventListener('click', closeModal);

  // 3. Close when clicking outside the image (on the dark overlay)
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // 4. Close when pressing the Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
});