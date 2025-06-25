'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// BLOG MODAL FUNCTIONALITY - NEW CODE
console.log('Initializing blog modal...');

// Blog modal variables
const blogModalContainer = document.querySelector("[data-blog-modal-container]");
const blogModalCloseBtn = document.querySelector("[data-blog-modal-close-btn]");
const blogOverlay = document.querySelector("[data-blog-overlay]");

// Blog modal elements
const blogModalTitle = document.querySelector("[data-blog-modal-title]");
const blogModalDate = document.querySelector("[data-blog-modal-date]");
const blogModalImg = document.querySelector("[data-blog-modal-img]");
const blogModalText = document.querySelector("[data-blog-modal-text]");
const blogModalCategory = document.querySelector("[data-blog-modal-category]");

// Blog items
const blogItems = document.querySelectorAll("[data-blog-item]");

console.log('Blog items found:', blogItems.length);
console.log('Blog modal container:', blogModalContainer);

// Blog modal toggle function
const blogModalFunc = function () {
  console.log('Blog modal toggle called');
  if (blogModalContainer && blogOverlay) {
    blogModalContainer.classList.toggle("active");
    blogOverlay.classList.toggle("active");
    document.body.classList.toggle('modal-open');
  }
}

// Add click event to all blog items
if (blogItems.length > 0 && blogModalContainer) {
  for (let i = 0; i < blogItems.length; i++) {
    blogItems[i].addEventListener("click", function (e) {
      e.preventDefault();
      console.log('Blog item clicked:', i);
      
      try {
        // Get blog data from clicked item
        const blogTitle = this.querySelector("[data-blog-title]");
        const blogDate = this.querySelector("[data-blog-date]");
        const blogImg = this.querySelector("[data-blog-img]");
        const blogContent = this.querySelector("[data-blog-content]");
        const blogCategory = this.querySelector(".blog-category");
        
        console.log('Blog title element:', blogTitle);
        console.log('Blog content element:', blogContent);
        
        if (blogTitle && blogModalTitle) {
          blogModalTitle.innerText = blogTitle.innerText;
        }
        
        if (blogDate && blogModalDate) {
          blogModalDate.innerText = blogDate.innerText;
          const timeElement = this.querySelector("time");
          if (timeElement) {
            blogModalDate.setAttribute('datetime', timeElement.getAttribute('datetime'));
          }
        }
        
        if (blogImg && blogModalImg) {
          blogModalImg.src = blogImg.src;
          blogModalImg.alt = blogImg.alt;
        }
        
        if (blogContent && blogModalText) {
          blogModalText.innerHTML = blogContent.innerHTML;
        }
        
        if (blogCategory && blogModalCategory) {
          blogModalCategory.innerText = blogCategory.innerText;
          const categoryClasses = blogCategory.className.split(' ');
          const categoryType = categoryClasses.find(cls => cls !== 'blog-category');
          if (categoryType) {
            blogModalCategory.className = `modal-tag ${categoryType}`;
          }
        }
        
        // Update share buttons
        updateShareButtons(blogTitle ? blogTitle.innerText : 'Blog Post', window.location.href);
        
        // Show modal
        blogModalFunc();
        
        // Scroll to top of modal
        setTimeout(() => {
          if (blogModalContainer) {
            blogModalContainer.scrollTop = 0;
          }
        }, 100);
        
      } catch (error) {
        console.error('Error opening blog modal:', error);
      }
    });
  }
} else {
  console.error('Blog items or modal container not found');
}

// Close modal events
if (blogModalCloseBtn) {
  blogModalCloseBtn.addEventListener("click", blogModalFunc);
}

if (blogOverlay) {
  blogOverlay.addEventListener("click", blogModalFunc);
}

// Close modal with Escape key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape" && blogModalContainer && blogModalContainer.classList.contains("active")) {
    blogModalFunc();
  }
});

// Update share buttons function
function updateShareButtons(title, url) {
  const linkedinBtn = document.querySelector("[data-share-linkedin]");
  const twitterBtn = document.querySelector("[data-share-twitter]");
  const facebookBtn = document.querySelector("[data-share-facebook]");
  
  if (linkedinBtn || twitterBtn || facebookBtn) {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    
    if (linkedinBtn) {
      linkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    }
    if (twitterBtn) {
      twitterBtn.href = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    }
    if (facebookBtn) {
      facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    }
  }
}

// Add CSS for body scroll prevention
const style = document.createElement('style');
style.textContent = `
  .modal-open {
    overflow: hidden !important;
    height: 100vh;
  }
`;
document.head.appendChild(style);

console.log('Blog modal initialization complete');
