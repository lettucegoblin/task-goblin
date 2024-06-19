import { Meteor } from 'meteor/meteor';
import { onMount } from 'svelte';
import App from '../imports/ui/App.svelte';

Meteor.startup(() => {
  new App({
    target: document.getElementById('app')
  });
});
