import React from "react";
import { Stage, Layer, Line, Circle, Arrow, Text } from "react-konva";

interface Node {
  x: number;
  y: number;
  label: string;
}

interface TrussDiagramPProps {
  trussSpan: number;
  trussHeight: number;
  forces: { node: number; fx: number; fy: number }[]; // Forces from table
}

const TrussDiagramP: React.FC<TrussDiagramPProps> = ({
  trussSpan,
  trussHeight,
  forces,
}) => {
  const baseSpan = 500;
  const baseHeight = 200;
  const arrowScale = 0.1 * trussSpan; // Adjust arrow scaling dynamically
  const maxArrowLength = 50; // Limit arrow length

  // Define truss nodes with scaling
  const nodes: Node[] = [
    { x: 100, y: 100, label: "0" },
    { x: 200, y: 200, label: "1" },
    { x: 300, y: 100, label: "2" },
    { x: 400, y: 200, label: "3" },
    { x: 500, y: 100, label: "4" },
  ].map((node) => ({
    x: (node.x / baseSpan) * trussSpan + 50, // Maintain spacing
    y: 300 - (node.y / baseHeight) * trussHeight, // Invert y-axis scaling
    label: node.label,
  }));

  // Define truss members (connections)
  const bars = [
    [0, 1],
    [1, 3],
    [3, 4],// Top chord
    [0, 2],
    [2, 4], // Bottom chord
    [1, 2],
    [2, 3], // Vertical members
  ];

  return (
    <Stage width={900} height={400}>
      <Layer>
        {/* Draw truss members */}
        {bars.map(([start, end], index) => (
          <Line
            key={index}
            points={[
              nodes[start].x,
              nodes[start].y,
              nodes[end].x,
              nodes[end].y,
            ]}
            stroke="black"
            strokeWidth={2}
          />
        ))}

        {/* Draw truss nodes and labels */}
        {nodes.map((node, index) => (
          <React.Fragment key={index}>
            <Circle x={node.x} y={node.y} radius={5} fill="red" />
            <Text
              x={node.x - 15}
              y={node.y + 13}
              text={node.label}
              fontSize={16}
              fill="blue"
              fontStyle="bold"
            />
          </React.Fragment>
        ))}

        {/* Horizontal Reaction at Node 0 */}
        <Arrow
          points={[nodes[0].x - 40, nodes[0].y, nodes[0].x, nodes[0].y]}
          stroke="blue"
          fill="blue"
          strokeWidth={3}
        />
        <Text
          x={nodes[0].x - 60}
          y={nodes[0].y - 10}
          text="Ha"
          fontSize={14}
          fill="blue"
        />

        {/* Vertical Reaction at Node 0 */}
        <Arrow
          points={[nodes[0].x , nodes[0].y +40 , nodes[0].x, nodes[0].y]}
          stroke="blue"
          fill="blue"
          strokeWidth={3}
        />
        <Text
          x={nodes[0].x + 10}
          y={nodes[0].y + 40}
          text="Ra"
          fontSize={14}
          fill="blue"
        />

        {/* Vertical Reaction at Node 7 */}
        <Arrow
          points={[nodes[4].x, nodes[4].y + 40, nodes[4].x, nodes[4].y]}
          stroke="blue"
          fill="blue"
          strokeWidth={3}
        />
        <Text
          x={nodes[4].x - 25}
          y={nodes[4].y + 40}
          text="Rb"
          fontSize={14}
          fill="blue"
        />


        {/* Draw Force Arrows */}
        {forces.map(({ node, fx, fy }, index) => {
          const nodePos = nodes[node];
          if (!nodePos) return null;

          const fxArrowLength = Math.min(Math.abs(fx) * arrowScale, maxArrowLength);
          const fyArrowLength = Math.min(Math.abs(fy) * arrowScale, maxArrowLength);

          return (
            <React.Fragment key={index}>
              {/* Fx Arrow (Horizontal) */}
              {fx !== 0 && (
                <Arrow
                  points={[
                    nodePos.x,
                    nodePos.y,
                    nodePos.x + (fx > 0 ? fxArrowLength : -fxArrowLength),
                    nodePos.y,
                  ]}
                  stroke="green"
                  fill="green"
                  strokeWidth={3}
                />
              )}

              {/* Fy Arrow (Vertical) */}
              {fy !== 0 && (
                <Arrow
                  points={[
                    nodePos.x,
                    nodePos.y,
                    nodePos.x,
                    nodePos.y - (fy > 0 ? fyArrowLength : -fyArrowLength),
                  ]}
                  stroke="red"
                  fill="red"
                  strokeWidth={3}
                />
              )}

              {/* Force Labels */}
              {fx !== 0 && (
                <Text
                  x={nodePos.x + (fx > 0 ? fxArrowLength + 5 : -fxArrowLength - 20)}
                  y={nodePos.y - 5}
                  text={`Fx = ${fx}kN`}
                  fontSize={14}
                  fill="green"
                />
              )}
              {fy !== 0 && (
                <Text
                  x={nodePos.x - 20}
                  y={nodePos.y - (fy > 0 ? fyArrowLength + 20 : -fyArrowLength - 10)}
                  text={`${fy}kN`}
                  fontSize={14}
                  fill="red"
                />
              )}
            </React.Fragment>
          );
        })}
      </Layer>
    </Stage>
  );
};

export default TrussDiagramP;
