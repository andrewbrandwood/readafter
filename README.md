ReadAfter
=========

Read after is a link accumulator for those related links that you'd like to read, but want to finish reading the current article.

We've all been there. You're reading an article with an interesting "related link" to another article nested in the context of the current article. Do you carry on reading to later scroll back and find that link? Do you open a new tab, copy the link, then switch back to continue reading? Now you don't have to.

Read after is a jQuery pluginread after that can easily be implemented on any website.

DEMOS
----------
http://readafter.brandwood.com


IMPLEMENTATION
-----------------

	//simple initialise mapescape
	$(document).ready(function(){

		$('article').readafter();

	});

BOWER INSTALL
-----------------
ReadAfter can be installed via bower using the following install command.

bower install readafter


OPTIONS
---------

	- readAfterText		| String  	|	text string for the readafter button.
	- disabledClass		| String  	|	CSS Class applied once the button haas been clicked.
	- afterListTitle	| String  	| 	CSS Class reference to the created list.
	- links				| String  	| 	reference to the links in the article. For secific links change from gereric 'a' to a class name or data attribute.
	- fadeSpeed			| Number  	|	Speed of the fade once list has been added for the first time.
	- scrollFollow		| Boolean 	|	set to false for static scroll tab
	- onBeforeBuildList	| Function  | 	Callback: happens before the list has been built for the first time.
	- onAfterBuildList	| Function  |	Callback: happens after the list has been built for the first time and the fade is complete.
	- onAfterLink		| Function  |	Callback: happens every time a link is added.
