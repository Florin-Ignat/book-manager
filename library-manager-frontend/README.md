# This is a frontend application that uses the books_library_app_mock_server and serves a book manager.

# Prerequisites
1. install node version 18.19 or higher
2. install and run books_library_app_mock_server on port 3001
3. Add this code in the index.js file of the server at line 7, this is needed for image upload. If you don't want to do this, just don't upload an image

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
