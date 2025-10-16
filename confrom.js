// Contact Form Handler - Simple Version
class ContactFormHandler {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.modal = null;
    this.modalMessage = document.getElementById('modalMessage');
    // Replace with your Google Apps Script Web App URL
    this.scriptUrl = "https://script.google.com/macros/s/AKfycbwd4jn2P-0Ym4KV5xOf0LQrNq5lReB4ogkB4wbsT1UEJsFHkdrL_3d-TPWAti93hOV8Qw/exec";
    
    this.init();
  }

  init() {
    const modalElement = document.getElementById('responseModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
    }

    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.form.checkValidity()) {
      this.form.classList.add('was-validated');
      return;
    }

    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    // Show loading state
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    submitButton.disabled = true;

    // Prepare form data
    const formData = {
      name: this.form.name.value.trim(),
      email: this.form.email.value.trim(),
      subject: this.form.subject.value.trim(),
      message: this.form.message.value.trim()
    };

    try {
      const response = await fetch(this.scriptUrl, {
        method: "POST",
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.status === "success") {
        this.showSuccess();
        this.form.reset();
        this.form.classList.remove('was-validated');
      } else {
        this.showError("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
      this.showError("Network error. Please try again.");
    } finally {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  }

  showSuccess() {
    if (this.modalMessage && this.modal) {
      this.modalMessage.textContent = "Thank you! Your message has been sent successfully. We'll get back to you soon.";
      this.modal.show();
    }
  }

  showError(message) {
    if (this.modalMessage && this.modal) {
      this.modalMessage.textContent = message;
      this.modal.show();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ContactFormHandler();
});