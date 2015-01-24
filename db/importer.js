/*
Copyright 2015 Adrian Baran, Joe MacMahon, Leonardo Rossi

This file is part of Rico.

Rico is free software: you can redistribute it and/or modify it under the terms
of the GNU Affero General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

Rico is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
details.

You should have received a copy of the GNU Affero General Public License along
with Rico.  If not, see <http://www.gnu.org/licenses/>.
*/

var fs = require('fs'),
    stdio = require('stdio'),
    exec = require('child_process').exec,
    xml2js = require('xml2js'),

    PENTABARF_XML_URL = "https://fosdem.org/2015/schedule/xml",
    XCAL_URL = "https://fosdem.org/2015/schedule/xcal",
    DATA_FILE = "data/data.xml",
    XCAL_DATA_FILE = "data/xcal_data.xml",

    xcal_data = {},
    import_data = [];

var ops = stdio.getopt({
    'update': {key: 'u', description: 'Fetch the newest Pentabarf XML.'},
    'quiete': {key: 'q', description: 'Do things quietly.'}
});

if (ops.help) {
  ops.printHelp();
} else if (ops.update) {
  console.log('Fetching the newest Pentabarf XML...');
  var child = exec('wget ' + PENTABARF_XML_URL + " -O " + DATA_FILE, function (error, stdout, stderr) {
    if (!ops.quiete) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    }
  });
  console.log('Fetching the newest XCAL XML...');
  var child2 = exec('wget ' + XCAL_URL + " -O " + XCAL_DATA_FILE, function (error, stdout, stderr) {
    if (!ops.quiete) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    }
  });
} else {
  //-------------------
  console.log('Importing data from ' + XCAL_DATA_FILE + "...");
  var parser = new xml2js.Parser();
  fs.readFile(__dirname + '/' + XCAL_DATA_FILE, {encoding: 'utf8'}, function (err, data) {
    if (err !== null) {
      console.log(error);
    }
    parser.parseString(data, function (err, result) {
      try {
        var vcal = result['iCalendar']['vcalendar'][0];
        var events = vcal['vevent'];
        events.map(function (event) {
          xcal_data[event['pentabarf:event-id'][0]] = event['url'][0];
        });
        console.log('Done', Object.keys(xcal_data).length ,'entries');
        step_two();
      } catch (err) {
        console.log(err);
      }
    });
  });
  //-------------------
  function step_two() {
    console.log('Importing data from ' + DATA_FILE + "...");
    fs.readFile(__dirname + '/' + DATA_FILE, {encoding: 'utf8'}, function (err, data) {
        if (err !== null) {
          console.log(error);
        }
        parser.parseString(data, function (err, result) {
          try {
            var days = result['schedule']['day'];
            days.map(function (day){
              var rooms = day['room'];
              rooms = rooms.filter(function (item) {return item['event'] !== undefined});
              rooms.map(function (room) {
                var events = room['event'];
                events.map(function (e) {
                  var start_time = new Date(2015, 0, 31, e.start[0].split(':')[0]);
                  var end_time = new Date(start_time.getTime() + 3600000*e.duration[0].split(':')[0] + 60000*e.duration[0].split(':')[1]);
                  import_data.push({
                    'title': e.title[0],
                    'subtitle': e.subtitle[0].replace("\u2028", ""),
                    'speakers': e.persons.map(function (p) {
                      if (p['person'] && p['person'].length > 0)
                        return p['person'][0]['_'];
                      else
                        return ''
                    }),
                    'description': e.description[0].replace(/<.?p>/g, ''),
                    'start_time': start_time,
                    'end_time': end_time,
                    'track': e.track[0],
                    'location': e.room[0],
                    'links': e.links.map(function (l) {
                      if (l.length > 0)
                        return l[0].trim();
                      else
                        return ''
                    }),
                    'url': xcal_data[e['$']['id']]
                  });
                });
              });
            });
            save();
            console.log('Done:', import_data.length, "entries");
          } catch (err) {
            console.log(import_data.length);
            console.log(err);
          }
        });
      });
  }

}

function save() {
  fs.writeFile('data/TestData.js', JSON.stringify(import_data), function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
}
