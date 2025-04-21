// רכיב תצוגת תיק העבודות
class PortfolioShowcase {
  constructor(containerId, projects) {
    this.container = document.getElementById(containerId);
    this.projects = projects;
    this.currentFilter = 'all';
    this.init();
  }

  init() {
    if (!this.container) return;
    
    // יצירת כפתורי סינון
    this.createFilters();
    
    // יצירת רשת תיק העבודות
    this.createPortfolioGrid();
    
    // יצירת חלון מודאלי לפרטי הפרויקט
    this.createProjectModal();
    
    // אתחול מאזיני אירועים
    this.initEventListeners();
  }

  createFilters() {
    // קבלת קטגוריות ייחודיות מהפרויקטים
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
    
    // יצירת מיכל סינון
    const filterContainer = document.createElement('div');
    filterContainer.className = 'portfolio-filters';
    
    // יצירת כפתורי סינון
    categories.forEach(category => {
      const button = document.createElement('button');
      button.className = 'filter-btn' + (category === 'all' ? ' active' : '');
      button.setAttribute('data-filter', category);
      button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      filterContainer.appendChild(button);
    });
    
    // הוספת סינונים למיכל
    this.container.appendChild(filterContainer);
  }

  createPortfolioGrid() {
    // יצירת מיכל רשת
    const gridContainer = document.createElement('div');
    gridContainer.className = 'portfolio-grid';
    
    // יצירת פריטי תיק העבודות
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
      button.textContent = 'צפה בפרטים';
      
      info.appendChild(title);
      info.appendChild(category);
      info.appendChild(button);
      overlay.appendChild(info);
      imageContainer.appendChild(image);
      imageContainer.appendChild(overlay);
      item.appendChild(imageContainer);
      gridContainer.appendChild(item);
    });
    
    // הוספת הרשת למיכל
    this.container.appendChild(gridContainer);
  }

  createProjectModal() {
    // יצירת מיכל מודאלי אם הוא לא קיים
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
      
      // יצירת פרטי פרויקט לכל פרויקט
      this.projects.forEach((project, index) => {
        const projectDetails = document.createElement('div');
        projectDetails.className = 'project-details';
        projectDetails.id = `project${index + 1}-details`;
        
        // כותרת הפרויקט
        const projectHeader = document.createElement('div');
        projectHeader.className = 'project-header';
        
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = project.title;
        
        const projectCategory = document.createElement('p');
        projectCategory.className = 'project-category';
        projectCategory.textContent = project.categories ? project.categories.join(', ') : '';
        
        projectHeader.appendChild(projectTitle);
        projectHeader.appendChild(projectCategory);
        
        // גלריית הפרויקט
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
            thumb.alt = `${project.title} - תמונה ${i + 1}`;
            thumbnails.appendChild(thumb);
          });
        }
        
        projectGallery.appendChild(mainImage);
        projectGallery.appendChild(thumbnails);
        
        // מידע הפרויקט
        const projectInfo = document.createElement('div');
        projectInfo.className = 'project-info';
        
        const projectDescription = document.createElement('div');
        projectDescription.className = 'project-description';
        
        // סקירה כללית
        const overviewTitle = document.createElement('h3');
        overviewTitle.textContent = 'סקירת הפרויקט';
        
        const overviewText = document.createElement('p');
        overviewText.textContent = project.overview || '';
        
        // האתגר
        const challengeTitle = document.createElement('h3');
        challengeTitle.textContent = 'האתגר';
        
        const challengeText = document.createElement('p');
        challengeText.textContent = project.challenge || '';
        
        // הפתרון
        const solutionTitle = document.createElement('h3');
        solutionTitle.textContent = 'הפתרון שלנו';
        
        const solutionText = document.createElement('p');
        solutionText.textContent = project.solution || '';
        
        // התוצאות
        const resultsTitle = document.createElement('h3');
        resultsTitle.textContent = 'תוצאות';
        
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
        
        // מטא-נתונים של הפרויקט
        const projectMeta = document.createElement('div');
        projectMeta.className = 'project-meta';
        
        // לקוח
        const clientItem = document.createElement('div');
        clientItem.className = 'meta-item';
        
        const clientTitle = document.createElement('h4');
        clientTitle.textContent = 'לקוח';
        
        const clientText = document.createElement('p');
        clientText.textContent = project.client || '';
        
        clientItem.appendChild(clientTitle);
        clientItem.appendChild(clientText);
        
        // שירותים
        const servicesItem = document.createElement('div');
        servicesItem.className = 'meta-item';
        
        const servicesTitle = document.createElement('h4');
        servicesTitle.textContent = 'שירותים';
        
        const servicesText = document.createElement('p');
        servicesText.innerHTML = project.services ? project.services.join('<br>') : '';
        
        servicesItem.appendChild(servicesTitle);
        servicesItem.appendChild(servicesText);
        
        // ציר זמן
        const timelineItem = document.createElement('div');
        timelineItem.className = 'meta-item';
        
        const timelineTitle = document.createElement('h4');
        timelineTitle.textContent = 'ציר זמן';
        
        const timelineText = document.createElement('p');
        timelineText.textContent = project.timeline || '';
        
        timelineItem.appendChild(timelineTitle);
        timelineItem.appendChild(timelineText);
        
        // טכנולוגיות
        const techItem = document.createElement('div');
        techItem.className = 'meta-item';
        
        const techTitle = document.createElement('h4');
        techTitle.textContent = 'טכנולוגיות';
        
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
        
        // עדות לקוח
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
    // כפתורי סינון
    const filterButtons = this.container.querySelectorAll('.filter-btn');
    const portfolioItems = this.container.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // הסרת מחלקת active מכל הכפתורים
        filterButtons.forEach(btn => {
          btn.classList.remove('active');
        });
        
        // הוספת מחלקת active לכפתור שנלחץ
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        this.currentFilter = filter;
        
        // הצגה/הסתרה של פריטי תיק העבודות לפי הסינון
        portfolioItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
            item.style.display = 'block';
            
            // הוספת אנימציה
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
    
    // כפתורי צפייה בפרויקט
    const viewButtons = this.container.querySelectorAll('.portfolio-view-btn');
    const modal = document.getElementById('projectModal');
    const closeButton = modal.querySelector('.close-modal');
    
    viewButtons.forEach(button => {
      button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const projectDetails = document.getElementById(`${projectId}-details`);
        
        if (projectDetails) {
          // הסתרת כל פרטי הפרויקט
          modal.querySelectorAll('.project-details').forEach(details => {
            details.style.display = 'none';
          });
          
          // הצגת פרטי הפרויקט שנבחר
          projectDetails.style.display = 'block';
          
          // הצגת החלון המודאלי
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden'; // מניעת גלילה
        }
      });
    });
    
    // סגירת החלון המודאלי בלחיצה על כפתור הסגירה
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // הפעלת גלילה מחדש
    });
    
    // סגירת החלון המודאלי בלחיצה מחוץ לתוכן
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // הפעלת גלילה מחדש
      }
    });
    
    // טיפול בלחיצות על תמונות ממוזערות בגלריית הפרויקט
    const projectThumbs = modal.querySelectorAll('.project-thumb');
    
    projectThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const mainImage = thumb.closest('.project-gallery').querySelector('.project-main-image');
        
        if (mainImage) {
          // החלפת תכונת src
          mainImage.src = thumb.src;
          
          // הוספת אנימציה קטנה
          mainImage.style.opacity = '0';
          setTimeout(() => {
            mainImage.style.opacity = '1';
          }, 100);
        }
      });
    });
  }
}

