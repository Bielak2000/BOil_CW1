import { OutputData } from "./inputData";
import {Chart} from 'react-google-charts';

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

export const dataGantt = (outputData: OutputData) => {
  const arrayGant: GanttData[] = [];
  
  outputData.actions.forEach((a)=>{

    //czas i pokrycie
    const today = new Date();
    const dataStart = new Date();
    dataStart.setDate(today.getDate() + outputData.events[a.prevEventId].earliest);
    let percentComplete : number;
    percentComplete = (Math.abs(outputData.events[a.nextEventId-1].earliest-outputData.events[a.nextEventId-1].stock)) / outputData.events[a.nextEventId-1].earliest * 100;

    //czy na sciezce krytycznej
    let criticalX = 'No Critical';
    outputData.criticalPathActions.forEach((c) =>{
      if(c.name===a.name)
        criticalX='Critical';
    })

    //dependencies
    let temp = '';
    var counter: number = 0;
    outputData.actions.forEach((a1)=>{
       if(a.prevEventId===a1.nextEventId){
         if(counter===0)
            temp += a1.name;
          else
            temp += ',' + a1.name;
          counter++;
      }
    })
    var dependencies;
    if(temp==='')
      dependencies = null;
    else
      dependencies = temp;
    console.log(criticalX);

    arrayGant.push({
      task_id: `${a.name}`,
      task_name: `${a.name}`,
      critical: criticalX,
      start_date: dataStart,
      end_date: null,
      duration: daysToMilliseconds(a.duration),
      percent_complete: percentComplete,
      dependencies
    })
  })

   return arrayGant;
};

export function DrawChart({output} : {output : GanttData[]}) {

  const newDASRFQA = output.map((x) => {
    return [x.task_id, x.task_name, x.critical, x.start_date, null, x.duration, x.percent_complete, x.dependencies]
  });

  return (<Chart chartType="Gantt" width="100%" height="50%" data = {[columns, ...newDASRFQA]} />);
}