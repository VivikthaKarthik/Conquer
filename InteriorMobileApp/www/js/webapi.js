// commonApi.js

// Utility function to handle AJAX requests
function ajaxRequest(method, controller, action, data, onSuccess, onFailure) {
  var baseUrl = "https://localhost:7092/api";
  var url = baseUrl + "/" + controller + "/" + action;
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status >= 200 && xhr.status < 300) {
        let response = JSON.parse(xhr.responseText);
        if (response.isSuccess) {
          onSuccess(response);
        } else {
          onFailure(response.message);
        }
      } else if (xhr.status == 404) {
        alert(
          "Unable to reach Web Service. Please check Web Service Status!.."
        );
      } else {
        onFailure(`HTTP Error: ${xhr.status}`);
      }
    }
  };

  xhr.onerror = function (error) {
    onFailure("Request failed");
  };

  xhr.send(data ? JSON.stringify(data) : null);
}

// GET request
function get(controller, action, onSuccess, onFailure) {
  ajaxRequest("GET", controller, action, null, onSuccess, onFailure);
}

// POST request
function post(controller, action, data, onSuccess, onFailure) {
  ajaxRequest("POST", controller, action, data, onSuccess, onFailure);
}

// PUT request
function put(controller, action, data, onSuccess, onFailure) {
  ajaxRequest("PUT", controller, action, data, onSuccess, onFailure);
}

// DELETE request
function del(controller, action, data, onSuccess, onFailure) {
  ajaxRequest("DELETE", controller, action, data, onSuccess, onFailure);
}

// Usage examples:

// Example of GET
// get('https://api.example.com/resource',
//     function(data) { console.log('Success:', data); },
//     function(error) { console.log('Error:', error); }
// );

// Example of POST
// post('https://api.example.com/resource', { key: 'value' },
//     function(data) { console.log('Success:', data); },
//     function(error) { console.log('Error:', error); }
// );

// Example of PUT
// put('https://api.example.com/resource/1', { key: 'updatedValue' },
//     function(data) { console.log('Success:', data); },
//     function(error) { console.log('Error:', error); }
// );

// Example of DELETE
// del('https://api.example.com/resource/1', null,
//     function(data) { console.log('Success:', data); },
//     function(error) { console.log('Error:', error); }
// );
