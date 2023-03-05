chrome.runtime.onInstalled.addListener(async () => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

function reddenPage() {
  document.body.style.backgroundColor = "red";
}

chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === "ON" ? "OFF" : "ON";

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  if (nextState === "OFF") {
    chrome.tabs.captureVisibleTab(null, {}, function (image) {
      chrome.tabs.sendMessage(tab.id, { isOff: true });
    });

    return;
  }

  await chrome.scripting.insertCSS({
    files: ["css/tooltip.css"],
    target: { tabId: tab.id },
  });

  chrome.tabs.captureVisibleTab(null, {}, function (image) {
    chrome.tabs.sendMessage(tab.id, { image });
  });
});
