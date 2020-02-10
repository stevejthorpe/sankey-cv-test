import React from 'react';
import { Group } from '@vx/group';
import { Text } from '@vx/text';
import { scaleOrdinal, schemeCategory10, scaleSequential, interpolateCool } from 'd3-scale';
import { format as d3format } from 'd3-format';
// import { sankeyJustify, sankeyLeft, sankeyRight } from 'd3-sankey-circular';
import { extent } from 'd3-array';

import Sankey from './CircularSankey';

const color = scaleSequential(interpolateCool);
const format = d3format(",d");

export default class extends React.Component {
  render() {
    const {
      data,
      width,
      height,
      margin = {
        top: 0,
        left: 0,
        right: 50,
        bottom: 0
      }
    } = this.props;

    if (width < 10) return null;

    return (
      <svg width={width + margin.left + margin.right} height={height}>
        <Sankey
          top={margin.top}
          left={margin.left}
          data={data}
          size={[width, height]}
          nodeWidth={15}
          nodePadding={40}
          nodePaddingRatio={0.1}
          nodeId={d => d.name}
          iterations={32}
        >
          {({ data }) => (
            <Group>
              {
                // Hack to set color domain after <Sankey> has set depth
                color.domain(extent(data.nodes, d => d.depth))
              }

              {data.nodes.map((node, i) => (
                <Group top={node.y0} left={node.x0} key={`node-${i}`}>
                  <rect
                    id={`rect-${i}`}
                    width={node.x1 - node.x0}
                    height={node.y1 - node.y0}
                    fill={color(node.depth)}
                    opacity={0.5}
                    stroke="white"
                    strokeWidth={2}
                  />

                  <Text
                    x={18}
                    y={((node.y1 - node.y0) / 2)}
                    verticalAnchor="middle"
                    style={{
                      font: '10px sans-serif'
                    }}
                  >
                    {node.name}
                  </Text>

                </Group>
              ))}

              <Group strokeOpacity={.2}>
                {data.links.map((link, i) => (
                  <path
                    key={`link-${i}`}
                    d={link.path}
                    stroke={link.circular ? 'red' : 'black'}
                    strokeWidth={Math.max(1, link.width)}
                    opacity={0.7}
                    fill="none"
                  />
                ))}
              </Group>
            </Group>
          )}
        </Sankey>
      </svg>
    );
  }
}
