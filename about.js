// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Get references to elements
  const filter = document.getElementById('filter');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Handle filter dropdown change
  filter.addEventListener('change', function(event) {
    const selectedValue = event.target.value;
    console.log(`Filter changed to: ${selectedValue}`);
    
    // You can add custom logic here based on selection
    if (selectedValue === 'popular') {
      // Load popular content
      console.log('Loading popular content...');
    } else if (selectedValue === 'latest') {
      // Load latest content
      console.log('Loading latest content...');
    }
  });
  
  // Handle login button click
  loginBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    console.log('Login button clicked');
    
  });
  
  // Handle signup button click
  signupBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    console.log('Sign Up button clicked');
    
  });
  
  // Handle navigation link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default anchor behavior
      const linkText = this.textContent;
      console.log(`${linkText} link clicked`);
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');

    });
  });
  
  
});