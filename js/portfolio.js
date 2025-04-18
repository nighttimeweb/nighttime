// Portfolio Showcase Component
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
    
    // Create modal for project details
    this.createProjectModal();
    
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
      
      const button = document.createElement('button');
      button.className = 'btn btn-small portfolio-view-btn';
      button.setAttribute('data-project', `project${index + 1}`);
      button.textContent = 'View Details';
      
      info.appendChild(title);
      info.appendChild(category);
      info.appendChild(button);
      overlay.appendChild(info);
      imageContainer.appendChild(image);
      imageContainer.appendChild(overlay);
      item.appendChild(imageContainer);
      gridContainer.appendChild(item);
    });
    
    // Add grid to container
    this.container.appendChild(gridContainer);
  }

  createProjectModal() {
    // Create modal container if it doesn't exist
    let modal = document.getElementById('projectModal');
    
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'project-modal';
      modal.id = 'projectModal';
      
      const modalContent = document.createElement('div');
      modalContent.className = 'modal-content';
      
      const closeButton = document.createElement('span');
      closeButton.className = 'close-modal';
      closeButton.innerHTML = '&times;';
      
      const modalBody = document.createElement('div');
      modalBody.className = 'modal-body';
      
      // Create project details for each project
      this.projects.forEach((project, index) => {
        const projectDetails = document.createElement('div');
        projectDetails.className = 'project-details';
        projectDetails.id = `project${index + 1}-details`;
        
        // Project header
        const projectHeader = document.createElement('div');
        projectHeader.className = 'project-header';
        
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = project.title;
        
        const projectCategory = document.createElement('p');
        projectCategory.className = 'project-category';
        projectCategory.textContent = project.categories ? project.categories.join(', ') : '';
        
        projectHeader.appendChild(projectTitle);
        projectHeader.appendChild(projectCategory);
        
        // Project gallery
        const projectGallery = document.createElement('div');
        projectGallery.className = 'project-gallery';
        
        const mainImage = document.createElement('img');
        mainImage.className = 'project-main-image';
        mainImage.src = project.images && project.images.length > 0 ? project.images[0] : project.thumbnail;
        mainImage.alt = project.title;
        
        const thumbnails = document.createElement('div');
        thumbnails.className = 'project-thumbnails';
        
        if (project.images && project.images.length > 0) {
          project.images.forEach((image, i) => {
            const thumb = document.createElement('img');
            thumb.className = 'project-thumb';
            thumb.src = image;
            thumb.alt = `${project.title} - Image ${i + 1}`;
            thumbnails.appendChild(thumb);
          });
        }
        
        projectGallery.appendChild(mainImage);
        projectGallery.appendChild(thumbnails);
        
        // Project info
        const projectInfo = document.createElement('div');
        projectInfo.className = 'project-info';
        
        const projectDescription = document.createElement('div');
        projectDescription.className = 'project-description';
        
        // Overview
        const overviewTitle = document.createElement('h3');
        overviewTitle.textContent = 'Project Overview';
        
        const overviewText = document.createElement('p');
        overviewText.textContent = project.overview || '';
        
        // Challenge
        const challengeTitle = document.createElement('h3');
        challengeTitle.textContent = 'The Challenge';
        
        const challengeText = document.createElement('p');
        challengeText.textContent = project.challenge || '';
        
        // Solution
        const solutionTitle = document.createElement('h3');
        solutionTitle.textContent = 'Our Solution';
        
        const solutionText = document.createElement('p');
        solutionText.textContent = project.solution || '';
        
        // Results
        const resultsTitle = document.createElement('h3');
        resultsTitle.textContent = 'Results';
        
        const resultsText = document.createElement('p');
        resultsText.textContent = project.results || '';
        
        projectDescription.appendChild(overviewTitle);
        projectDescription.appendChild(overviewText);
        projectDescription.appendChild(challengeTitle);
        projectDescription.appendChild(challengeText);
        projectDescription.appendChild(solutionTitle);
        projectDescription.appendChild(solutionText);
        projectDescription.appendChild(resultsTitle);
        projectDescription.appendChild(resultsText);
        
        // Project meta
        const projectMeta = document.createElement('div');
        projectMeta.className = 'project-meta';
        
        // Client
        const clientItem = document.createElement('div');
        clientItem.className = 'meta-item';
        
        const clientTitle = document.createElement('h4');
        clientTitle.textContent = 'Client';
        
        const clientText = document.createElement('p');
        clientText.textContent = project.client || '';
        
        clientItem.appendChild(clientTitle);
        clientItem.appendChild(clientText);
        
        // Services
        const servicesItem = document.createElement('div');
        servicesItem.className = 'meta-item';
        
        const servicesTitle = document.createElement('h4');
        servicesTitle.textContent = 'Services';
        
        const servicesText = document.createElement('p');
        servicesText.innerHTML = project.services ? project.services.join('<br>') : '';
        
        servicesItem.appendChild(servicesTitle);
        servicesItem.appendChild(servicesText);
        
        // Timeline
        const timelineItem = document.createElement('div');
        timelineItem.className = 'meta-item';
        
        const timelineTitle = document.createElement('h4');
        timelineTitle.textContent = 'Timeline';
        
        const timelineText = document.createElement('p');
        timelineText.textContent = project.timeline || '';
        
        timelineItem.appendChild(timelineTitle);
        timelineItem.appendChild(timelineText);
        
        // Technologies
        const techItem = document.createElement('div');
        techItem.className = 'meta-item';
        
        const techTitle = document.createElement('h4');
        techTitle.textContent = 'Technologies';
        
        const techText = document.createElement('p');
        techText.innerHTML = project.technologies ? project.technologies.join('<br>') : '';
        
        techItem.appendChild(techTitle);
        techItem.appendChild(techText);
        
        projectMeta.appendChild(clientItem);
        projectMeta.appendChild(servicesItem);
        projectMeta.appendChild(timelineItem);
        projectMeta.appendChild(techItem);
        
        projectInfo.appendChild(projectDescription);
        projectInfo.appendChild(projectMeta);
        
        // Project testimonial
        if (project.testimonial) {
          const testimonial = document.createElement('div');
          testimonial.className = 'project-testimonial';
          
          const quoteIcon = document.createElement('div');
          quoteIcon.className = 'quote-icon';
          quoteIcon.innerHTML = '<i class="fas fa-quote-left"></i>';
          
          const quoteText = document.createElement('p');
          quoteText.textContent = project.testimonial.quote || '';
          
          const author = document.createElement('div');
          author.className = 'testimonial-author';
          
          const authorName = document.createElement('h4');
          authorName.textContent = project.testimonial.author || '';
          
          const authorTitle = document.createElement('p');
          authorTitle.textContent = project.testimonial.title || '';
          
          author.appendChild(authorName);
          author.appendChild(authorTitle);
          
          testimonial.appendChild(quoteIcon);
          testimonial.appendChild(quoteText);
          testimonial.appendChild(author);
          
          projectDetails.appendChild(projectHeader);
          projectDetails.appendChild(projectGallery);
          projectDetails.appendChild(projectInfo);
          projectDetails.appendChild(testimonial);
        } else {
          projectDetails.appendChild(projectHeader);
          projectDetails.appendChild(projectGallery);
          projectDetails.appendChild(projectInfo);
        }
        
        modalBody.appendChild(projectDetails);
      });
      
      modalContent.appendChild(closeButton);
      modalContent.appendChild(modalBody);
      modal.appendChild(modalContent);
      
      document.body.appendChild(modal);
    }
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
          if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
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
    const viewButtons = this.container.querySelectorAll('.portfolio-view-btn');
    const modal = document.getElementById('projectModal');
    const closeButton = modal.querySelector('.close-modal');
    
    viewButtons.forEach(button => {
      button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const projectDetails = document.getElementById(`${projectId}-details`);
        
        if (projectDetails) {
          // Hide all project details
          modal.querySelectorAll('.project-details').forEach(details => {
            details.style.display = 'none';
          });
          
          // Show the selected project details
          projectDetails.style.display = 'block';
          
          // Show the modal
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
      });
    });
    
    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close modal when clicking outside the content
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
      }
    });
    
    // Handle thumbnail clicks in project gallery
    const projectThumbs = modal.querySelectorAll('.project-thumb');
    
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

