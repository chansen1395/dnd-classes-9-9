import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function () {
  $('#classSubmit').click(function () {
    $('.showSkills, .showProfs, .showDndClass, .showSpells').empty();
    const classSelection = $('#class-selection').val();
    $('#class-selection').val("");

    let request = new XMLHttpRequest();
    const url = `https://www.dnd5eapi.co/api/classes/${classSelection}`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    // Relay information to user
    function getElements(response) {
      $('.showDndClass').append(`<h3>Info for ${response.name} class</h3>`);
      $('.showDndClass').append(`<li>Hit Die: ${response.hit_die}</li><hr>`);
      $('.showDndClass').append(`<li>Starting Equipment example: ${response.starting_equipment_options[0].from[0].equipment.name}</li><hr>`);

      let skillCount = response.proficiency_choices[0].from.length;
      let skillSelect = 0;
      // console.log(i);
      // console.log(response.proficiency_choices[0].from[0].name);
      while (skillCount >= 1) {
        $('.showSkills').append(`<li>Skill ` + (skillSelect + 1) + `: ${response.proficiency_choices[0].from[skillSelect].name.replace("Skill:", "")}</li>`);
        skillCount--;
        skillSelect++;
      }

      let profCount = response.proficiencies.length;
      let profSelect = 0;
      while (profCount >= 1) {
        $('.showProfs').append(`<li>Proficiency ` + (profSelect + 1) + `: ${response.proficiencies[profSelect].name}</li>`);
        profCount--;
        profSelect++;
      }

      $('.showSpells').append(`<li>${response.spellcasting.info[0].desc}</li>`);
      $('.showSpells').append(`<li>${response.spellcasting.info[1].desc}</li>`);
      $('.showSpells').append(`<li>THIS CAN BE USED TO NEST API CALLS: ${response.spells}</li>`);
    }
  });

});