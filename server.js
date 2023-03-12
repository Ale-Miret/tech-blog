// Import dependencies
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

// Create an instance of the express app
const app = express();

// Set up the port
const PORT = process.env.PORT || 3001;

// Set up session middleware
app.use(
  session({
    secret: 'super secret',
    resave: false,
    saveUninitialized: true
  })
);

// Set up handlebars as the view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set up middleware to handle POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up static directory
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const routes = require('./controllers');

// Set up routes
app.use(routes);

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
