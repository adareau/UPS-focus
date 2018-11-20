//-----------------------------------------------
// Scripts
//-----------------------------------------------

/*
 * First called script: gets current URL
 */
function getURL() {
  browser.tabs.query({currentWindow: true, active: true}).then(goFocus, onError);
}


/*
 * Updates current URL if proxy available
 */

function goFocus(tabs) {
    let tab = tabs[0]; // Safe to assume there will only be one result
    let url = tab.url;
    console.log(url);
    var n
    // 1 - APS journals
    n = url.indexOf("journals.aps.org/");
    if (n > -1) {
      console.log("This is APS");
      let newURL = url.replace("journals.aps.org/", "journals-aps-org.proxy.scd.u-psud.fr/");
      browser.tabs.update({'url': newURL});
      return 1;
    }
    // 2 - Nature
    n = url.indexOf("www.nature.com/");
    if (n > -1) {
      console.log("This is Nature");
      let newURL = url.replace("www.nature.com/", "www-nature-com.proxy.scd.u-psud.fr/");
      browser.tabs.update({'url': newURL});
      return 1;
    }

    return 0;
}

/*
 * Error logging
 */

function onError(err){
    console.error(err);
}

//-----------------------------------------------
// Listeners
//-----------------------------------------------

// Run from button
browser.browserAction.onClicked.addListener(getURL);

// From shortcut
/**
 * Returns all of the registered extension commands for this extension
 * and their shortcut (if active).
 *
 * Since there is only one registered command in this sample extension,
 * the returned `commandsArray` will look like the following:
 *    [{
 *       name: "toggle-feature",
 *       description: "Send a 'toggle-feature' event to the extension"
 *       shortcut: "Ctrl+Shift+U"
 *    }]
 */
let gettingAllCommands = browser.commands.getAll();
gettingAllCommands.then((commands) => {
  for (let command of commands) {
    // Note that this logs to the Add-on Debugger's console: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Debugging
    // not the regular Web console.
    console.log(command);
  }
});

/**
 * Fired when a registered command is activated using a keyboard shortcut.
 *
 * In this sample extension, there is only one registered command: "Ctrl+Shift+U".
 * On Mac, this command will automatically be converted to "Command+Shift+U".
 */
browser.commands.onCommand.addListener(getURL);
