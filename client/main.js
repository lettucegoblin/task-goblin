import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App.svelte';

// Import Material Web Components
import '@material/web/all.js'; // If there's a bundle that includes everything.

Meteor.startup(() => {
  new App({
    target: document.getElementById('app')
  });
});
