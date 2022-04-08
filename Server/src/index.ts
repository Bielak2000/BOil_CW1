import express from "express";
import { InputData, Action, Event, OutputData } from "./interfaces";
import cors from "cors";
import { setDefaultResultOrder } from "dns";
import { deepStrictEqual } from "assert";

var bodyParser = require("body-parser");
const app = express();
const port = 4000;

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.post("/", jsonParser, (req, res) => {
  const data = req.body as InputData[];
  const eventList: Event[] = [];

  var max = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].next > max) max = data[i].next;
  }

  const events: Event[] = [];
  for (let i = 0; i < max; i++) {
    const event: Event = {
      eventId: i + 1,
      earliest: 0,
      latest: 0,
      stock: 0,
    };
    events.push(event);
  }

  const actionsList = data.map(
    (row): Action => ({
      name: row.action,
      duration: row.duration,
      nextEventId: row.next,
      prevEventId: row.prev,
    })
  );

  //czas najwczesniejszy
  events.forEach((e, i, eventsArr) => {
    if (i === 0) return;
    var temp1: number = 0;
    actionsList.forEach((al) => {
      if (al.nextEventId === e.eventId) {
        if (events[al.prevEventId - 1].earliest + al.duration > temp1) {
          temp1 = events[al.prevEventId - 1].earliest + al.duration;
        }
      }
    });
    eventsArr[i].earliest = temp1;
  });
  
  //czas najpozniejszy
  let index = 0;
  for (let i = events.length - 1; i >= 0; i--) {
    if (i === events.length - 1 || i === 0) {
      events[i].latest = events[i].earliest;
    } else {
      let temp: Action = {
        name: "",
        duration: 1000000,
        nextEventId: 0,
        prevEventId: 0,
      };
      index = 0;
      actionsList.forEach((al) => {
        if (al.prevEventId === i + 1) {
          if (index === 0) {
            temp = al;
          } else {
            if (
              events[al.nextEventId - 1].latest - al.duration <
              events[temp.nextEventId - 1].latest - temp.duration
            ) {
              temp = al;
            }
          }
          index++;
        }
      });

      events[i].latest = events[temp.nextEventId - 1].latest - temp.duration;
    }
  }

  //zapas
  events.forEach((e) => (e.stock = e.latest - e.earliest));

  //sciezka krtyczyna
  const criticalActions: Action[] = [];
  const criticalEvents: Event[] = [];
  for (var i = 0; i < max; i++) {
    if (events[i].stock === 0) {
      criticalEvents.push(events[i]);
      for(var j=0; j<actionsList.length; j++){
        if((actionsList[j].prevEventId===events[i].eventId) && (events[actionsList[j].nextEventId-1].stock===0)){
          criticalActions.push(actionsList[j]);
          break;
        }
      }
    }
  }

  //wyslanie danych
  const output: OutputData = {
    events,
    actions: actionsList,
    criticalPathEvents: criticalEvents,
    criticalPathActions: criticalActions,
    maxTime: events[events.length - 1].latest,
  };
  res.send(output);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
