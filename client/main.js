import { Meteor } from 'meteor/meteor';
import 'materialize-css/dist/css/materialize.min.css';
import { onMount } from 'svelte';
import App from '../imports/ui/App.svelte';

Meteor.startup(() => {
  new App({
    target: document.getElementById('app')
  });
});
