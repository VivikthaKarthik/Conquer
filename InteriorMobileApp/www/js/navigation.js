function goBack() {
  let history = JSON.parse(localStorage.getItem("navigationHistory")) || [];

  if (history.length > 1) {
    history.pop(); // Remove the current page
    let previousPage = history.pop(); // Get the previous page
    localStorage.setItem("navigationHistory", JSON.stringify(history));
    window.location.href = previousPage.url;
  } else {
    console.log("No previous page found.");
  }
}

// function addToHistory(pageName, currentPage) {
//   displayNavigationLinks();
//   let history = JSON.parse(localStorage.getItem("navigationHistory")) || [];

//   // Check if the current page is already the last entry in the history
//   if (history.length === 0 || history[history.length - 1].url !== currentPage) {
//     history.push({ name: pageName, url: currentPage });
//   }

//   // Limit history size to the last 10 pages
//   if (history.length > 10) {
//     history.shift();
//   }

//   localStorage.setItem("navigationHistory", JSON.stringify(history));
// }

// function displayNavigationLinks() {
//   let history = JSON.parse(localStorage.getItem("navigationHistory")) || [];

//   let navigationLinks = document.getElementById("navigationLinks");
//   if (navigationLinks != null) {
//     navigationLinks.innerHTML = "";

//     // Display the last two pages
//     let previousPage = history[history.length - 1];
//     let listItem = document.createElement("li");

//     // Create an anchor element and set its href and text
//     let anchor = document.createElement("a");
//     anchor.href = previousPage.url;
//     anchor.textContent = previousPage.name;

//     // Append the anchor to the list item
//     listItem.appendChild(anchor);

//     // Append the list item to the navigationLinks container
//     navigationLinks.appendChild(listItem);
//   }
// }

function addToHistory(pageName, currentPage) {
  let history = JSON.parse(localStorage.getItem("navigationHistory")) || [];

  // Check if the current page is already the last entry in the history
  if (history.length === 0 || history[history.length - 1].url !== currentPage) {
    history.push({ name: pageName, url: currentPage });
  }

  // Limit history size to the last 10 pages
  if (history.length > 10) {
    history.shift();
  }

  localStorage.setItem("navigationHistory", JSON.stringify(history));
}

function displayNavigationLinks() {
  let history = JSON.parse(localStorage.getItem("navigationHistory")) || [];

  // history = history.reverse();
  // Get the most recent page from the history
  let lastPage = history.length > 1 ? history[history.length - 2] : null;

  let navigationLinks = document.getElementById("navigationLinks");
  if (navigationLinks != null) {
    navigationLinks.innerHTML = "";

    if (lastPage) {
      let listItem = document.createElement("li");

      // Create an anchor element and set its href and text
      let anchor = document.createElement("a");
      anchor.href = lastPage.url;
      anchor.textContent = lastPage.name;

      // Append the anchor to the list item
      listItem.appendChild(anchor);

      // Append the list item to the navigationLinks container
      navigationLinks.appendChild(listItem);
    }
  }
}

// Event listener for page load
window.addEventListener("DOMContentLoaded", function () {
  // Update and display the navigation links on page load
  displayNavigationLinks();
});

// Event listener for back/forward navigation
window.addEventListener("popstate", function (event) {
  // Perform actions when navigating back/forward
  console.log("Navigated back or forward.");

  // Optionally update or manipulate navigation history here
  displayNavigationLinks(); // Update the navigation links
});
