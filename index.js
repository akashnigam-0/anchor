const form = document.querySelector('form');
const loaderSection = document.getElementById('loader');
const resultSection = document.getElementById('result-page');
const subscriberCount = document.getElementById('subscriber-count');
const likes = document.getElementById('likes');
const comments = document.getElementById('comments');
const views = document.getElementById('views');
const earnings = document.getElementById('earnings');
const rank = document.getElementById('rank');
const requestCallbackPopup = document.getElementById('request-callback-popup');
const successMessage = document.getElementById('success-message');
const callbackForm = requestCallbackPopup.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const videoLink = event.target.elements['video-link'].value;
  loaderSection.style.display = 'block';
  resultSection.style.display = 'none';
  const videoData = await getVideoData(videoLink);
  loaderSection.style.display = 'none';
  resultSection.style.display = 'block';
  subscriberCount.textContent = videoData.subscriberCount;
  likes.textContent = videoData.likes;
  comments.textContent = videoData.comments;
  views.textContent = videoData.views;
  earnings.textContent = videoData.earnings;
  rank.textContent = videoData.rank;
});

callbackForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target.elements['name'].value;
  const contactNumber = event.target.elements['contact-number'].value;
  const preferredTime = event.target.elements['preferred-time'].value;
  const additionalComments = event.target.elements['additional-comments'].value;
  sendCallbackRequest(name, contactNumber, preferredTime, additionalComments);
  requestCallbackPopup.style.display = 'none';
  successMessage.style.display = 'block';
});

function getVideoData(videoLink) {
  return new Promise((resolve) => {
    // Use Youtube Video API to get video data
    const subscriberCount = 100000;
    const views = 304646;
    const comments = 234;
    const likes = 2543;
    const earnings = Math.min(subscriberCount, views) + 10 * comments + 5 * likes;
    const rank = 1;
    resolve({ subscriberCount, views, comments, likes, earnings, rank });
  });
}

function sendCallbackRequest(name, contactNumber, preferredTime, additionalComments) {
    // Create a transporter using SMTP transport configuration (replace with your own SMTP settings)
    const transporter = nodemailer.createTransport({
      host: 'we need to add smtp server here',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@example.com',
        pass: 'your-password'
      }
    });
  
    // Compose the email content
    const mailOptions = {
      from: 'akashnigam0001@gmail.com',
      to: 'ravi@anchors.in',
      subject: 'Callback Request',
      html: `
        <h3>Callback Request</h3>
        <p>Name: ${name}</p>
        <p>Contact Number: ${contactNumber}</p>
        <p>Preferred Time for Callback: ${preferredTime}</p>
        <p>Additional Comments or Questions:</p>
        <p>${additionalComments}</p>
      `
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
