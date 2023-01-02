import { parser } from "../diagrams/index.js";

const p = `
svg:
  width: 10
  height: 10
  nodeWidth: 90
  nodeHeight: 40
  nodeRadius: 12
  nodeGap: 40
  nodeOptions:
    stroke: "#748ffc"
    strokeWidth: 4
    fill: "#364fc7"
    fillStyle: "solid"
  lineOptions:
    strokeWidth: 4
    stroke: "#343a40"
  fonts:
    - url: "https://fonts.googleapis.com/css2?family=Architects+Daughter"
      onlyWhenDownload: false
  labelTextFontSize: "22"
  labelTextFontFamily: "Architects Daughter"
data:
  - id: "start"
    options:
      stroke: "#a9e34b"
      fill: "#5c940d"

  - id: "if"
    parent:
      - "start"
    options:
      stroke: "#ffd43b"
      fill: "#e67700"

  - id: "false"
    parent:
      - "if"

  - id: "true"
    parent:
      - "if"

  - id: "stop"
    parent:
      - "true"
      - "false"
    options:
      stroke: "#ff8787"
      fill: "#c92a2a"

  - id: "do"
    label: "do X"
    options:
      stroke: "#868e96"
      fill: "#212529"

  - id: "??"
    parent:
      - "do"

  - id: "profit"
    parent:
      - "??"
    options:
      stroke: "#38d9a9"
      fill: "#087f5b"
`;

const r = await parser("flowchart", p);
if (r?.success) {
	console.log(r.output);
}
