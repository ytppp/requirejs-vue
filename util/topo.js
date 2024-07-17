define(function () {
  const DeviceRoleStr = 'Device role';
  const AlMacStr = 'AL MAC';
  const NeighborAlStr = 'neighbor_al';
  const BhInfoStr= 'BH Info';
  const BackhaulLinkMetricsStr = 'backhaul link metrics';
  const NeighborAlmacAddrStr = 'neighbor almac addr';
  const RssiStr = 'RSSI';
  const OtherClientsInfoStr = 'Other Clients Info';
  const ClientAddressStr = 'Client Address';
  const DeviceRole = {
    controller: '01',
    agent: '02',
    device: '03'
  };
  const MediumType = {
    b5g: '5G',
    b24g: '2.4G',
    ethernet: 'Ethernet'
  }; // 链接方式
  const Color = {
    controller: '#00d061',
    device: '#00d061',
    good: '#00d061',
    bad: '#ff6f00',
    offline: '#000'
  };
  const SvgPathDevice = 'path://M170.666667 256h768V170.666667H170.666667c-47.146667 0-85.333333 38.186667-85.333334 85.333333v469.333333H0v128h597.333333v-128H170.666667V256z m810.666666 85.333333H725.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667v426.666667c0 23.466667 19.2 42.666667 42.666666 42.666666h256c23.466667 0 42.666667-19.2 42.666667-42.666666V384c0-23.466667-19.2-42.666667-42.666667-42.666667z m-42.666666 384h-170.666667V426.666667h170.666667v298.666666z';
  const SvgPathAgent = 'path://M864.9 159.1C843.7 138 813.5 128 777 128c-71.3 0-166.6 38.1-265 105.9C413.6 166.1 318.3 128 247 128c-36.5 0-66.7 10-87.9 31.1-62.3 62.4-27.8 204 74.8 352.9-102.6 148.9-137.1 290.5-74.8 352.9C180.3 886 210.5 896 247 896c71.3 0 166.6-38.1 265-105.9C610.4 857.9 705.7 896 777 896c36.5 0 66.7-10 87.9-31.1 62.3-62.4 27.8-204-74.8-352.9 102.6-148.9 137.1-290.5 74.8-352.9zM222.4 342.7c-18.7-46.9-22.5-78.3-22.4-96.5 0.1-9.9 1.4-18.7 3.7-25.4a26.5 26.5 0 0 1 6.4-10.7c8.7-8.8 26.9-10.1 36.9-10.1h0.1c19 0 42.5 4.3 68.1 12.5 28.3 9 58.9 22.6 91 40.3 14.8 8.2 29.7 17.2 44.7 26.8a1136.5 1136.5 0 0 0-90.1 81.2 1115.6 1115.6 0 0 0-81.1 90.1c-24.3-37.4-43.5-73.7-57.3-108.2zM512 323.1a1050.3 1050.3 0 0 1 100.3 88.6A1052 1052 0 0 1 700.9 512a1052 1052 0 0 1-88.6 100.3A1050.3 1050.3 0 0 1 512 700.9a1050.3 1050.3 0 0 1-100.3-88.6A1052 1052 0 0 1 323.1 512 1082.4 1082.4 0 0 1 512 323.1zM406.2 771.2c-32.1 17.7-62.7 31.3-91 40.3-25.6 8.2-49.1 12.5-68.2 12.5-10 0-28.2-1.3-36.9-10.1s-10-26.3-10.1-36.1c-0.1-18.2 3.7-49.6 22.4-96.5 13.8-34.5 33-70.8 57.3-108.2a1115.6 1115.6 0 0 0 81.1 90.1 1115.6 1115.6 0 0 0 90.1 81.1q-22.5 14.6-44.7 26.9z m395.4-89.9c18.7 46.9 22.5 78.3 22.4 96.5-0.1 9.9-1.4 18.7-3.7 25.4a26.5 26.5 0 0 1-6.4 10.7C805.2 822.7 787 824 777 824c-19.1 0-42.6-4.3-68.2-12.5-28.3-9-58.9-22.6-91-40.3-14.8-8.2-29.7-17.2-44.7-26.8a1136.5 1136.5 0 0 0 90.1-81.2 1115.6 1115.6 0 0 0 81.1-90.1c24.3 37.4 43.5 73.7 57.3 108.2z m0-338.6c-13.8 34.5-33 70.8-57.3 108.2a1115.6 1115.6 0 0 0-81.1-90.1 1115.6 1115.6 0 0 0-90.1-81.1q22.5-14.6 44.7-26.9c32.1-17.7 62.7-31.3 91-40.3 25.6-8.2 49.1-12.5 68.2-12.5 10 0 28.2 1.3 36.9 10.1s10 26.3 10.1 36.1c0.1 18.2-3.7 49.6-22.4 96.5z';
  const SvgPathController = 'path://M988.416 821.216l1.504-0.576-101.504-267.328A64.32 64.32 0 0 0 828.608 512h-20.608V112a32 32 0 1 0-64 0V512H544V112a32 32 0 1 0-64 0V512H272V112a32 32 0 0 0-64 0V512h-12.608a64.32 64.32 0 0 0-59.84 41.312l-101.472 267.328 1.504 0.576c-2.112 8.64-3.584 17.504-3.584 26.784C32 909.76 82.24 960 144 960h736c61.76 0 112-50.24 112-112 0-9.28-1.472-18.144-3.584-26.784zM195.392 576h633.184l61.12 160.992c-3.232-0.288-6.368-0.992-9.696-0.992h-736c-3.328 0-6.464 0.704-9.696 0.992L195.392 576zM880 896h-736c-26.464 0-48-21.536-48-48S117.536 800 144 800h736c26.464 0 48 21.536 48 48s-21.536 48-48 48z';
  // 大于-70均认为优秀
  const isGood = rssi => rssi >= -70;
  // 找网关
  function findController(source) {
    return source.filter(s => s[DeviceRoleStr] === DeviceRole.controller )[0];
  }
  // 补充关系
  function addConnection(source) {
    let newSource = [];
    let divices = [];
    let agentIndex = 0;
    let deviceIndex = 0;
    source.forEach(s => {
      let neighbors = [];
      // 有邻居结点
      if (s[BackhaulLinkMetricsStr]) {
        s[BackhaulLinkMetricsStr].forEach(n => {
          // 邻居节点
          const neighborNode = source.filter(ss => ss[AlMacStr] === n[NeighborAlStr])[0];
          // 邻居中有该节点，但是该节点不在数据源中
          if (!neighborNode) {
            return;
          }
          if (s[DeviceRoleStr] === DeviceRole.controller) {
            // 从邻居结点取自己的信息
            const self = neighborNode[BhInfoStr].filter(nr => nr[NeighborAlmacAddrStr] === s[AlMacStr])[0];
            if (self) {
              neighbors.push({
                mac: n[NeighborAlStr],
                rssi: Number(self[RssiStr]),
                type: self['Backhaul Medium Type'],
                [DeviceRoleStr]: neighborNode[DeviceRoleStr]
              })
            }
          }
          if (s[DeviceRoleStr] === DeviceRole.agent) {
            // 从自身的"BH Info"获取邻居结点的信息
            const node = s[BhInfoStr].filter(nr => nr[NeighborAlmacAddrStr] === neighborNode[AlMacStr])[0];
            if (node) {
              neighbors.push({
                mac: node[NeighborAlmacAddrStr],
                rssi: Number(node[RssiStr]),
                type: node['Backhaul Medium Type'],
                [DeviceRoleStr]: neighborNode[DeviceRoleStr]
              })
            }
          }
        })
      }
      if (s[OtherClientsInfoStr]) {
        s[OtherClientsInfoStr].forEach(n => {
          neighbors.push({
            mac: n[ClientAddressStr],
            rssi: 0,
            type: n['Medium'],
            [DeviceRoleStr]: DeviceRole.device
          })
          divices.push({
            mac: n[ClientAddressStr],
            [DeviceRoleStr]: DeviceRole.device,
            name: `Device ${++deviceIndex}`,
            neighbors: [],
          })
        })
      }
      newSource.push({
        mac: s[AlMacStr],
        neighbors,
        name: s[DeviceRoleStr] === DeviceRole.agent ? `Agent ${++agentIndex}` : 'Controller',
        ...s
      });
    })
    return [
      ...newSource,
      ...divices
    ];
  }
  // 找绿色节点
  function findGreenNode(root, source, visited) {
    let green = [];
    root.neighbors.forEach(n => {
      const node = source.find(s => s.mac === n.mac);
      if (visited.includes(node)) {
        return;
      }
      visited.push(node);
      if (isGood(n.rssi)) {
        green.push(node);
        green = green.concat(findGreenNode(node, source, visited));
      }
    });
    return green;
  }
  // 找红色节点
  function findRedNode(green, nodes) {
    const red = [];
    nodes.forEach(s => {
      if (!green.includes(s)) {
        red.push(s);
      }
    });
    return red;
  }
  // 找离线节点
  function findOfflineNode(array, offline) {
    // 目前都是在线结点, 暂不考虑这种情况
    return array;
  }
  // 生成绘图需要的节点数据
  function genNodes(gateway, green, red, offline, chart) {
    function genNode(node, color, symbolSize = 50) {
      let symbol = '';
      if (node[DeviceRoleStr] === DeviceRole.controller) {
        symbol = SvgPathController;
      } else if (node[DeviceRoleStr] === DeviceRole.agent) {
        symbol = SvgPathAgent;
      } else if (node[DeviceRoleStr] === DeviceRole.device) {
        symbol = SvgPathDevice;
      }
      let n = {
        name: node.mac,
        originName: node.name, // 用于节点的label显示
        stationsCount: node.neighbors.filter(n => n[DeviceRoleStr] === DeviceRole.device).length,
        itemStyle: {
          color
        },
        symbol,
        symbolSize,
      };
      if (node[DeviceRoleStr] === DeviceRole.controller) {
        n = {
          ...n,
          fixed: true,
          x: chart.getWidth() / 2,
          y: chart.getHeight() / 2,
        }
      }
      return n;
    }
    const nodes = [];
    const nodeCount = 1 + green.length + red.length + offline.length;
    const symbolSize = [50, 30];
    if (nodeCount >= 8) {
      symbolSize[0] = 30;
      symbolSize[1] = 20;
    }
    nodes.push(genNode(gateway, Color.controller, symbolSize[0]));
    const allNodes = [
      ...green,
      ...red
    ];
    allNodes.forEach(n => {
      nodes.push(genNode(n, Color.device, symbolSize[1]));
    });
    offline.forEach(o => {
      nodes.push(genNode(o, Color.offline, symbolSize[1]));
    });
    return nodes;
  }
  // 生成绘图需要的线条信息
  function genLines(gateway, green, red, nodes, fullLine) {
    function genLine(source, target, color, value = 0) {
      return {
        source: source.mac,
        target: target.mac,
        rssi: value,
        type: (source.neighbors.find(n => n.mac === target.mac)).type,
        lineStyle: {
          color
        }
      };
    }
    const drawed = [];
    function exist(node1, node2) {
      const temp1 = `${node1.mac}${node2.mac}`;
      const temp2 = `${node2.mac}${node1.mac}`;
      if (!drawed.includes(temp1) && !drawed.includes(temp2)) {
        drawed.push(temp1);
        drawed.push(temp2);
        return false;
      }
      return true;
    }

    const lines = [];

    gateway.neighbors.forEach(n => {
      const node = nodes.find(s => s.mac === n.mac);
      if (!exist(node, gateway)) {
        if (isGood(n.rssi)) {
          lines.push(genLine(gateway, node, Color.good, n.rssi));
        } else if (red.includes(node)) {
          lines.push(genLine(gateway, node, Color.bad, n.rssi));
        } else if (fullLine) {
          lines.push(genLine(gateway, node, Color.bad, n.rssi));
        }
      }
    });

    red.forEach(r => {
      r.neighbors.forEach(n => {
        const node = nodes.find(s => s.mac === n.mac);
        if (!exist(node, r)) {
          if (isGood(n.rssi)) {
            lines.push(genLine(r, node, Color.good, n.rssi));
          } else {
            lines.push(genLine(r, node, Color.bad, n.rssi));
          }
        }
      });
    });

    green.forEach(r => {
      r.neighbors.forEach(n => {
        const node = nodes.find(s => s.mac === n.mac);
        if (!exist(node, r)) {
          if (isGood(n.rssi)) {
            lines.push(genLine(r, node, Color.good, n.rssi));
          } else if (!green.includes(node)) {
            lines.push(genLine(r, node, Color.bad, n.rssi));
          } else if (fullLine) {
            lines.push(genLine(r, node, Color.bad, n.rssi));
          }
        }
      });
    });
    return lines;
  }
  // 生成所有绘图数据
  function genData(routers, chart, fullLine) {
    console.log('routers origin', routers);

    const offline = [];
    routers = findOfflineNode(routers, offline);
    console.log('offline node', offline);
    routers = addConnection(routers);
    console.log('routers before add connection', routers);
    const controller = findController(routers);
    console.log('controller node', controller);
    const visited = [controller];
    const green = findGreenNode(controller, routers, visited);
    console.log('green node', green);
    const meshNodes = routers.filter(r => r.mac !== controller.mac);
    const red = findRedNode(green, meshNodes);
    console.log('red node', red);

    const nodes = genNodes(controller, green, red, offline, chart);
    const lines = genLines(controller, green, red, routers, fullLine);
    console.log('nodes', nodes, 'lines', lines);

    return {
      nodes,
      lines
    }
  }
  return {
    genData
  };
});
