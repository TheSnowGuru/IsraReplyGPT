chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "generate-reply",
      title: "IsraReply 📣",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "generate-reply") {
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: generateReply
      });
    }
  });
  
  function generateReply() {
    if (typeof window !== 'undefined') {
      // ... existing generateReply function code ...
  
      // Additional code or closing brackets might be needed here
    }
  }
  // Ensure the file ends properly
  // If there are no more functions or code, ensure there is no hanging open bracket or parenthesis.
  if (typeof window !== 'undefined') {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.color = 'blue';
      span.appendChild(range.extractContents());
      range.insertNode(span);
  }
  
  function generateReply() {
    // Retrieve the API key from storage
    chrome.storage.local.get(['open-ai-key'], function(data) {
      const apiKey = data['open-ai-key'];
      if (!apiKey) {
        console.error('API key is not set.');
        return;
      }
  
      // Call your API here or send a message to do it from here
      const apiEndpoint = 'YOUR_API_ENDPOINT'; // Replace with your actual API endpoint
      fetch(apiEndpoint, {
      method: 'POST', // or 'GET'
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify({ text: span.textContent })
    })
    .then(response => response.json())
    .then(data => {
      // Copy the response to the clipboard
      navigator.clipboard.writeText(data.reply_generated).then(function() {
        console.log('Async: Copying to clipboard was successful!');
        // Create a label to indicate that the response is ready
        // Pop up a small window with the response text
        const responseWindow = window.open('', 'ResponseWindow', 'width=400,height=200');
        responseWindow.document.write(`<html><body><p>${data.reply_generated}</p></body></html>`);
        responseWindow.document.close();
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
      console.log(data);
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    });
  }
  