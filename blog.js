// Blog Loader - Fetches blogs from Google Sheets
class BlogLoader {
  constructor() {
    // Replace with your Google Apps Script Web App URL
    this.apiUrl = "https://script.google.com/macros/s/AKfycbw06n0zV9sfbRV4Spq9j7PDObBjEEItZVK4QrdbY1cRtKdBpFPw6tfde6yXlrJhDtmhmg/exec";
    this.blogsContainer = document.getElementById('blogsContainer');
    this.init();
  }

  init() {
    if (this.blogsContainer) {
      this.loadBlogs();
    }
  }

  async loadBlogs() {
    try {
      // Show loading state
      this.showLoading();

      // Fetch blogs from Google Sheets
      const response = await fetch(this.apiUrl);
      const data = await response.json();

      if (data.status === 'success' && data.blogs) {
        this.renderBlogs(data.blogs);
      } else {
        this.showError('Failed to load blogs');
      }
    } catch (error) {
      console.error('Error loading blogs:', error);
      this.showError('Error loading blogs. Please try again later.');
    }
  }

  showLoading() {
    this.blogsContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-muted">Loading blogs...</p>
      </div>
    `;
  }

  showError(message) {
    this.blogsContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fas fa-exclamation-circle text-danger" style="font-size: 3rem;"></i>
        <p class="mt-3 text-danger">${message}</p>
      </div>
    `;
  }

  renderBlogs(blogs) {
    if (blogs.length === 0) {
      this.blogsContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="fas fa-inbox text-muted" style="font-size: 3rem;"></i>
          <p class="mt-3 text-muted">No blogs available at the moment.</p>
        </div>
      `;
      return;
    }

    // Clear container
    this.blogsContainer.innerHTML = '';

    // Render each blog
    blogs.forEach(blog => {
      const blogCard = this.createBlogCard(blog);
      this.blogsContainer.appendChild(blogCard);
    });
  }

  createBlogCard(blog) {
    // Create column div
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';

    // Create card with animation
    col.innerHTML = `
      <div class="card blog-card modern-card h-100 rounded-4 overflow-hidden animate-fade-in">
        <div class="card-img-wrapper">
          <img src="${this.escapeHtml(blog.imageUrl)}" 
               class="card-img-top" 
               alt="${this.escapeHtml(blog.title)}"
               onerror="this.src='assets/imgs/default-blog.jpg'">
        </div>
        <div class="glass-body p-4">
          <h5 class="fw-bold mb-3">${this.escapeHtml(blog.title)}</h5>
          <p class="text-muted">${this.truncateText(this.escapeHtml(blog.content), 120)}</p>
          <a href="${this.escapeHtml(blog.link)}" 
             class="btn btn-outline-dark rounded-pill mt-3 px-4">
            Read More
          </a>
        </div>
      </div>
    `;

    return col;
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new BlogLoader();
});