// Sample portfolio data
const portfolioProjects = [
  {
    title: "The Rebbe's Guesthouse",
    categories: ["development", "responsive"],
    thumbnail: "../images/portfolio-1.jpg",
    images:
    overview: "This guesthouse in Crown Heights needed a modern site for group Shabbaton rentals. We focused on clean design, room showcases, and easy-to-navigate information.",
    challenge: "The owners had no online presence and needed a way to attract out-of-town groups for weekends. The site had to be both functional and welcoming.",
    solution: "We created a custom HTML site with a gallery-style layout, room labels, and a booking section that reflects the Shabbos atmosphere and Crown Heights community.",
    results: "The guesthouse is now fully booked most weekends, and visitors report a smooth experience in planning their stay.",
    client: "The Rebbe's Guesthouse",
    services: ["Website Development", "Responsive Layout", "Custom HTML/CSS"],
    timeline: "3 Weeks",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    testimonial: {
      quote: "Honestly, if I had gone with a typical web designer, I would’ve been paying thousands. Peretz built me a site that looks great, works smoothly, and didn’t break the bank.",
      author: "Mendel",
      title: "Owner, The Rebbe's Guesthouse"
    }
  }

  /*
  ,{
    title: "Sweet Delights Bakery",
    categories: ["development", "mobile"],
    thumbnail: "../images/portfolio/portfolio-2.jpg",
    images: [
      "../images/portfolio/project2-full.jpg",
      "../images/portfolio/project2-thumb1.jpg",
      "../images/portfolio/project2-thumb2.jpg",
      "../images/portfolio/project2-thumb3.jpg"
    ],
    overview: "This local bakery needed a website that would showcase their delicious products and help customers easily place orders. We created a mouth-watering design with high-quality imagery and intuitive navigation.",
    challenge: "The bakery had no online presence, making it difficult for potential customers to discover their offerings. They needed a website that would not only showcase their products but also provide information about their story, ingredients, and ordering process.",
    solution: "We designed a visually appealing website with a warm, inviting color palette that reflects the bakery's brand. The site features high-quality images of their products, an easy-to-use menu, and a simple ordering system. We ensured the website was fully responsive, allowing customers to place orders from any device.",
    results: "Since launching the website, the bakery has seen a 40% increase in orders and has attracted customers from beyond their immediate neighborhood. The website has become an essential tool for their business growth.",
    client: "Sweet Delights Bakery",
    services: ["Website Development", "Mobile Optimization", "Photography Coordination"],
    timeline: "4 Weeks",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    testimonial: {
      quote: "Nighttime Website Development transformed our business. Our beautiful new website has helped us reach so many new customers. The ordering system is simple to use, and we've received countless compliments on the design.",
      author: "Sarah Johnson",
      title: "Owner, Sweet Delights Bakery"
    }
  },

  {
    title: "Boutique Clothing Store",
    categories: ["redesign", "mobile"],
    thumbnail: "../images/portfolio/portfolio-3.jpg",
    images: [
      "../images/portfolio/project3-full.jpg",
      "../images/portfolio/project3-thumb1.jpg",
      "../images/portfolio/project3-thumb2.jpg",
      "../images/portfolio/project3-thumb3.jpg"
    ],
    overview: "This boutique clothing store needed a website redesign to better showcase their products and improve the online shopping experience for their customers.",
    challenge: "The store's previous website was outdated, difficult to navigate, and not mobile-friendly. This was resulting in high bounce rates and low conversion rates, especially from mobile users who make up a significant portion of their target audience.",
    solution: "We redesigned the website with a clean, modern aesthetic that puts the focus on their product photography. We implemented an intuitive navigation system, improved product filtering, and created a seamless mobile shopping experience. The new design also better reflects the store's upscale brand identity.",
    results: "After launching the redesigned website, the store saw a 35% decrease in bounce rate, a 40% increase in online inquiries, and a 25% increase in average time spent on the site. Mobile conversions increased by 50%.",
    client: "Elegance Boutique",
    services: ["Website Redesign", "User Experience Design", "Mobile Optimization"],
    timeline: "6 Weeks",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    testimonial: {
      quote: "After Peretz redesigned our website, our online inquiries increased by 40%. The new site is not only beautiful but also much easier for our customers to navigate and find what they need.",
      author: "Emma Rodriguez",
      title: "Owner, Elegance Boutique"
    }
  },

  {
    title: "Professional Services Firm",
    categories: ["development"],
    thumbnail: "../images/portfolio/portfolio-4.jpg",
    images: [
      "../images/portfolio/project4-full.jpg",
      "../images/portfolio/project4-thumb1.jpg",
      "../images/portfolio/project4-thumb2.jpg",
      "../images/portfolio/project4-thumb3.jpg"
    ],
    overview: "This professional services firm needed a sophisticated website that would establish their credibility and help them attract high-quality clients.",
    challenge: "The firm had recently rebranded and needed a website that would reflect their new identity and position them as industry leaders. They needed to communicate complex services in a clear, approachable way while maintaining a professional image.",
    solution: "We created a premium website with a clean, sophisticated design that emphasizes professionalism and expertise. The site features clear service descriptions, team profiles that highlight credentials, and case studies that demonstrate results. We also implemented a blog section for thought leadership content.",
    results: "The new website has helped the firm attract higher-quality clients and establish themselves as thought leaders in their industry. They've reported a 30% increase in qualified leads and have been able to raise their rates due to improved market positioning.",
    client: "Chen & Associates",
    services: ["Website Development", "Content Strategy", "Domain Services"],
    timeline: "8 Weeks",
    technologies: ["HTML5", "CSS3", "JavaScript", "WordPress"],
    testimonial: {
      quote: "The website Nighttime developed for our firm has elevated our professional image and helped us attract higher-quality clients. The process was smooth, and the results exceeded our expectations.",
      author: "Michael Chen",
      title: "Director, Professional Services Firm"
    }
  }
  */
];

