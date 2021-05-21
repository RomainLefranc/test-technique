(self["webpackChunk"] = self["webpackChunk"] || []).push([["calendar"],{

/***/ "./assets/calendar.js":
/*!****************************!*\
  !*** ./assets/calendar.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
/* harmony import */ var core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_date_to_iso_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.date.to-iso-string.js */ "./node_modules/core-js/modules/es.date.to-iso-string.js");
/* harmony import */ var core_js_modules_es_date_to_iso_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_iso_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fullcalendar_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fullcalendar/core */ "./node_modules/@fullcalendar/core/main.js");
/* harmony import */ var _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fullcalendar/daygrid */ "./node_modules/@fullcalendar/daygrid/main.js");
/* harmony import */ var _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fullcalendar/timegrid */ "./node_modules/@fullcalendar/timegrid/main.js");
/* harmony import */ var _fullcalendar_list__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fullcalendar/list */ "./node_modules/@fullcalendar/list/main.js");
/* harmony import */ var _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fullcalendar/interaction */ "./node_modules/@fullcalendar/interaction/main.js");
/* harmony import */ var _fullcalendar_core_locales_fr__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fullcalendar/core/locales/fr */ "./node_modules/@fullcalendar/core/locales/fr.js");
/* harmony import */ var _styles_calendar_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./styles/calendar.css */ "./assets/styles/calendar.css");









 // for selectable



var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js").default;



function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');
  var calendar = new _fullcalendar_core__WEBPACK_IMPORTED_MODULE_5__.Calendar(calendarEl, {
    timeZone: 'locale',
    locales: [_fullcalendar_core_locales_fr__WEBPACK_IMPORTED_MODULE_10__.default],
    locale: 'fr',
    allDaySlot: false,
    plugins: [_fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_9__.default, _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_6__.default, _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_7__.default, _fullcalendar_list__WEBPACK_IMPORTED_MODULE_8__.default],
    selectable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    navLinks: true,
    dayMaxEvents: true,
    events: function events(info, callback) {
      axios.post('/api/attribution', {
        start: info.start.toISOString(),
        end: info.end.toISOString()
      }).then(function (response) {
        var events = [];
        $.map(response.data, function (event) {
          events.push({
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end
          });
        });
        callback(events);
      })["catch"](function (error) {
        console.log(error);
      });
    },
    select: function select(info) {
      var dateDebut = formatDate(info.start);
      var dateFin = formatDate(info.end);
      $('#attribution_dateDebut_date').val(dateDebut);
      $('#attribution_dateDebut_time_hour').val(info.start.getHours());
      $('#attribution_dateDebut_time_minute').val(info.start.getMinutes());
      $('#attribution_dateFin_date').val(dateFin);
      $('#attribution_dateFin_time_hour').val(info.end.getHours());
      $('#attribution_dateFin_time_minute').val(info.end.getMinutes());
      $('#create').modal('show');
      $(":submit").on('click', function (e) {
        e.preventDefault();
        axios.post('/api/attribution/create', {
          user: {
            id: parseInt($('#attribution_user').val())
          },
          ordinateur: {
            id: parseInt($('#attribution_ordinateur').val())
          },
          dateDebut: info.start.toISOString(),
          dateFin: info.end.toISOString()
        }).then(function (response) {
          calendar.refetchEvents();
          $('#create').modal('hide');
          $(":submit").off();
        })["catch"](function (error) {
          console.log(error);
        });
      });
    },
    eventClick: function eventClick(info) {
      /* Récuperation des infos de l'event */
      var idEvent = info.event._def.publicId;
      var title = info.event.title;
      var dateDebut = new Date(info.event._instance.range.start.toISOString());
      var dateFin = new Date(info.event._instance.range.end.toISOString());
      var infoDebut = "Début : " + dateDebut.toLocaleDateString();
      var infoFin = "Fin : " + dateFin.toLocaleDateString();
      /* Ajout des infos dans la modal */

      $('#title').html(title);
      $('#dateDebut').html(infoDebut);
      $('#dateFin').html(infoFin);
      /* affichage de la modal */

      $('#read').modal('show');
      /* evenement qui supprime l'évenement de la base de données */

      $(":submit").on('click', function (e) {
        e.preventDefault();
        axios["delete"]("/api/attribution/".concat(idEvent, "/delete")).then(function (response) {
          calendar.refetchEvents();
          $('#read').modal('hide');
          $(":submit").off();
        })["catch"](function (error) {
          console.log(error);
        });
      });
    }
  });
  calendar.render();
});

