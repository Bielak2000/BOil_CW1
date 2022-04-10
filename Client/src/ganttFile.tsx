import { OutputData } from "./inputData";
import { Chart } from "react-google-charts";

export interface GanttData {
  task_id: string;
  task_name: string;
  critical: string;
  start_date: Date;
  end_date: null;
  duration: number;
  percent_complete: number;
  dependencies: string | null;
}

export interface GanttData2 {
  columns: {
    type: string;
    label: string;
  }[];
  arrayGant: GanttData[];
}

function daysToMilliseconds(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "Critical" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

export const dataGantt = (outputData: OutputData) => {
  const arrayGant: GanttData[] = [];
  let temp2 = 0;
  outputData.actions.forEach((a) => {
    //czas i pokrycie
    const today = new Date();
    const dataStart = new Date();
    let percentComplete: number;
    let dur: number;
    if (temp2 === 0) {
      dataStart.setDate(
        today.getDate() // + outputData.events[a.prevEventId].earliest
      );
      percentComplete = 100;
      dur = a.duration;
    } else {
      dataStart.setDate(
        today.getDate() + outputData.events[a.prevEventId - 1].earliest
      );
      percentComplete =
        (100 * a.duration) /
        (outputData.events[a.nextEventId - 1].latest -
          outputData.events[a.prevEventId - 1].earliest);
      dur =
        outputData.events[a.nextEventId - 1].latest -
        outputData.events[a.prevEventId - 1].earliest;
    }
    temp2++;

    //czy na sciezce krytycznej
    let criticalX = "No Critical";
    outputData.criticalPathActions.forEach((c) => {
      if (c.name === a.name) criticalX = "Critical";
    });

    //dependencies
    let temp = "";
    var counter: number = 0;
    outputData.actions.forEach((a1) => {
      if (a.prevEventId === a1.nextEventId) {
        if (counter === 0) temp += a1.name;
        else temp += "," + a1.name;
        counter++;
      }
    });
    var dependencies;
    if (temp === "") dependencies = null;
    else dependencies = temp;

    arrayGant.push({
      task_id: `${a.name}`,
      task_name: `${a.name}`,
      critical: criticalX,
      start_date: dataStart,
      end_date: null,
      duration: daysToMilliseconds(dur),
      percent_complete: percentComplete,
      dependencies,
    });
  });

  return arrayGant;
};

export function DrawChart({ output }: { output: GanttData[] }) {
  const newDASRFQA = output.map((x) => {
    return [
      x.task_id,
      x.task_name,
      x.critical,
      x.start_date,
      null,
      x.duration,
      x.percent_complete,
      x.dependencies,
    ];
  });
  console.log(newDASRFQA);
  // setHeight2(`${newDASRFQA.length * 45 + 40}px`);
  const height2 = `${newDASRFQA.length * 45 + 40}px`;
  console.log(height2);
  return (
    <div style={{ height: height2 }}>
      <Chart
        chartType="Gantt"
        width="100%"
        height="100%"
        data={[columns, ...newDASRFQA]}
      />
    </div>
  );
}
