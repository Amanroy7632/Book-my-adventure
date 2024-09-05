// By chat gpt 
const express = require('express');
const app = express();

// In-memory store for rate limiting (consider using a database or cache in production)
const rateLimitStore = {};

// Rate limiter middleware
const rateLimiter = (req, res, next) => {
  const userIP = req.ip;
  const currentTime = Date.now();
  const windowSize = 60 * 1000; // 1 minute in milliseconds
  const maxRequests = 100; // Max requests per window

  if (!rateLimitStore[userIP]) {
    rateLimitStore[userIP] = [];
  }

  // Filter out timestamps older than the window size
  rateLimitStore[userIP] = rateLimitStore[userIP].filter(
    (timestamp) => currentTime - timestamp < windowSize
  );

  if (rateLimitStore[userIP].length >= maxRequests) {
    // User has exceeded the rate limit
    res.status(429).send('Too many requests. Please try again later.');
  } else {
    // Add the current timestamp to the user's request history
    rateLimitStore[userIP].push(currentTime);
    next(); // Proceed to the next middleware or route handler
  }
};

// Apply the rate limiter to all routes
app.use(rateLimiter);

// Example route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
