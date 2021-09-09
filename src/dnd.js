import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#classSubmit').click(function() {
    const classSelection = $('#class-selection').text();
    $('#class-selection').text("");
    console.log(classSelection);

    let request = new XMLHttpRequest();
    const url = `https://www.dnd5eapi.co/api/classes/${classSelection}`;

    request.onreadystatechange = function() {
      // if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      // }
    }

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showDndClass').append(`Info for ${classSelection}`);
      // $('.showDndClass').text(`<li>Name: ${response.name}</li>`);
      // $('.showDndClass').text(`<li>Hit Die: ${response.hit_die}</li>`);

      // $('.showDndClass').text(`${response.main.temp} degrees.`);
      // $('.showDndClass').text(`${response.main.temp} degrees.`);
    }
  });
});