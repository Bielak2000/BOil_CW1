import cytoscape from 'cytoscape'
import {InputData, Form, OutputData} from "./inputData";
import './cy.css';


export const draw = (OutputData : OutputData) => {
    //console.log("5");
    // var cy = cytoscape({
    //     container: document.getElementById('cy'),
    //     elements: [
    //       { data: { id: 'a' } },
    //       { data: { id: 'b' } },
    //       {
    //         data: {
    //           id: 'ab',
    //           source: 'a',
    //           target: 'b'
    //         }
    //       }],

    //       style: [
    //         {
    //             selector: 'node',
    //             style: {
    //                 shape: 'hexagon',
    //                 'background-color': 'red',
    //                 label: 'data(id)'
    //             }
    //         }],
    //         layout: {
    //             name: 'grid'
    //         }
            
    //   });
    const nodeColor = "#9061F9";
    const edgeColor = "#9061F9";

    var cy = cytoscape({
        container: document.getElementById("cy"), // container to render in
        //elements: [
                //   { data: { id: 'a' } },
                //   { data: { id: 'b' } },
                //   {
                //     data: {
                //       id: 'ab',
                //       source: 'a',
                //       target: 'b'
                //     }
                //   }
           // ],
                  style: [ // the stylesheet for the graph
                  {
                    selector: 'node',
                    style: {
                      'background-color': '#69e',
                      'label': 'data(id)',
                    }
                  },
              
                  {
                    selector: 'edge',
                    style: {
                      'width': 1,
                      'line-color': '#369',
                      'target-arrow-color': '#369',
                      'target-arrow-shape': 'triangle',
                      'label': 'data(id)',
                      'font-size': '14px',
                      'color': '#777'
                    }
                  }
                ],
    
        layout: {
          name: "breadthfirst",
          fit: true,
          padding: 30
        }
      });
      

      OutputData.events.forEach((e) => {
        cy.add({
            data: { id: `${e.eventId}`}
            }
        );
      })
      OutputData.actions.forEach((a) => {
        cy.add({
            data: {
                id: a.name + a.duration,
                source: a.prevEventId,
                target: a.nextEventId
            }
        });
      })

      cy.center();
    // for (var i = 0; i < 10; i++) {
    //     cy.add({
    //         data: { id: 'node' + i }
    //         }
    //     );
    //     var source = 'node' + i;
    //     cy.add({
    //         data: {
    //             id: 'edge' + i,
    //             source: source,
    //             target: (i % 2 == 0 ? 'a' : 'b')
    //         }
    //     });
    // }
}