// נתוני תיק העבודות לדוגמה
const portfolioProjects = [
  {
    title: "בית הארחה של הרבי",
    categories: ["development", "responsive"],
    thumbnail: "../../images/portfolio-1.jpg",
    overview: "בית הארחה זה בקראון הייטס נזקק לאתר מודרני להשכרת קבוצות לשבתון. התמקדנו בעיצוב נקי, הצגת חדרים ומידע קל לניווט.",
    challenge: "לבעלים לא הייתה נוכחות מקוונת ונזקקו לדרך למשוך קבוצות מחוץ לעיר לסופי שבוע. האתר היה צריך להיות גם פונקציונלי וגם מזמין.",
    solution: "יצרנו אתר HTML מותאם אישית עם פריסה בסגנון גלריה, תוויות חדרים וקטע הזמנות המשקף את אווירת השבת וקהילת קראון הייטס.",
    results: "בית ההארחה כעת מלא ברוב סופי השבוע, ומבקרים מדווחים על חוויה חלקה בתכנון השהות שלהם.",
    client: "בית הארחה של הרבי",
    services: ["פיתוח אתר", "פריסה רספונסיבית", "HTML/CSS מותאם אישית"],
    timeline: "3 שבועות",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    testimonial: {
      quote: "בכנות, אם הייתי הולך עם מעצב אתרים טיפוסי, הייתי משלם אלפים. פרץ בנה לי אתר שנראה נהדר, עובד חלק, ולא שבר את הבנק.",
      author: "מנדל",
      title: "בעלים, בית הארחה של הרבי"
    }
  }
];

// אתחול תצוגת תיק העבודות כאשר ה-DOM נטען
document.addEventListener('DOMContentLoaded', function() {
  // בדיקה אם אנחנו בדף תיק העבודות
  const portfolioContainer = document.getElementById('portfolioContainer');
  
  if (portfolioContainer) {
    new PortfolioShowcase('portfolioContainer', portfolioProjects);
  }
  
  // לתצוגה מקדימה של תיק העבודות בדף הבית
  const portfolioPreview = document.querySelector('.portfolio-preview');
  
  if (portfolioPreview) {
    // קבלת 3 הפרויקטים הראשונים לתצוגה מקדימה
    const previewProjects = portfolioProjects.slice(0, 3);
    
    // עדכון פריטי תיק העבודות בתצוגה מקדימה
    const portfolioItems = portfolioPreview.querySelectorAll('.portfolio-item');
    
    if (portfolioItems.length > 0) {
      portfolioItems.forEach((item, index) => {
        if (previewProjects[index]) {
          const project = previewProjects[index];
          
          // עדכון תמונה
          const image = item.querySelector('img');
          if (image) {
            image.src = project.thumbnail;
            image.alt = project.title;
          }
          
          // עדכון כותרת
          const title = item.querySelector('h3');
          if (title) {
            title.textContent = project.title;
          }
          
          // עדכון קטגוריות
          const categories = item.querySelector('p');
          if (categories) {
            categories.textContent = project.categories ? project.categories.join(', ') : '';
          }
          
          // עדכון קישור
          const link = item.querySelector('a');
          if (link) {
            link.href = `pages/portfolio.html#${item.id}`;
          }
        }
      });
    }
  }
});