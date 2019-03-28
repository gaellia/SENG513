# SENG513

## Group members read me!

### Setting up your development environment

* Download and install node js
* Download and install git
* Download and install Visual Studio Code
* Open Visual Studio Code and open terminal (Ctrl + `)
* `git clone` this repository
* `npm install` at the main directory
* `npm install` at /functions


#### Front End
* Open index.html USING FIREFOX

#### Back End (functions)
* `npm install firebase-tools -g` at main directory to install firebase
* `firebase login` to login
* `firebase serve` at main directory to start server
* load "Local server" on browser
* (Ctrl + C) then `Y` when finished

### Making changes

* Create your own personal branch on github. do NOT make commits on master
* `git fetch` then `git checkout <your-branch-name>`
* only commit WORKING 'checkpoints' to make roll backs easy to manage
* If you're making functions in the backend, make tests for it and make sure they pass
* When finished all commits, `git pull origin master` and merge first followed by `git push`
* Create a pull request on github for other group members to review

### Troubleshooting

* If a new package was installed (check package.json for changes), make sure to run `npm install` again locally.
* Try stack overflow/google searches first, the contact team members

#### Help I don't understand web development

* `/public` - contains the front-end (client side) html, css, and javascript
  * Communicates to the backend only through api calls
  * No file sharing and using require between front and back. Ever.
    * I'd rather you have two copies of the same file if absolutely needed
    * Import javascript dependencies using CDNs or literally copying the js file and putting it somewhere in public
* `/functions` - contains the back-end (server side) javascript
  * Communicates to database (will probably be mongo)
  * Easily testable with mocha - complicated logic belongs here
* `package.json` - keeps track of dependencies. When `npm install`, it refers to package.json to determine what dependencies to install
* What's a dependency?
  * Code that you didn't write
