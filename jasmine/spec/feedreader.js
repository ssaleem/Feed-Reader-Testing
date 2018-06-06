/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All of the tests are placed within the $() function,
 * since some of these tests may require DOM elements,
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* First test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in the application.
    */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has non-empty feed url', function(){
            for(const feedItem of allFeeds){
                expect(feedItem.url).toBeDefined();
                expect(feedItem.url).not.toBe('');
            }
         });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has non-empty feed name', function(){
            for(const feedItem of allFeeds){
                expect(feedItem.name).toBeDefined();
                expect(feedItem.name).not.toBe('');
            }
         });
    });


    /* Test suite named "The menu" */
    describe('The menu', function(){

        /* A test that ensures the menu element is
         * hidden by default.
         */
         let bodyElement = document.querySelector('body');
         it('has menu hidden by default', function(){

            expect(bodyElement).toHaveClass('menu-hidden');

         });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          it('menu toggles when clicked', function(){
            let menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click();
            expect(bodyElement).not.toHaveClass('menu-hidden');
            menuIcon.click();
            expect(bodyElement).toHaveClass('menu-hidden');
          });

      });
    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function(){

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
         });

         it('has at least a single .entry element within the .feed container when loadFeed() is called', function(done){
            let entryElements = document.querySelector('.feed').querySelectorAll('.entry');
            expect(entryElements.length).toBeGreaterThan(0);
            done();
         });

     });
    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
         let container = document.querySelector('.feed');
         let contentBefore = '';
         let contentAfter = '';
         beforeEach(function(done){
            loadFeed(0, function(){
                contentBefore = container.textContent;
                loadFeed(1, function(){
                    contentAfter = container.textContent;
                    done();
                });
            });
         });

         it('new feed is loaded when loadFeed() is called', function(done){

            expect(contentAfter).not.toBe(contentBefore);
            done();
         });
     });
}());
