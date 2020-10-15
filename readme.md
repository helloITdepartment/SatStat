# Welcome to SatStat!

Hi! This is SatStat, you premier source for visualizing some cool stats about satellites, the space ships that carried them, and the people that sent them all up (provided you're specifically looking for a school project made by some guys for a databases class).


# How to run

First some requirements. You'll need to have installed:
+ Node
	+ Can be downloaded from NodeJS.org
+ The Node SQLite3 package
	+ Can be installed with `npm install sqlite3`
	
Once all that's ready, you should just be able to `cd` over to the directory it's in, and run `node app.js`.  Your terminal might look like nothing's happened. It went down to the next line and the cursor's blinking, but it didn't even put the prompt like it normally does when waiting for a command. That's good! You're onto the next step. 
(If not, it's likely thrown an error with some huge stack trace. Likely it's just saying that something's not installed. Skim the error, and if that's what it's saying, just install the thing it says is missing. If not, do what every good programmer does and Google the error.)

# How to use

Pop open a web browser and type `localhost:3000` into the URL bar (it's fine if it doesn't come out looking all fancy like that) and hit go, and you should be off to the races.

Fill int he drop downs to complete a mad libs style request for some cool data viz, and hit go. It's possible that the diagram comes out looking like a complete mess. There are just shy of a billion lines going everywhere and they're all super thin so you can't even get your cursor to hover over them to get the data. This happens, for example, when you want to see how many satellites from each country are in which orbital class. 

![Too many lines](https://github.com/helloITdepartment/SatStat/blob/main/%22Way%20too%20many%22%20example.png)

There are simply too many countries. So you can use the "with a minumum of" number box to specify the minimum number of (in this case) satellites that need to be in a flow for it to be displayed

### Special thanks
Big thanks to SankeyMATIC.com, and their open source [Sankey diagram generation library](https://github.com/nowthis/sankeymatic). The main.css and build.css are used from there, very lightly edited if at all, as is SankeyMATIC.js, which was pretty extensively hammered into place so we could work with it. All the rest of the code was written by us.
Edit: the rgb.js and sankey.js were also from them. I believe they're untouched, but I didn't have a clue what they did and was scared to delete them.