/***/ }),

/***/ "./assets/styles/calendar.css":
/*!************************************!*\
  !*** ./assets/styles/calendar.css ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_expo-068ae3","vendors-node_modules_fullcalendar_core_locales_fr_js-node_modules_fullcalendar_core_main_js-n-993dff"], () => (__webpack_exec__("./assets/calendar.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlcy9jYWxlbmRhci5jc3M/NjAzNSJdLCJuYW1lcyI6WyIkIiwicmVxdWlyZSIsImF4aW9zIiwiZm9ybWF0RGF0ZSIsImRhdGUiLCJkIiwiRGF0ZSIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibGVuZ3RoIiwiam9pbiIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhbGVuZGFyRWwiLCJnZXRFbGVtZW50QnlJZCIsImNhbGVuZGFyIiwiQ2FsZW5kYXIiLCJ0aW1lWm9uZSIsImxvY2FsZXMiLCJmckxvY2FsZSIsImxvY2FsZSIsImFsbERheVNsb3QiLCJwbHVnaW5zIiwiaW50ZXJhY3Rpb25QbHVnaW4iLCJkYXlHcmlkUGx1Z2luIiwidGltZUdyaWRQbHVnaW4iLCJsaXN0UGx1Z2luIiwic2VsZWN0YWJsZSIsImhlYWRlclRvb2xiYXIiLCJsZWZ0IiwiY2VudGVyIiwicmlnaHQiLCJpbml0aWFsVmlldyIsIm5hdkxpbmtzIiwiZGF5TWF4RXZlbnRzIiwiZXZlbnRzIiwiaW5mbyIsImNhbGxiYWNrIiwicG9zdCIsInN0YXJ0IiwidG9JU09TdHJpbmciLCJlbmQiLCJ0aGVuIiwicmVzcG9uc2UiLCJtYXAiLCJkYXRhIiwiZXZlbnQiLCJwdXNoIiwiaWQiLCJ0aXRsZSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInNlbGVjdCIsImRhdGVEZWJ1dCIsImRhdGVGaW4iLCJ2YWwiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJtb2RhbCIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwidXNlciIsInBhcnNlSW50Iiwib3JkaW5hdGV1ciIsInJlZmV0Y2hFdmVudHMiLCJvZmYiLCJldmVudENsaWNrIiwiaWRFdmVudCIsIl9kZWYiLCJwdWJsaWNJZCIsIl9pbnN0YW5jZSIsInJhbmdlIiwi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QUFDQSxVQUFJQyxPQUFPLEdBQUcsV0FBV3JCLE9BQU8sQ0FBQ29CLGtCQUFSLEVBQXpCO0FBRUE7O0FBQ0EvRSxPQUFDLENBQUMsUUFBRCxDQUFELENBQVlpRixJQUFaLENBQWlCNUIsS0FBakI7QUFDQXJELE9BQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0JpRixJQUFoQixDQUFxQkgsU0FBckI7QUFDQTlFLE9BQUMsQ0FBQyxVQUFELENBQUQsQ0FBY2lGLElBQWQsQ0FBbUJELE9BQW5CO0FBRUE7O0FBQ0FoRixPQUFDLENBQUMsT0FBRCxDQUFELENBQVcrRCxLQUFYLENBQWlCLE1BQWpCO0FBRUE7O0FBQ0EvRCxPQUFDLENBQUMsU0FBRCxDQUFELENBQWFnRSxFQUFiLENBQWdCLE9BQWhCLEVBQXlCLFVBQVVDLENBQVYsRUFBYTtBQUNwQ0EsU0FBQyxDQUFDQyxjQUFGO0FBQ0FoRSxhQUFLLFVBQUwsNEJBQWlDdUUsT0FBakMsY0FDQzNCLElBREQsQ0FDTSxVQUFVQyxRQUFWLEVBQW9CO0FBQ3hCNUIsa0JBQVEsQ0FBQ21ELGFBQVQ7QUFDQXRFLFdBQUMsQ0FBQyxPQUFELENBQUQsQ0FBVytELEtBQVgsQ0FBaUIsTUFBakI7QUFDQS9ELFdBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYXVFLEdBQWI7QUFDRCxTQUxELFdBTU8sVUFBVWpCLEtBQVYsRUFBaUI7QUFDdEJDLGlCQUFPLENBQUNDLEdBQVIsQ0FBWUYsS0FBWjtBQUNELFNBUkQ7QUFTRCxPQVhEO0FBWUQ7QUEzR3FDLEdBQXpCLENBQWY7QUE2R0FuQyxVQUFRLENBQUMrRCxNQUFUO0FBRUQsQ0FqSEQsRTs7Ozs7Ozs7Ozs7O0FDMUJBIiwiZmlsZSI6ImNhbGVuZGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsZW5kYXIgfSBmcm9tICdAZnVsbGNhbGVuZGFyL2NvcmUnO1xyXG5pbXBvcnQgZGF5R3JpZFBsdWdpbiBmcm9tICdAZnVsbGNhbGVuZGFyL2RheWdyaWQnO1xyXG5pbXBvcnQgdGltZUdyaWRQbHVnaW4gZnJvbSAnQGZ1bGxjYWxlbmRhci90aW1lZ3JpZCc7XHJcbmltcG9ydCBsaXN0UGx1Z2luIGZyb20gJ0BmdWxsY2FsZW5kYXIvbGlzdCc7XHJcbmltcG9ydCBpbnRlcmFjdGlvblBsdWdpbiBmcm9tICdAZnVsbGNhbGVuZGFyL2ludGVyYWN0aW9uJzsgLy8gZm9yIHNlbGVjdGFibGVcclxuaW1wb3J0IGZyTG9jYWxlIGZyb20gJ0BmdWxsY2FsZW5kYXIvY29yZS9sb2NhbGVzL2ZyJztcclxuY29uc3QgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5jb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJykuZGVmYXVsdDtcclxuXHJcbmltcG9ydCAnLi9zdHlsZXMvY2FsZW5kYXIuY3NzJztcclxuXHJcbmZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSkge1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZShkYXRlKSxcclxuICAgICAgICBtb250aCA9ICcnICsgKGQuZ2V0TW9udGgoKSArIDEpLFxyXG4gICAgICAgIGRheSA9ICcnICsgZC5nZXREYXRlKCksXHJcbiAgICAgICAgeWVhciA9IGQuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICBpZiAobW9udGgubGVuZ3RoIDwgMikgXHJcbiAgICAgICAgbW9udGggPSAnMCcgKyBtb250aDtcclxuICAgIGlmIChkYXkubGVuZ3RoIDwgMikgXHJcbiAgICAgICAgZGF5ID0gJzAnICsgZGF5O1xyXG5cclxuICAgIHJldHVybiBbeWVhciwgbW9udGgsIGRheV0uam9pbignLScpO1xyXG59XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gIHZhciBjYWxlbmRhckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGVuZGFyJyk7XHJcbiAgdmFyIGNhbGVuZGFyID0gbmV3IENhbGVuZGFyKGNhbGVuZGFyRWwsIHtcclxuICAgIHRpbWVab25lOiAnbG9jYWxlJyxcclxuICAgIGxvY2FsZXM6IFtmckxvY2FsZSBdLFxyXG4gICAgbG9jYWxlOiAnZnInLFxyXG4gICAgYWxsRGF5U2xvdDogZmFsc2UsXHJcbiAgICBwbHVnaW5zOiBbIGludGVyYWN0aW9uUGx1Z2luLCBkYXlHcmlkUGx1Z2luLCB0aW1lR3JpZFBsdWdpbiwgbGlzdFBsdWdpbiBdLFxyXG4gICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgIFxyXG4gICAgaGVhZGVyVG9vbGJhcjoge1xyXG4gICAgICBsZWZ0OiAncHJldixuZXh0IHRvZGF5JyxcclxuICAgICAgY2VudGVyOiAndGl0bGUnLFxyXG4gICAgICByaWdodDogJ2RheUdyaWRNb250aCx0aW1lR3JpZFdlZWssdGltZUdyaWREYXksbGlzdFdlZWsnXHJcbiAgICB9LFxyXG4gICAgaW5pdGlhbFZpZXc6ICd0aW1lR3JpZFdlZWsnLFxyXG4gICAgbmF2TGlua3M6IHRydWUsIFxyXG4gICAgZGF5TWF4RXZlbnRzOiB0cnVlLCBcclxuICAgIGV2ZW50czogZnVuY3Rpb24oaW5mbywgY2FsbGJhY2spIHtcclxuICAgICAgYXhpb3MucG9zdCgnL2FwaS9hdHRyaWJ1dGlvbicsIHtcclxuICAgICAgICBzdGFydDogaW5mby5zdGFydC50b0lTT1N0cmluZygpLFxyXG4gICAgICAgIGVuZDogaW5mby5lbmQudG9JU09TdHJpbmcoKVxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICB2YXIgZXZlbnRzID0gW107XHJcbiAgICAgICAgJC5tYXAocmVzcG9uc2UuZGF0YSwgZnVuY3Rpb24oIGV2ZW50ICkge1xyXG4gICAgICAgICAgICBldmVudHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBpZDogZXZlbnQuaWQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogZXZlbnQudGl0bGUsXHJcbiAgICAgICAgICAgICAgICBzdGFydDogZXZlbnQuc3RhcnQsXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGV2ZW50LmVuZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjYWxsYmFjayhldmVudHMpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKGluZm8pIHtcclxuICAgICAgdmFyIGRhdGVEZWJ1dCA9IGZvcm1hdERhdGUoaW5mby5zdGFydCk7XHJcbiAgICAgIHZhciBkYXRlRmluID0gZm9ybWF0RGF0ZShpbmZvLmVuZClcclxuXHJcbiAgICAgICQoJyNhdHRyaWJ1dGlvbl9kYXRlRGVidXRfZGF0ZScpLnZhbChkYXRlRGVidXQpO1xyXG4gICAgICAkKCcjYXR0cmlidXRpb25fZGF0ZURlYnV0X3RpbWVfaG91cicpLnZhbChpbmZvLnN0YXJ0LmdldEhvdXJzKCkpXHJcbiAgICAgICQoJyNhdHRyaWJ1dGlvbl9kYXRlRGVidXRfdGltZV9taW51dGUnKS52YWwoaW5mby5zdGFydC5nZXRNaW51dGVzKCkpXHJcblxyXG4gICAgICAkKCcjYXR0cmlidXRpb25fZGF0ZUZpbl9kYXRlJykudmFsKGRhdGVGaW4pO1xyXG4gICAgICAkKCcjYXR0cmlidXRpb25fZGF0ZUZpbl90aW1lX2hvdXInKS52YWwoaW5mby5lbmQuZ2V0SG91cnMoKSlcclxuICAgICAgJCgnI2F0dHJpYnV0aW9uX2RhdGVGaW5fdGltZV9taW51dGUnKS52YWwoaW5mby5lbmQuZ2V0TWludXRlcygpKVxyXG5cclxuXHJcbiAgICAgICQoJyNjcmVhdGUnKS5tb2RhbCgnc2hvdycpXHJcblxyXG4gICAgICAkKFwiOnN1Ym1pdFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgYXhpb3MucG9zdCgnL2FwaS9hdHRyaWJ1dGlvbi9jcmVhdGUnLCB7XHJcbiAgICAgICAgICB1c2VyIDogIHtcclxuICAgICAgICAgICAgICBpZCA6IHBhcnNlSW50KCQoJyNhdHRyaWJ1dGlvbl91c2VyJykudmFsKCkpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgb3JkaW5hdGV1ciA6IHtcclxuICAgICAgICAgICAgICBpZCA6IHBhcnNlSW50KCQoJyNhdHRyaWJ1dGlvbl9vcmRpbmF0ZXVyJykudmFsKCkpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZGF0ZURlYnV0IDogaW5mby5zdGFydC50b0lTT1N0cmluZygpLFxyXG4gICAgICAgICAgZGF0ZUZpbiA6IGluZm8uZW5kLnRvSVNPU3RyaW5nKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgY2FsZW5kYXIucmVmZXRjaEV2ZW50cygpXHJcbiAgICAgICAgICAkKCcjY3JlYXRlJykubW9kYWwoJ2hpZGUnKVxyXG4gICAgICAgICAgJChcIjpzdWJtaXRcIikub2ZmKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGV2ZW50Q2xpY2s6IGZ1bmN0aW9uKGluZm8pIHtcclxuXHJcbiAgICAgIC8qIFLDqWN1cGVyYXRpb24gZGVzIGluZm9zIGRlIGwnZXZlbnQgKi9cclxuICAgICAgbGV0IGlkRXZlbnQgPSBpbmZvLmV2ZW50Ll9kZWYucHVibGljSWRcclxuICAgICAgbGV0IHRpdGxlID0gaW5mby5ldmVudC50aXRsZVxyXG5cclxuICAgICAgbGV0IGRhdGVEZWJ1dCA9IG5ldyBEYXRlKGluZm8uZXZlbnQuX2luc3RhbmNlLnJhbmdlLnN0YXJ0LnRvSVNPU3RyaW5nKCkpXHJcbiAgICAgIGxldCBkYXRlRmluID0gbmV3IERhdGUoaW5mby5ldmVudC5faW5zdGFuY2UucmFuZ2UuZW5kLnRvSVNPU3RyaW5nKCkpXHJcbiAgICAgIGxldCBpbmZvRGVidXQgPSBcIkTDqWJ1dCA6IFwiICsgZGF0ZURlYnV0LnRvTG9jYWxlRGF0ZVN0cmluZygpXHJcbiAgICAgIGxldCBpbmZvRmluID0gXCJGaW4gOiBcIiArIGRhdGVGaW4udG9Mb2NhbGVEYXRlU3RyaW5nKClcclxuXHJcbiAgICAgIC8qIEFqb3V0IGRlcyBpbmZvcyBkYW5zIGxhIG1vZGFsICovXHJcbiAgICAgICQoJyN0aXRsZScpLmh0bWwodGl0bGUpXHJcbiAgICAgICQoJyNkYXRlRGVidXQnKS5odG1sKGluZm9EZWJ1dClcclxuICAgICAgJCgnI2RhdGVGaW4nKS5odG1sKGluZm9GaW4pXHJcblxyXG4gICAgICAvKiBhZmZpY2hhZ2UgZGUgbGEgbW9kYWwgKi9cclxuICAgICAgJCgnI3JlYWQnKS5tb2RhbCgnc2hvdycpXHJcblxyXG4gICAgICAvKiBldmVuZW1lbnQgcXVpIHN1cHByaW1lIGwnw6l2ZW5lbWVudCBkZSBsYSBiYXNlIGRlIGRvbm7DqWVzICovXHJcbiAgICAgICQoXCI6c3VibWl0XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGF4aW9zLmRlbGV0ZShgL2FwaS9hdHRyaWJ1dGlvbi8ke2lkRXZlbnR9L2RlbGV0ZWApXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICBjYWxlbmRhci5yZWZldGNoRXZlbnRzKClcclxuICAgICAgICAgICQoJyNyZWFkJykubW9kYWwoJ2hpZGUnKVxyXG4gICAgICAgICAgJChcIjpzdWJtaXRcIikub2ZmKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGNhbGVuZGFyLnJlbmRlcigpO1xyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwic291cmNlUm9vdCI6IiJ9