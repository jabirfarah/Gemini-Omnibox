console.log("start");

function openNewTab(url) {
  chrome.tabs.create({ url: url }, function (tab) {
    console.log("New tab opened with URL: " + url);
  });
}

chrome.omnibox.onInputEntered.addListener(async function (text) {
  console.log("Input entered: " + text);
  let url = "https://gemini.google.com/app";
  openNewTab(url);

  // Wait for the new tab to finish loading
  chrome.tabs.onUpdated.addListener(function listener(tabId, completion, tab) {
    setTimeout(() => {
      if (tabId == tab.id && completion.status == "complete") {
        // The tab has finished loading, remove the listener and send the message
        chrome.tabs.onUpdated.removeListener(listener);
        console.log(tabId);
        console.log(tab);
        console.log(completion);
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tab.id, {
            action: "PROMPT",
            text: text,
          });
        });
      }
    }, 3000)
    
  });
});

chrome.contextMenus.create({
  id: "myContextMenu",
  title: "Use selected text as Gemini prompt",
  contexts: ["selection"]
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log(info)
  console.log(tab)
  openNewTab("https://gemini.google.com/app");

  chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
    if (tabId == tab.id && changeInfo.status == "complete") {
      // The tab has finished loading, remove the listener and send the message
      chrome.tabs.onUpdated.removeListener(listener);
      // console.log(tabId);
      // console.log(tab);
      // console.log(changeInfo);
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "PROMPT",
          text: info.selectionText,
        });
      });
    }
  });

})