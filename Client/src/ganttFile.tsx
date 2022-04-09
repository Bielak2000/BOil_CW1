import { OutputData } from "./inputData";
import {Chart} from 'react-google-charts';
import React, {FunctionComponent, useState} from 'react';

export interface GanttData {
  task_id: string,
  task_name: string,
  critical: string,
  start_date: Date,
  end_date: null,
  duration: number
  percent_complete: number,
  dependencies: string | null
}

export interface GanttData2 {
  columns: {
    type: string;
    label: string;
  }[];
  arrayGant: GanttData[]
}

function daysToMilliseconds(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

//google.charts.load('current', {'packages':['gantt']});
//var data1 = new google.visualization.DataTable();

const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "Critical"},
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

const rows:any = [];
const arrayGant: GanttData[] = [];

export const dataGantt = (outputData: OutputData) => {

  //var data1 = new google.visualization.DataTable();

  // data1.addColumn('string', 'Task ID');
  // data1.addColumn('string', 'Task Name');
  // data1.addColumn('date', 'Start Date');
  // data1.addColumn('date', 'End Date');
  // data1.addColumn('number', 'Duration');
  // data1.addColumn('number', 'Percent Complete');
  // data1.addColumn('string', 'Dependencies');

  // const arrayGant: GanttData[] = [];
  
  outputData.actions.forEach((a)=>{
    const today = new Date();
    const dataStart = new Date();
    dataStart.setDate(today.getDate() + outputData.events[a.prevEventId].earliest);
    let percentComplete : number;
    if(a.prevEventId!=0)
      percentComplete = (outputData.events[a.prevEventId].earliest-outputData.events[a.prevEventId].stock) / outputData.events[a.prevEventId].earliest * 100;
    else
      percentComplete=100;

    let temp = '';
    var counter: number = 0;
    outputData.actions.forEach((a1)=>{
       if(a.prevEventId===a1.nextEventId){
         if(counter===0)
            temp += a1.prevEventId;
          else
            temp += ',' + a1.prevEventId;
          counter++;
      }
    })
    //console.log(temp);
    var dependencies;
    if(temp==='')
      dependencies = null;
    else
      dependencies = temp;
    console.log(dependencies);

    arrayGant.push({
      task_id: `${a.prevEventId}`,
      task_name: `${a.prevEventId}`,
      critical: "false",
      start_date: dataStart,
      end_date: null,
      duration: daysToMilliseconds(a.duration),
      percent_complete: percentComplete,
      dependencies
    })
  })

 // data1.addRows([arrayGant]);

  // var options = {
  //   height: 275
  // };

  // var s = document.getElementById("chart_div");
  // var chart;
  // if(s){
  //   chart = new google.visualization.Gantt(s);
  //   chart.draw(data1, options);
  // }
   return arrayGant;
};

//export const data = [columns, ...arrayGant];

const rows2 = [
  [
    "Research",
    "Find sources",
    new Date(2015, 0, 1),
    new Date(2015, 0, 5),
    null,
    100,
    null,
  ],
  [
    "Write",
    "Write paper",
    null,
    new Date(2015, 0, 9),
    daysToMilliseconds(3),
    25,
    "Research,Outline",
  ],
  [
    "Cite",
    "Create bibliography",
    null,
    new Date(2015, 0, 7),
    daysToMilliseconds(1),
    20,
    "Research",
  ],
  [
    "Complete",
    "Hand in paper",
    null,
    new Date(2015, 0, 10),
    daysToMilliseconds(1),
    0,
    "Cite,Write",
  ],
  [
    "Outline",
    "Outline paper",
    null,
    new Date(2015, 0, 6),
    daysToMilliseconds(1),
    100,
    "Research",
  ],
];

export function DrawChart({output} : {output : GanttData[]}) {
  console.log(output);
  const [newRows, setNewRows]= useState([[]])

  const newDASRFQA = output.map((x) => {
    return [x.task_id, x.task_name, x.critical, x.start_date, null, x.duration, x.percent_complete, x.dependencies]
      
    
  })
  //console.log(newDASRFQA)
  //  output.forEach((x) => {
  //     rows.push([x.task_id, x.task_name, x.critical, x.start_date, x.end_date, x.duration, x.percent_complete, x.dependencies]);
  //     //console.log(rows);
  //   })

    //console.log(rows)
  return (<Chart chartType="Gantt" width="100%" height="50%" data = {[columns, ...newDASRFQA]} />);
}

// google.charts.load("current", { packages: ["gantt"] });



// function daysToMilliseconds(days: number) {
//   return days * 24 * 60 * 60 * 1000;
// }

// export const drawChart = () => {

//   var data = new google.visualization.DataTable();
//   data.addColumn('string', 'Task ID');
//   data.addColumn('string', 'Task Name');
//   data.addColumn('date', 'Start Date');
//   data.addColumn('date', 'End Date');
//   data.addColumn('number', 'Duration');
//   data.addColumn('number', 'Percent Complete');
//   data.addColumn('string', 'Dependencies');

//   data.addRows([
//     ['Research', 'Find sources',
//      new Date(2015, 0, 1), new Date(2015, 0, 5), null,  100,  null],
//     ['Write', 'Write paper',
//      null, new Date(2015, 0, 9), daysToMilliseconds(3), 25, 'Research,Outline'],
//     ['Cite', 'Create bibliography',
//      null, new Date(2015, 0, 7), daysToMilliseconds(1), 20, 'Research'],
//     ['Complete', 'Hand in paper',
//      null, new Date(2015, 0, 10), daysToMilliseconds(1), 0, 'Cite,Write'],
//     ['Outline', 'Outline paper',
//      null, new Date(2015, 0, 6), daysToMilliseconds(1), 100, 'Research']
//   ]);

//   var options = {
//     height: 275
//   };



//   var s = document.getElementById("chart_div");
//   var chart;
//   if(s){
//     chart = new google.visualization.Gantt(s);
//     chart.draw(data, options);
//   }

// };


// export const GoogleCharts = (OutputData: OutputData) => {
//   var ga = Chart({
//     data = {[
//         ["Country", "Popularity"],
//         ["Germany", 200],
//         ["United States", 300],
//         ["Brazil", 400],
//         ["Canada", 500],
//         ["France", 600],
//         ["RU", 700],
//         ["Cambodia", 800],
//         ["Australia", 100],
//     ]}
//   }
//   return (
//     <Chart
//       width={"500px"}
//       height={"300px"}
//       chartType="GeoChart"
//       data={[
//         ["Country", "Popularity"],
//         ["Germany", 200],
//         ["United States", 300],
//         ["Brazil", 400],
//         ["Canada", 500],
//         ["France", 600],
//         ["RU", 700],
//         ["Cambodia", 800],
//         ["Australia", 100],
//       ]}
//       // Note: you will need to get a mapsApiKey for your project.
//       // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
//       mapsApiKey="YOUR_KEY_HERE"
//       rootProps={{ "data-testid": "1" }}
//     />
//   );
// };





