import { parser } from "../diagrams/index.js";

const p = `
svg:
  fonts:
    - url: "https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap"
      onlyWhenDownload: false
  pieStartAngle: 2.3
  pieLabelGap: 30
  labelGap: 20
  labelBoxSize: 16
  labelBoxOptions:
    strokeWidth: 2.5
  labelTextFontWeight: "700"
  labelTextFontSize: "20"
  labelTextFontFamily: "Architects Daughter, sans-serif"
data:
  - label: "Sky"
    value: 75
    options: 
      strokeWidth: 4
      fill: "#4c6ef5"
      fillStyle: "solid"

  - label: "Shady side of pyramid"
    value: 5
    options: 
      strokeWidth: 4
      fill: "#f76707"
      fillStyle: "solid"

  - label: "Sunny side of pyramid"
    value: 20
    options: 
      strokeWidth: 4
      fill: "#ffe066"
      fillStyle: "solid"
`;

const pie = await parser("pie", p);
if (pie?.success) {
	console.log(pie.output);
}
