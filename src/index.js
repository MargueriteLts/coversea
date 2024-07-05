import './index.css'

import ogImage from './images/ui/websitethumbnail.jpg';

// Dynamically set meta tags for og:image and twitter:image
document.addEventListener('DOMContentLoaded', () => {
  const metaOgImage = document.createElement('meta');
  metaOgImage.setAttribute('property', 'og:image');
  metaOgImage.setAttribute('content', ogImage);
  document.head.appendChild(metaOgImage);

  const metaTwitterImage = document.createElement('meta');
  metaTwitterImage.setAttribute('property', 'twitter:image');
  metaTwitterImage.setAttribute('content', ogImage);
  document.head.appendChild(metaTwitterImage);
});

//document.addEventListener('DOMContentLoaded', () => {
//})
