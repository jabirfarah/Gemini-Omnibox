// Listen for a message from the background script to start interacting with the page
console.log("file read!")
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("code running!")
  if (request.action == "PROMPT") {
    // Your code to interact with the page, e.g., input text into a textarea
    const input = document.querySelector("#app-root > side-navigation-v2 > bard-sidenav-container > bard-sidenav-content > div > main > div.content-container.ng-tns-c1097586666-0 > chat-window > div.chat-container.ng-tns-c1234278934-2.ui-v2-enabled.ng-star-inserted.at-least-desktop-small > div.bottom-container.ng-tns-c1234278934-2.ui-v2-enabled.ng-star-inserted > div.input-area-container.ng-tns-c1234278934-2.ng-star-inserted > input-area-v2 > div > div > div.text-input-field_textarea-wrapper.ng-tns-c3265487382-4.with-expansion-padding > div > div > rich-textarea > div.ql-editor.ui-v2-enabled.textarea > p");
    console.log(input.value);
 
    console.log("if statement ran!!")
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.value = request.text;
    // Trigger the input event to ensure any event listeners on the textarea are notified of the change
    // const button = document.querySelector("#prompt-textarea~button");
    // button.click();
    console.log("timeout complete!")
    
  }
});