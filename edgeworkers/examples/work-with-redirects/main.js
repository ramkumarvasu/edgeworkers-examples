// Browser Example
// This example provides a friendly 403 page for unsupported browsers and also supported browsers but unsupported versions
// Set the supported browsers and the min browser version supported for those browsers

var embargoedBrowser = ["Firefox", "Chrome"];
var embargoedVersion = [78, 86]

export function onClientRequest(request) {

  // Collect the end user's browser based on Akamai EdgeScape data
  let browser = (request.device.brandName) ? request.device.brandName : "N/A";

  // Collect the end user's browser version based on Akamai EdgeScape data
  let version = (request.device.modelName) ? request.device.modelName : "N/A";

var i;
for (i = 0; i < embargoedBrowser.length; i++)

  {
  // Provide appropriate messaging based on embargo status. If 
  if (browser == embargoedBrowser[i]) 
      {
      if (version >= embargoedVersion[i])
        { 
        request.respondWith(200, {'Content-Type': ['text/html;charset=utf-8']  }, '<html><body><h1>Hello '+browser+' '+version+' from Akamai EdgeWorkers!</h1></body></html>');
        }
      else
        {
        request.respondWith(403, {'Content-Type': ['text/html;charset=utf-8']  }, '<html><body><h1>Sorry, '+browser+' '+version+' is not supported; please upgrade to a supported version</h1></body></html>', 'EW-embargo');
        }
      break;
      }
  }
// Check if end user's browser is in embargo list
  let embargoed = embargoedBrowser.includes(browser);

  // Provide appropriate messaging based for unsupported browser
  if (!embargoed)
    {request.respondWith(403, {'Content-Type': ['text/html;charset=utf-8']  }, '<html><body><h1>Sorry, your browser '+browser+' is not supported; please use a supported browser</h1></body></html>', 'EW-embargo');
    }
}