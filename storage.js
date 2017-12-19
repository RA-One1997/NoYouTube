var default_settings = {
  youtube: false,
  comments: true,
  recomended: true,
  guide: true,
  next: true
}

function onError(e) {
  console.error(e);
}

function checkSettings(ss) {
  if (!ss.settings) {
    browser.storage.local.set({settings: default_settings});
  }
}

const getSavedSettings = browser.storage.local.get();
getSavedSettings.then(checkSettings, onError);

console.log("STORAGE LOADED");