// Initialize portfolio showcase when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the portfolio page
  const portfolioContainer = document.getElementById('portfolioContainer');
  
  if (portfolioContainer) {
    new PortfolioShowcase('portfolioContainer', portfolioProjects);
  }
  
  // For homepage portfolio preview
  const portfolioPreview = document.querySelector('.portfolio-preview');
  
  if (portfolioPreview) {
    // Get the first 3 projects for preview
    const previewProjects = portfolioProjects.slice(0, 3);
    
    // Update portfolio items in preview
    const portfolioItems = portfolioPreview.querySelectorAll('.portfolio-item');
    
    if (portfolioItems.length > 0) {
      portfolioItems.forEach((item, index) => {
        if (previewProjects[index]) {
          const project = previewProjects[index];
          
          // Update image
          const image = item.querySelector('img');
          if (image) {
            image.src = project.thumbnail;
            image.alt = project.title;
          }
          
          // Update title
          const title = item.querySelector('h3');
          if (title) {
            title.textContent = project.title;
          }
          
          // Update categories
          const categories = item.querySelector('p');
          if (categories) {
            categories.textContent = project.categories ? project.categories.join(', ') : '';
          }
          
          // Update link
          const link = item.querySelector('a');
          if (link) {
            link.href = `pages/portfolio.html#${item.id}`;
          }
        }
      });
    }
  }
});
