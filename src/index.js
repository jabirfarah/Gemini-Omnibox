class ChatGPTExtension {
  constructor() {
    this.handleRequest();
  }

  handleRequest() {
    chrome.runtime.onMessage.addListener((request, sender, response) => {
      if (request.action == "PROMPT") this.promptChatGPT();
    });

    console.log("hello world");
  }

  promptChatGPT() {
    const prompt = "What is the capital of Canada?";

    const input = document.querySelector("#prompt-textarea");
    input.focus();
    input.value = prompt;

    // Trigger the input event to ensure any event listeners on the textarea are notified of the change
    input.dispatchEvent(new Event("input", { bubbles: true }));

    const button = document.querySelector("#prompt-textarea~button");

    // Check if the button is disabled before clicking
    if (!button.disabled) {
      button.click();
    }
  }
}

const cGPTExtension = new ChatGPTExtension();
