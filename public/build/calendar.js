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
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_2__);
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
      month = '' + (d.getUTCMonth() + 1),
      day = '' + d.getUTCDate(),
      year = d.getUTCFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

function afficherErreur(erreur) {
  var template = "\n    <div class=\"alert alert-".concat(erreur.type, " \" role=\"alert\">\n      <strong>Erreur : </strong> ").concat(erreur.message, "\n    </div>\n    ");
  $('#erreur').append(template);
}

document.addEventListener('DOMContentLoaded', function () {
  var create_data = '';
  var delete_id = '';
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
        dateDebut: {
          date: formatDate(info.start),
          time: {
            hour: info.start.getUTCHours(),
            minute: info.start.getUTCMinutes()
          }
        },
        dateFin: {
          date: formatDate(info.end),
          time: {
            hour: info.end.getUTCHours(),
            minute: info.end.getUTCMinutes()
          }
        }
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
      $('#attribution_dateDebut_time_hour').val(info.start.getUTCHours());
      $('#attribution_dateDebut_time_minute').val(info.start.getUTCMinutes());
      $('#attribution_dateFin_date').val(dateFin);
      $('#attribution_dateFin_time_hour').val(info.end.getUTCHours());
      $('#attribution_dateFin_time_minute').val(info.end.getUTCMinutes());
      $('#erreur').html('');
      $('#modal_create').modal('show');
      create_data = {
        user: "",
        ordinateur: "",
        dateDebut: {
          date: dateDebut,
          time: {
            hour: info.start.getUTCHours(),
            minute: info.start.getUTCMinutes()
          }
        },
        dateFin: {
          date: dateFin,
          time: {
            hour: info.end.getUTCHours(),
            minute: info.end.getUTCMinutes()
          }
        }
      };
    },
    eventClick: function eventClick(info) {
      delete_id = info.event._def.publicId;
      /* Ajout des infos dans la modal */

      $('#title').html(info.event.title);
      /* affichage de la modal */

      $('#modal_delete').modal('show');
    }
  });
  calendar.render();
  $("#form_create").on('submit', function (e) {
    create_data.user = parseInt($('#attribution_user').val());
    create_data.ordinateur = parseInt($('#attribution_ordinateur').val());
    e.preventDefault();
    axios.post('/api/attribution/create', create_data).then(function () {
      calendar.refetchEvents();
      $('#modal_create').modal('hide');
    })["catch"](function (error) {
      afficherErreur(error.response.data);
    });
  });
  $("#form_delete").on('submit', function (e) {
    e.preventDefault();
    axios["delete"]("/api/attribution/".concat(delete_id, "/delete")).then(function () {
      calendar.refetchEvents();
      $('#modal_delete').modal('hide');
    })["catch"](function (error) {
      console.log(error);
    });
  });
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_array-iteration_js-node_modules_core-js_internals_expo-068ae3","vendors-node_modules_fullcalendar_core_locales_fr_js-node_modules_fullcalendar_core_main_js-n-6c0e48"], () => (__webpack_exec__("./assets/calendar.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlcy9jYWxlbmRhci5jc3M/NjAzNSJdLCJuYW1lcyI6WyIkIiwicmVxdWlyZSIsImF4aW9zIiwiZm9ybWF0RGF0ZSIsImRhdGUiLCJkIiwiRGF0ZSIsIm1vbnRoIiwiZ2V0VVRDTW9udGgiLCJkYXkiLCJnZXRVVENEYXRlIiwieWVhciIsImdldFVUQ0Z1bGxZZWFyIiwibGVuZ3RoIiwiam9pbiIsImFmZmljaGVyRXJyZXVyIiwiZXJyZXVyIiwidGVtcGxhdGUiLCJ0eXBlIiwibWVzc2FnZSIsImFwcGVuZCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNyZWF0ZV9kYXRhIiwiZGVsZXRlX2lkIiwiY2FsZW5kYXJFbCIsImdldEVsZW1lbnRCeUlkIiwiY2FsZW5kYXIiLCJDYWxlbmRhciIsInRpbWVab25lIiwibG9jYWxlcyIsImZyTG9jYWxlIiwibG9jYWxlIiwiYWxsRGF5U2xvdCIsInBsdWdpbnMiLCJpbnRlcmFjdGlvblBsdWdpbiIsImRheUdyaWRQbHVnaW4iLCJ0aW1lR3JpZFBsdWdpbiIsImxpc3RQbHVnaW4iLCJzZWxlY3RhYmxlIiwiaGVhZGVyVG9vbGJhciIsImxlZnQiLCJjZW50ZXIiLCJyaWdodCIsImluaXRpYWxWaWV3IiwibmF2TGlua3MiLCJkYXlNYXhFdmVudHMiLCJldmVudHMiLCJpbmZvIiwiY2FsbGJhY2siLCJwb3N0IiwiZGF0ZURlYnV0Iiwic3RhcnQiLCJ0aW1lIiwiaG91ciIsImdldFVUQ0hvdXJzIiwibWludXRlIiwiZ2V0VVRDTWludXRlcyIsImRhdGVGaW4iLCJlbmQiLCJ0aGVuIiwicmVzcG9uc2UiLCJtYXAiLCJkYXRhIiwiZXZlbnQiLCJwdXNoIiwiaWQiLCJ0aXRsZSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInNlbGVjdCIsInZhbCIsImh0bWwiLCJtb2RhbCIsInVzZXIiLCJvcmRpbmF0ZXVyIiwiZXZlbnRDbGljayIsIl9kZWYiLCJwdWJsaWNJZCIsInJlbmRlciIsIm9uIiwiZSIsInBhcnNlSW50IiwicHJldmVudERlZmF1bHQiLCJyZWZldGNoRXZlbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0NBQzJEOztBQUMzRDs7QUFDQSxJQUFNQSxDQUFDLEdBQUdDLG1CQUFPLENBQUMsb0RBQUQsQ0FBakI7O0FBQ0EsSUFBTUMsS0FBSyxHQUFHRCx5RUFBZDs7QUFFQTs7QUFFQSxTQUFTRSxVQUFULENBQW9CQyxJQUFwQixFQUEwQjtBQUN0QixNQUFJQyxDQUFDLEdBQUcsSUFBSUMsSUFBSixDQUFTRixJQUFULENBQVI7QUFBQSxNQUNJRyxLQUFLLEdBQUcsTUFBTUYsQ0FBQyxDQUFDRyxXQUFGLEtBQWtCLENBQXhCLENBRFo7QUFBQSxNQUVJQyxHQUFHLEdBQUcsS0FBS0osQ0FBQyxDQUFDSyxVQUFGLEVBRmY7QUFBQSxNQUdJQyxJQUFJLEdBQUdOLENBQUMsQ0FBQ08sY0FBRixFQUhYO0FBS0EsTUFBSUwsS0FBSyxDQUFDTSxNQUFOLEdBQWUsQ0FBbkIsRUFDSU4sS0FBSyxHQUFHLE1BQU1BLEtBQWQ7QUFDSixNQUFJRSxHQUFHLENBQUNJLE1BQUosR0FBYSxDQUFqQixFQUNJSixHQUFHLEdBQUcsTUFBTUEsR0FBWjtBQUVKLFNBQU8sQ0FBQ0UsSUFBRCxFQUFPSixLQUFQLEVBQWNFLEdBQWQsRUFBbUJLLElBQW5CLENBQXdCLEdBQXhCLENBQVA7QUFDSDs7QUFJRCxTQUFTQyxjQUFULENBQXdCQyxNQUF4QixFQUFnQztBQUM5QixNQUFJQyxRQUFRLDRDQUNnQkQsTUFBTSxDQUFDRSxJQUR2QixtRUFFcUJGLE1BQU0sQ0FBQ0csT0FGNUIsdUJBQVo7QUFNQW5CLEdBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYW9CLE1BQWIsQ0FBb0JILFFBQXBCO0FBQ0Q7O0FBTURJLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVB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QUF5QixNQUF6QjtBQUNELEtBSkQsV0FLTyxVQUFVTixLQUFWLEVBQWlCO0FBQ3RCQyxhQUFPLENBQUNDLEdBQVIsQ0FBWUYsS0FBWjtBQUNELEtBUEQ7QUFRRCxHQVZEO0FBWUQsQ0E5SEQsRTs7Ozs7Ozs7Ozs7O0FDekNBIiwiZmlsZSI6ImNhbGVuZGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FsZW5kYXIgfSBmcm9tICdAZnVsbGNhbGVuZGFyL2NvcmUnO1xyXG5pbXBvcnQgZGF5R3JpZFBsdWdpbiBmcm9tICdAZnVsbGNhbGVuZGFyL2RheWdyaWQnO1xyXG5pbXBvcnQgdGltZUdyaWRQbHVnaW4gZnJvbSAnQGZ1bGxjYWxlbmRhci90aW1lZ3JpZCc7XHJcbmltcG9ydCBsaXN0UGx1Z2luIGZyb20gJ0BmdWxsY2FsZW5kYXIvbGlzdCc7XHJcbmltcG9ydCBpbnRlcmFjdGlvblBsdWdpbiBmcm9tICdAZnVsbGNhbGVuZGFyL2ludGVyYWN0aW9uJzsgLy8gZm9yIHNlbGVjdGFibGVcclxuaW1wb3J0IGZyTG9jYWxlIGZyb20gJ0BmdWxsY2FsZW5kYXIvY29yZS9sb2NhbGVzL2ZyJztcclxuY29uc3QgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xyXG5jb25zdCBheGlvcyA9IHJlcXVpcmUoJ2F4aW9zJykuZGVmYXVsdDtcclxuXHJcbmltcG9ydCAnLi9zdHlsZXMvY2FsZW5kYXIuY3NzJztcclxuXHJcbmZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSkge1xyXG4gICAgdmFyIGQgPSBuZXcgRGF0ZShkYXRlKSxcclxuICAgICAgICBtb250aCA9ICcnICsgKGQuZ2V0VVRDTW9udGgoKSArIDEpLFxyXG4gICAgICAgIGRheSA9ICcnICsgZC5nZXRVVENEYXRlKCksXHJcbiAgICAgICAgeWVhciA9IGQuZ2V0VVRDRnVsbFllYXIoKTtcclxuXHJcbiAgICBpZiAobW9udGgubGVuZ3RoIDwgMikgXHJcbiAgICAgICAgbW9udGggPSAnMCcgKyBtb250aDtcclxuICAgIGlmIChkYXkubGVuZ3RoIDwgMikgXHJcbiAgICAgICAgZGF5ID0gJzAnICsgZGF5O1xyXG5cclxuICAgIHJldHVybiBbeWVhciwgbW9udGgsIGRheV0uam9pbignLScpO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGFmZmljaGVyRXJyZXVyKGVycmV1cikge1xyXG4gIGxldCB0ZW1wbGF0ZSA9IGBcclxuICAgIDxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC0ke2VycmV1ci50eXBlfSBcIiByb2xlPVwiYWxlcnRcIj5cclxuICAgICAgPHN0cm9uZz5FcnJldXIgOiA8L3N0cm9uZz4gJHtlcnJldXIubWVzc2FnZX1cclxuICAgIDwvZGl2PlxyXG4gICAgYFxyXG4gIFxyXG4gICQoJyNlcnJldXInKS5hcHBlbmQodGVtcGxhdGUpO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gIHZhciBjcmVhdGVfZGF0YSA9ICcnO1xyXG4gIHZhciBkZWxldGVfaWQgPSAnJztcclxuICB2YXIgY2FsZW5kYXJFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxlbmRhcicpO1xyXG4gIHZhciBjYWxlbmRhciA9IG5ldyBDYWxlbmRhcihjYWxlbmRhckVsLCB7XHJcbiAgICB0aW1lWm9uZTogJ2xvY2FsZScsXHJcbiAgICBsb2NhbGVzOiBbZnJMb2NhbGVdLFxyXG4gICAgbG9jYWxlOiAnZnInLFxyXG4gICAgYWxsRGF5U2xvdDogZmFsc2UsXHJcbiAgICBwbHVnaW5zOiBbIGludGVyYWN0aW9uUGx1Z2luLCBkYXlHcmlkUGx1Z2luLCB0aW1lR3JpZFBsdWdpbiwgbGlzdFBsdWdpbiBdLFxyXG4gICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgIFxyXG4gICAgaGVhZGVyVG9vbGJhcjoge1xyXG4gICAgICBsZWZ0OiAncHJldixuZXh0IHRvZGF5JyxcclxuICAgICAgY2VudGVyOiAndGl0bGUnLFxyXG4gICAgICByaWdodDogJ2RheUdyaWRNb250aCx0aW1lR3JpZFdlZWssdGltZUdyaWREYXksbGlzdFdlZWsnXHJcbiAgICB9LFxyXG4gICAgaW5pdGlhbFZpZXc6ICd0aW1lR3JpZFdlZWsnLFxyXG4gICAgbmF2TGlua3M6IHRydWUsIFxyXG4gICAgZGF5TWF4RXZlbnRzOiB0cnVlLCBcclxuICAgIGV2ZW50czogZnVuY3Rpb24oaW5mbywgY2FsbGJhY2spIHtcclxuICAgICAgYXhpb3MucG9zdCgnL2FwaS9hdHRyaWJ1dGlvbicsIHtcclxuICAgICAgICBkYXRlRGVidXQgOiB7XHJcbiAgICAgICAgICBkYXRlIDogZm9ybWF0RGF0ZShpbmZvLnN0YXJ0KSxcclxuICAgICAgICAgIHRpbWUgOiB7XHJcbiAgICAgICAgICAgIGhvdXIgOiBpbmZvLnN0YXJ0LmdldFVUQ0hvdXJzKCksXHJcbiAgICAgICAgICAgIG1pbnV0ZSA6IGluZm8uc3RhcnQuZ2V0VVRDTWludXRlcygpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRlRmluIDoge1xyXG4gICAgICAgICAgZGF0ZSA6IGZvcm1hdERhdGUoaW5mby5lbmQpLFxyXG4gICAgICAgICAgdGltZSA6IHtcclxuICAgICAgICAgICAgaG91ciA6IGluZm8uZW5kLmdldFVUQ0hvdXJzKCksXHJcbiAgICAgICAgICAgIG1pbnV0ZSA6IGluZm8uZW5kLmdldFVUQ01pbnV0ZXMoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgdmFyIGV2ZW50cyA9IFtdO1xyXG4gICAgICAgICQubWFwKHJlc3BvbnNlLmRhdGEsIGZ1bmN0aW9uKCBldmVudCApIHtcclxuICAgICAgICAgICAgZXZlbnRzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaWQ6IGV2ZW50LmlkLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGV2ZW50LnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgc3RhcnQ6IGV2ZW50LnN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgZW5kOiBldmVudC5lbmRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2FsbGJhY2soZXZlbnRzKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2VsZWN0OiBmdW5jdGlvbihpbmZvKSB7XHJcbiAgICAgIHZhciBkYXRlRGVidXQgPSBmb3JtYXREYXRlKGluZm8uc3RhcnQpO1xyXG4gICAgICB2YXIgZGF0ZUZpbiA9IGZvcm1hdERhdGUoaW5mby5lbmQpXHJcblxyXG4gICAgICAkKCcjYXR0cmlidXRpb25fZGF0ZURlYnV0X2RhdGUnKS52YWwoZGF0ZURlYnV0KTtcclxuICAgICAgJCgnI2F0dHJpYnV0aW9uX2RhdGVEZWJ1dF90aW1lX2hvdXInKS52YWwoaW5mby5zdGFydC5nZXRVVENIb3VycygpKVxyXG4gICAgICAkKCcjYXR0cmlidXRpb25fZGF0ZURlYnV0X3RpbWVfbWludXRlJykudmFsKGluZm8uc3RhcnQuZ2V0VVRDTWludXRlcygpKVxyXG5cclxuICAgICAgJCgnI2F0dHJpYnV0aW9uX2RhdGVGaW5fZGF0ZScpLnZhbChkYXRlRmluKTtcclxuICAgICAgJCgnI2F0dHJpYnV0aW9uX2RhdGVGaW5fdGltZV9ob3VyJykudmFsKGluZm8uZW5kLmdldFVUQ0hvdXJzKCkpXHJcbiAgICAgICQoJyNhdHRyaWJ1dGlvbl9kYXRlRmluX3RpbWVfbWludXRlJykudmFsKGluZm8uZW5kLmdldFVUQ01pbnV0ZXMoKSlcclxuICAgICAgXHJcbiAgICAgICQoJyNlcnJldXInKS5odG1sKCcnKTtcclxuICAgICAgJCgnI21vZGFsX2NyZWF0ZScpLm1vZGFsKCdzaG93Jyk7XHJcblxyXG4gICAgICBjcmVhdGVfZGF0YSA9IHtcclxuICAgICAgICB1c2VyIDogIFwiXCIsXHJcbiAgICAgICAgb3JkaW5hdGV1ciA6IFwiXCIsXHJcbiAgICAgICAgZGF0ZURlYnV0IDoge1xyXG4gICAgICAgICAgZGF0ZSA6IGRhdGVEZWJ1dCxcclxuICAgICAgICAgIHRpbWUgOiB7XHJcbiAgICAgICAgICAgIGhvdXIgOiBpbmZvLnN0YXJ0LmdldFVUQ0hvdXJzKCksXHJcbiAgICAgICAgICAgIG1pbnV0ZSA6IGluZm8uc3RhcnQuZ2V0VVRDTWludXRlcygpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRlRmluIDoge1xyXG4gICAgICAgICAgZGF0ZSA6IGRhdGVGaW4sXHJcbiAgICAgICAgICB0aW1lIDoge1xyXG4gICAgICAgICAgICBob3VyIDogaW5mby5lbmQuZ2V0VVRDSG91cnMoKSxcclxuICAgICAgICAgICAgbWludXRlIDogaW5mby5lbmQuZ2V0VVRDTWludXRlcygpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIGV2ZW50Q2xpY2s6IGZ1bmN0aW9uKGluZm8pIHtcclxuICAgICAgXHJcbiAgICAgIGRlbGV0ZV9pZCA9IGluZm8uZXZlbnQuX2RlZi5wdWJsaWNJZDtcclxuICAgICAgLyogQWpvdXQgZGVzIGluZm9zIGRhbnMgbGEgbW9kYWwgKi9cclxuICAgICAgJCgnI3RpdGxlJykuaHRtbChpbmZvLmV2ZW50LnRpdGxlKVxyXG4gICAgICAvKiBhZmZpY2hhZ2UgZGUgbGEgbW9kYWwgKi9cclxuICAgICAgJCgnI21vZGFsX2RlbGV0ZScpLm1vZGFsKCdzaG93JylcclxuICAgIH1cclxuICB9KTtcclxuICBjYWxlbmRhci5yZW5kZXIoKTtcclxuXHJcbiAgJChcIiNmb3JtX2NyZWF0ZVwiKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGNyZWF0ZV9kYXRhLnVzZXIgPSBwYXJzZUludCgkKCcjYXR0cmlidXRpb25fdXNlcicpLnZhbCgpKVxyXG4gICAgY3JlYXRlX2RhdGEub3JkaW5hdGV1ciA9IHBhcnNlSW50KCQoJyNhdHRyaWJ1dGlvbl9vcmRpbmF0ZXVyJykudmFsKCkpXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBcclxuICAgIGF4aW9zLnBvc3QoJy9hcGkvYXR0cmlidXRpb24vY3JlYXRlJywgY3JlYXRlX2RhdGEpXHJcbiAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNhbGVuZGFyLnJlZmV0Y2hFdmVudHMoKVxyXG4gICAgICAkKCcjbW9kYWxfY3JlYXRlJykubW9kYWwoJ2hpZGUnKVxyXG4gICAgfSlcclxuICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgYWZmaWNoZXJFcnJldXIoZXJyb3IucmVzcG9uc2UuZGF0YSlcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICAkKFwiI2Zvcm1fZGVsZXRlXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgYXhpb3MuZGVsZXRlKGAvYXBpL2F0dHJpYnV0aW9uLyR7ZGVsZXRlX2lkfS9kZWxldGVgKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICBjYWxlbmRhci5yZWZldGNoRXZlbnRzKClcclxuICAgICAgJCgnI21vZGFsX2RlbGV0ZScpLm1vZGFsKCdoaWRlJylcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwic291cmNlUm9vdCI6IiJ9