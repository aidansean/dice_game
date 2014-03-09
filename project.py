from project_module import project_object, image_object, link_object, challenge_object

p = project_object('dice_game', 'Generic dice game')
p.domain = 'http://www.aidansean.com/'
p.path = 'dice_game'
p.preview_image_ = image_object('http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg', 408, 287)
p.github_repo_name = 'dice_game'
p.mathjax = False
p.links.append(link_object(p.domain, 'dice_game/', 'Live page'))
p.introduction = 'This project is a rewrite of a previous project  It emulates the popular dice game, Yahtzee.  This game previusly used PHP, but was converted to Javascript once I became sufficiently skilled to rewrite it.'
p.overview = '''The user clicks to roll the dice, with the interactions being detected by event listeners.  As the user fills in the scores the corresponding boxes are removed via the DOM.  Users can submit scores via AJAX which are then stored in a MySQL table.'''

p.challenges.append(challenge_object('This page requires dynamic HTML content to allow the buttons to be removed as the user clicks them, and added as the game is reset.', 'This is simply achieved using the HTML DOM.', 'Resolved'))
