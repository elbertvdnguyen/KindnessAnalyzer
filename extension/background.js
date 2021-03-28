let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({color});
	console.log('Default background color set to %cgreen', `color: ${color}`);
});

searchUrbanDict = function (word) {
	var query = word.selectionText;
	chrome.tabs.create({url: "http://www.urbandictionary.com/define.php?term=" + query});
}

chrome.runtime.onInstalled.addListener(function() {
	console.log("Adding eddit..");
	chrome.contextMenus.create({
	id: 'search-dict',
	title: "Search in urbdict",
	contexts: ["selection"],
	},(res)=>{console.log(res)});
});
chrome.contextMenus.onClicked.addListener(function() {
	console.log("FIRED");
});
