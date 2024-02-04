// Listen for a message from the background script to start interacting with the page
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "PROMPT") {
    // Your code to interact with the page, e.g., input text into a textarea
    const input = document.querySelector("#prompt-textarea");
    console.log(input);
    if (input) {
      input.value = request.text;
      // Trigger the input event to ensure any event listeners on the textarea are notified of the change
      input.dispatchEvent(new Event("input", { bubbles: true }));
      const button = document.querySelector("#prompt-textarea~button");
      button.click();
    }
  }
});