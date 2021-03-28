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
	title: "Check my kindness!",
	contexts: ["selection"],
	},(res)=>{console.log(res)});
});
chrome.contextMenus.onClicked.addListener(function(context) {
	console.log("FIRED");
	console.log(context);
	if (context.menuItemId == 'search-dict') return analyzeSentiment(context.selectionText);
});

post = function(url, data) {
	console.log(JSON.stringify(data));
  return fetch(url, {method: "POST", 
	  headers: { "Content-Type": "application/json" }
	  , body: JSON.stringify(data)});
}

analyzeSentiment = function(inputText) {
	post("http://localhost:3000/analyze", {text: inputText})
	.then(async (result) => {
		
		let data = await result.json();
		console.log(data);
		if (data.score.score < 0) { 
		chrome.windows.create({
			url: chrome.runtime.getURL("sad.html"),
			type: 'popup',
   			height: 200, width:200,
			left: 300
			})
		}
		else {
			chrome.windows.create({
				url: chrome.runtime.getURL("happy.html"),
				type: 'popup',
 				height: 200, width:200 ,
				left: 300
			});

		}
	})

}
