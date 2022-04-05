import cytoscape from "cytoscape";
import { InputData, Form, OutputData } from "./inputData";
import "./cy.css";
import coseBilkent from "cytoscape-cose-bilkent";

cytoscape.use(coseBilkent);

export const draw = (OutputData: OutputData) => {
  const nodeColor = "#9061F9";
  const edgeColor = "#9061F9";
  var cy = cytoscape({
    container: document.getElementById("cy"),

    style: [
      {
        selector: "node",
        style: {
          // "background-color": "#66e",
          label: "data(label)",
          "text-wrap": "wrap",
          "text-max-width": "30",
          "font-size": "10px",
          "text-halign": "center",
          "text-valign": "center",
          "padding-top": "2px",
          "border-color": "#000",
          "border-width": 1,
          "background-image":
            "https://images-ext-1.discordapp.net/external/KzzceWQBbfp8ZEMed4f-cRVRoVeVBv8A88sfjmUBfaM/%3F_nc_cat%3D111%26ccb%3D1-5%26_nc_sid%3Daee45a%26_nc_ohc%3Dw-z1dCG4gxgAX8GsH5R%26_nc_ad%3Dz-m%26_nc_cid%3D0%26_nc_ht%3Dscontent.xx%26oh%3D03_AVIleRm7-GaA5PnQa5Mf4uDV50w1e7luQRiQrohlnO9yOg%26oe%3D6266C793/https/scontent.xx.fbcdn.net/v/t1.15752-9/277217633_791994438776131_5445933574696745703_n.png",
          "background-fit": "cover",
        },
      },

      {
        selector: "edge",
        style: {
          width: 1,
          "line-color": "rgb(27, 91, 143)",
          "target-arrow-color": "rgb(27, 91, 143)",
          "target-arrow-shape": "triangle",
          "target-arrow-fill": "filled",
          label: "data(id)",
          "font-size": "14px",
          color: "black",
          "curve-style": "bezier",
        },
      },
    ],
  });

  OutputData.events.forEach((e, index, arr) => {
    const data =
      e.earliest >= 10 || e.latest >= 10
        ? `${e.eventId}\n${e.earliest}  ${e.latest}\n${e.stock}`
        : `${e.eventId}\n${e.earliest}     ${e.latest}\n${e.stock}`;
    cy.add({
      group: "nodes",
      data: {
        id: `${e.eventId}`,
        label: data,
      },
    });
  });
  OutputData.actions.forEach((a) => {
    cy.add({
      group: "edges",
      data: {
        id: a.name + a.duration,
        source: a.prevEventId,
        target: a.nextEventId,
      },
    });
  });

  cy.center();

  var defaultOptions = {
    name: "cose-bilkent",
    // Called on `layoutready`
    ready: function () {},
    // Called on `layoutstop`
    stop: function () {},
    // 'draft', 'default' or 'proof"
    // - 'draft' fast cooling rate
    // - 'default' moderate cooling rate
    // - "proof" slow cooling rate
    quality: "default",
    // Whether to include labels in node dimensions. Useful for avoiding label overlap
    nodeDimensionsIncludeLabels: false,
    // number of ticks per frame; higher is faster but more jerky
    refresh: 30,
    // Whether to fit the network view after when done
    fit: true,
    // Padding on fit
    padding: 10,
    // Whether to enable incremental mode
    randomize: true,
    // Node repulsion (non overlapping) multiplier
    nodeRepulsion: 4500,
    // Ideal (intra-graph) edge length
    idealEdgeLength: 50,
    // Divisor to compute edge forces
    edgeElasticity: 0.45,
    // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
    nestingFactor: 0.1,
    // Gravity force (constant)
    gravity: 0.25,
    // Maximum number of iterations to perform
    numIter: 2500,
    // Whether to tile disconnected nodes
    tile: true,
    // Type of layout animation. The option set is {'during', 'end', false}
    animate: "end",
    // Duration for animate:end
    animationDuration: 500,
    // Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
    tilingPaddingVertical: 10,
    // Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
    tilingPaddingHorizontal: 10,
    // Gravity range (constant) for compounds
    gravityRangeCompound: 1.5,
    // Gravity force (constant) for compounds
    gravityCompound: 1.0,
    // Gravity range (constant)
    gravityRange: 3.8,
    // Initial cooling factor for incremental layout
    initialEnergyOnIncremental: 0.5,
    directed: true,
  };

  cy.layout(defaultOptions).run();
};
