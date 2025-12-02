// onionring.js is made up of four files - onionring-widget.js (this one!), onionring-index.js, onionring-variables.js and onionring.css
// it's licensed under the cooperative non-violent license (CNPL) v4+ (https://thufie.lain.haus/NPL.html)
// it was originally made by joey + mord of allium house, last updated 2020-11-24

// === ONIONRING-WIDGET ===
//this file contains the code which builds the widget shown on each page in the ring. ctrl+f 'EDIT THIS' if you're looking to change the actual html of the widget

var tag = document.getElementById(ringID); //find the widget on the page

thisSite = window.location.href; //get the url of the site we're currently on
thisIndex = null;

// go through the site list to see if this site is on it and find its position
for (i = 0; i < sites.length; i++) {
  if (thisSite.startsWith(sites[i])) { //we use startswith so this will match any subdirectory, users can put the widget on multiple pages
    thisIndex = i;
    break; //when we've found the site, we don't need to search any more, so stop the loop
  }
}

function randomSite() {
  otherSites = sites.slice(); //create a copy of the sites list
  otherSites.splice(thisIndex, 1); //remove the current site so we don't just land on it again
  randomIndex = Math.floor(Math.random() * otherSites.length);
  location.href = otherSites[randomIndex];
}

//if we didn't find the site in the list, the widget displays a warning instead
if (thisIndex == null) {
  tag.insertAdjacentHTML('afterbegin', `
<table>
  <tr>
    <td>This site isn't part of the ${ringName} webring yet. You should talk to the manager to have your site added to the list!</td>
  </tr>
</table>
  `);
}
else {
  //find the 'next' and 'previous' sites in the ring. this code looks complex
  //because it's using a shorthand version of an if-else statement to make sure
  //the first and last sites in the ring join together correctly
  previousIndex = (thisIndex-1 < 0) ? sites.length-1 : thisIndex-1;
  nextIndex = (thisIndex+1 >= sites.length) ? 0 : thisIndex+1;

  indexText = ""
  //if you've chosen to include an index, this builds the link to that
  if (useIndex) {
    indexText = `<a href='${indexPage}'>index</a> | `;
  }

  randomText = ""
  //if you've chosen to include a random button, this builds the link that does that
  if (useRandom) {
    randomText = `<a href='javascript:void(0)' onclick='randomSite()'>random</a> | `;
  }

  //this is the code that displays the widget - EDIT THIS if you want to change the structure
  tag.insertAdjacentHTML('afterbegin', `
<img src="https://torquuato.github.io/manxring/manxring.png" usemap="#image-map">

<map name="image-map">
    <area target='_blank' href='${sites[previousIndex]}' coords='19,134,91,160' shape='rect'>
    <area target='_blank' href='${sites[nextIndex]}' coords='272,42,339,67' shape='rect'>
    <area target='_blank' href='javascript:void(0)' onclick='randomSite()' coords='193,307,249,284' shape='rect'>
    <area target='_blank' href='${indexPage}' coords='152,138,120,171,116,179,102,195,101,208,109,220,119,224,132,237,171,267,172,275,164,312,170,316,182,306,186,290,201,272,198,263,187,261,178,249,161,223,151,214,140,206,179,177,223,190,241,190,257,195,272,184,275,175,272,166,279,142,282,119,283,100,297,91,327,83,329,78,314,73,301,75,283,74,274,73,270,80,270,91,257,116,248,140,247,157,244,157,219,145,201,135,185,90,179,82,172,62,163,57,150,55,137,65,127,67,91,82,82,89,74,89,57,78,42,63,35,64,39,80,50,91,56,104,57,111,63,116,74,109,86,106,108,104,128,99,139,96,147,89' shape='poly'>
</map>
  `);

}