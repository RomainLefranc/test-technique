import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import frLocale from '@fullcalendar/core/locales/fr';
const $ = require('jquery');
const axios = require('axios').default;

import './styles/calendar.css';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getUTCMonth() + 1),
        day = '' + d.getUTCDate(),
        year = d.getUTCFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}



function afficherErreur(erreur) {
  let template = `
    <div class="alert alert-${erreur.type} " role="alert">
      <strong>Erreur : </strong> ${erreur.message}
    </div>
    `
  
  $('#erreur').append(template);
}





document.addEventListener('DOMContentLoaded', function() {
  var create_data = '';
  var delete_id = '';
  var calendarEl = document.getElementById('calendar');
  var calendar = new Calendar(calendarEl, {
    timeZone: 'locale',
    locales: [frLocale],
    locale: 'fr',
    allDaySlot: false,
    plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ],
    selectable: true,
    
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    navLinks: true, 
    dayMaxEvents: true, 
    events: function(info, callback) {
      axios.post('/api/attribution', {
        dateDebut : {
          date : formatDate(info.start),
          time : {
            hour : info.start.getUTCHours(),
            minute : info.start.getUTCMinutes()
          }
        },
        dateFin : {
          date : formatDate(info.end),
          time : {
            hour : info.end.getUTCHours(),
            minute : info.end.getUTCMinutes()
          }
        }
      })
      .then(function (response) {
        var events = [];
        $.map(response.data, function( event ) {
            events.push({
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end
            });
        });
        callback(events);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    select: function(info) {
      var dateDebut = formatDate(info.start);
      var dateFin = formatDate(info.end)

      $('#attribution_dateDebut_date').val(dateDebut);
      $('#attribution_dateDebut_time_hour').val(info.start.getUTCHours())
      $('#attribution_dateDebut_time_minute').val(info.start.getUTCMinutes())

      $('#attribution_dateFin_date').val(dateFin);
      $('#attribution_dateFin_time_hour').val(info.end.getUTCHours())
      $('#attribution_dateFin_time_minute').val(info.end.getUTCMinutes())
      
      $('#erreur').html('');
      $('#modal_create').modal('show');

      create_data = {
        user :  "",
        ordinateur : "",
        dateDebut : {
          date : dateDebut,
          time : {
            hour : info.start.getUTCHours(),
            minute : info.start.getUTCMinutes()
          }
        },
        dateFin : {
          date : dateFin,
          time : {
            hour : info.end.getUTCHours(),
            minute : info.end.getUTCMinutes()
          }
        }
      }

    },
    eventClick: function(info) {
      
      delete_id = info.event._def.publicId;
      /* Ajout des infos dans la modal */
      $('#title').html(info.event.title)
      /* affichage de la modal */
      $('#modal_delete').modal('show')
    }
  });
  calendar.render();

  $("#form_create").on('submit', function (e) {
    create_data.user = parseInt($('#attribution_user').val())
    create_data.ordinateur = parseInt($('#attribution_ordinateur').val())
    e.preventDefault();
    
    axios.post('/api/attribution/create', create_data)
    .then(function () {
      calendar.refetchEvents()
      $('#modal_create').modal('hide')
    })
    .catch(function (error) {
      afficherErreur(error.response.data)
    });
  });

  $("#form_delete").on('submit', function (e) {
    e.preventDefault();
    axios.delete(`/api/attribution/${delete_id}/delete`)
    .then(function () {
      calendar.refetchEvents()
      $('#modal_delete').modal('hide')
    })
    .catch(function (error) {
      console.log(error);
    });
  });

});




