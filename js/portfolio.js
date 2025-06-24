// Portfolio Showcase Component for English version
class PortfolioShowcase {
  constructor(containerId, projects) {
    this.container = document.getElementById(containerId);
    this.projects = projects;
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    if (!this.container) return;
    
    // Create filter buttons
    this.createFilters();
    
    // Create portfolio grid
    this.createPortfolioGrid();
    
    // Initialize event listeners
    this.initEventListeners();
  }

  createFilters() {
    // Get unique categories from projects
    const categories = ['all'];
    this.projects.forEach(project => {
      if (project.categories) {
        project.categories.forEach(category => {
          if (!categories.includes(category)) {
            categories.push(category);
          }
        });
      }
    });
    
    // Create filter container
    const filterContainer = document.createElement('div');
    filterContainer.className = 'portfolio-filters';
    
    // Create filter buttons
    categories.forEach(category => {
      const button = document.createElement('button');
      button.className = 'filter-btn' + (category === 'all' ? ' active' : '');
      button.setAttribute('data-filter', category);
      button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      filterContainer.appendChild(button);
    });
    
    // Add filters to container
    this.container.appendChild(filterContainer);
  }

  createPortfolioGrid() {
    // Create grid container
    const gridContainer = document.createElement('div');
    gridContainer.className = 'portfolio-grid';
    
    // Create portfolio items
    this.projects.forEach((project, index) => {
      const item = document.createElement('div');
      item.className = 'portfolio-item';
      item.id = `project${index + 1}`;
      item.setAttribute('data-category', project.categories ? project.categories.join(' ') : '');
      
      const imageContainer = document.createElement('div');
      imageContainer.className = 'portfolio-image';
      
      const image = document.createElement('img');
      image.src = project.thumbnail;
      image.alt = project.title;
      
      const overlay = document.createElement('div');
      overlay.className = 'portfolio-overlay';
      
      const info = document.createElement('div');
      info.className = 'portfolio-info';
      
      const title = document.createElement('h3');
      title.textContent = project.title;
      
      const category = document.createElement('p');
      category.textContent = project.categories ? project.categories.join(', ') : '';
      
      // Create button group wrapper
      const buttonGroup = document.createElement('div');
      buttonGroup.className = 'button-group';
      
      // Create view details button
      const detailsButton = document.createElement('button');
      detailsButton.className = 'btn btn-small portfolio-view-btn';
      detailsButton.setAttribute('data-project', `project${index + 1}`);
      detailsButton.textContent = 'View Details';
      
      info.appendChild(title);
      info.appendChild(category);
      
      // Add details button to button group
      buttonGroup.appendChild(detailsButton);
      
      // Create visit site button if URL exists
      if (project.url) {
        const visitButton = document.createElement('a');
        visitButton.className = 'btn btn-small';
        visitButton.href = project.url;
        visitButton.target = '_blank';
        visitButton.textContent = 'Visit Site';
        buttonGroup.appendChild(visitButton);
      }
      
      // Add button group to info
      info.appendChild(buttonGroup);
      
      overlay.appendChild(info);
      imageContainer.appendChild(image);
      imageContainer.appendChild(overlay);
      item.appendChild(imageContainer);
      gridContainer.appendChild(item);
    });
    
    // Add grid to container
    this.container.appendChild(gridContainer);
  }

  openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  initEventListeners() {
    // Filter buttons
    const filterButtons = this.container.querySelectorAll('.filter-btn');
    const portfolioItems = this.container.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        this.currentFilter = filter;
        
        // Show/hide portfolio items based on filter
        portfolioItems.forEach(item => {
          const categories = item.getAttribute('data-category').split(' ');
          if (filter === 'all' || categories.includes(filter)) {
            item.style.display = 'block';
            
            // Add animation
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // View project buttons
    const viewButtons = document.querySelectorAll('.portfolio-view-btn, .portfolio-details-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the project id from either data attribute or href
            let projectId;
            if (button.hasAttribute('data-project')) {
                projectId = button.getAttribute('data-project');
            } else if (button.hasAttribute('href')) {
                projectId = button.getAttribute('href').replace('#', '');
            }
            
            if (!projectId) {
                console.error('Project ID not found');
                return;
            }
            
            // Find the modal - could be either projectModal or project1
            let modal = document.getElementById('projectModal');
            if (!modal) {
                modal = document.getElementById(projectId);
            }
            
            if (!modal) {
                console.error('Modal not found for project: ' + projectId);
                return;
            }
            
            // Show the modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Show the specific project details if multiple projects exist
            const projectDetails = modal.querySelectorAll('.project-details');
            if (projectDetails.length > 1) {
                projectDetails.forEach(details => {
                    if (details.id === projectId + '-details') {
                        details.style.display = 'grid';
                    } else {
                        details.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Close modal when clicking the close button
    const closeButtons = document.querySelectorAll('.close-modal');
    if (closeButtons.length > 0) {
      closeButtons.forEach(button => {
        button.addEventListener('click', () => {
          const modal = button.closest('.modal');
          if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
              modal.style.display = 'none';
              document.body.style.overflow = 'auto'; // Re-enable scrolling
            }, 300);
          }
        });
      });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal')) {
        const modal = event.target;
        modal.classList.remove('active');
        setTimeout(() => {
          modal.style.display = 'none';
          document.body.style.overflow = 'auto'; // Re-enable scrolling
        }, 300);
      }
    });
    
    // Handle thumbnail clicks in project gallery
    const projectThumbs = document.querySelectorAll('.project-thumb');
    projectThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const mainImage = thumb.closest('.project-gallery').querySelector('.project-main-image');
        
        if (mainImage) {
          // Swap the src attribute
          mainImage.src = thumb.src;
          
          // Add a small animation
          mainImage.style.opacity = '0';
          setTimeout(() => {
            mainImage.style.opacity = '1';
          }, 100);
        }
      });
    });
  }
}

// Sample portfolio data for English version
const portfolioProjects = [
  {
    title: "The Rebbe's Guests",
    categories: ["development", "responsive"],
    thumbnail: "/images/portfolio-1-en.jpg",
    url: "https://TheRebbesGuests.com",
    overview: "This guesthouse in Crown Heights needed a modern site for group Shabbaton rentals. We focused on clean design, room showcases, and easy-to-navigate information.",
    challenge: "The owners had no online presence and needed a way to attract out-of-town groups for weekends. The site had to be both functional and welcoming.",
    solution: "We created a custom HTML site with a gallery-style layout, room labels, and a booking section that reflects the Shabbos atmosphere and Crown Heights community.",
    results: "The guesthouse is now fully booked most weekends, and visitors consistently mention finding them through their website.",
    client: "Mendel, The Rebbe's Guests",
    services: ["Website Design", "Responsive Development", "SEO Optimization"],
    timeline: "3 weeks",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    images: [
      "/images/portfolio-1-en.jpg"
    ],
    testimonial: {
      quote: "Honestly, if I had gone with a typical web designer, I would've been paying thousands. Peretz built me a site that looks great, works smoothly, and didn't break the bank.",
      author: "Mendel",
      title: "Owner, The Rebbe's Guests"
    }
  }
];

// Initialize portfolio showcase
document.addEventListener('DOMContentLoaded', () => {
  const portfolioContainer = document.getElementById('portfolioContainer');
  
  if (portfolioContainer) {
    new PortfolioShowcase('portfolioContainer', portfolioProjects);
  }
});
