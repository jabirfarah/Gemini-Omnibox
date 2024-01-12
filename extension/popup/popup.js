const btnSendPrompt = document.querySelector("#btn-send-prompt");
const [currentTab] = await chrome.tabs.query({
  active: true,
  currentWindow: true,
});

btnSendPrompt.addEventListener("click", async () => {
  await chrome.tabs.sendMessage(currentTab.id, {
    action: "PROMPT",
  });
  await console.log(currentTab);
});
