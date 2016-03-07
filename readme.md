# IDC Blog Viewer Project

### Overview
- Version 1.0
- Responsive IDC Blog Viewer App
- Live link: [idc-blog-viewer]

### Description
Criteria

 - Should not take you more than 5-6 hours (Honor system)
 - Build a JS app using a framework of your choice (CanJS or native JS is a bonus)
 - Use data from this URL: 
    - https://public-api.wordpress.com/rest/v1/sites/idcdistro.wordpress.com/posts/?callback=ajpRspthis 
 - The app should: 
    - Have a single page that displays this data in an elegant way that is responsive.
    - Desktop view should display content in 4 columns somehow
    - Make sure that the view scales responsively for mobile
    - Manage displaying 10 data sets at a time and have a way to see more
    - Represent an MVC approach 
    - Uses semantic markp
    - Bonus (testable)
    - To keep it simple, just testing/coding for Chrome is fine

### Technology Stack

- Yeoman
- NodeJS
- NPM
- Bower
- Gulp
- SASS
- modernizr

### Project Installation

```sh
$ npm install
$ bower install
```

### Run Project

```sh
$ gulp serve

```

### Build Project

```sh
$ gulp build

```



[app]: https://weihsinchen.xyz/idc-blog-viewer/