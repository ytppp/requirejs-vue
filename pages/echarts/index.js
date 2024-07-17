define(function (require) {
  require('css!./style.css');
  require('fh-layout');
  const echarts = require('echarts');
  const { genData } = require('topo');
  return {
    template: require('text!./template.html'),
    data() {
      return {
        chart: null,
      };
    },
    computed: {
    },
    methods: {
      initChart() {
        const topoEl = document.getElementById('topo');
        this.chart = echarts.init(topoEl);
        window.addEventListener('resize', () => {
          this.chart && this.chart.resize();
        });
      },
      drawTopo(routers) {
        const data = genData(routers, this.chart, true);
        const option = {
          tooltip: {
            trigger: 'item',
            padding: [20],
            confine: true,
            backgroundColor: '#fff',
            extraCssText:
              'box-shadow:-3px 8px 22px 0px rgba(223,226,239,1);border-radius:4px;',
            textStyle: {
              color: '#333'
            },
            formatter: params => {
              const data = params.data;
              console.log('data', data);
              if (!data.name) return;
              const str = [];
              str.push('<div class="popup-info">');
              const strFormatter = str => {
                return str || '-';
              };
              const tagBuilder = (value, cls) => {
                const content = value instanceof Array ? value.join('') : value;
                return `<div class="${cls}">${content}</div>`;
              };
              const rowBuilder = (label, content) => {
                return tagBuilder(
                  [
                    tagBuilder(label, 'popup-info__label'),
                    tagBuilder(content, 'popup-info__value')
                  ],
                  'popup-info__row'
                );
              };
              str.push(
                tagBuilder(
                  tagBuilder(`${data.originName}`, 'popup-info__title'),
                  'popup-info__row'
                )
              );
              str.push(rowBuilder(`${this.$t('trans0097')}:`, strFormatter(data.name)));
              str.push('</div>');
              return str.join('');
            }
          },
          series: [
            {
              type: 'graph',
              roam: true,
              edgeSymbol: ['circle', 'circle'],
              edgeSymbolSize: 3,
              focusNodeAdjacency: true,
              cursor: 'pointer',
              layout: 'force',
              hoverAnimation: false,
              edgeLabel: {
                show: true,
                formatter(series) {
                  let format = '';
                  const { type, rssi } = series.data;
                  format = `{a|${type}} `;
                  if (rssi) {
                    format += `{b|${rssi}}`
                  }
                  return format;
                },
                rich: {
                  a: {
                    color: '#000',
                    backgroundColor: '#fff'
                  },
                  b: {
                    width: 20,
                    height: 16,
                    color: '#fff',
                    fontSize: 10,
                    align: 'center',
                    borderRadius: 3,
                    backgroundColor: '#999'
                  }
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'bottom',
                  color: '#333',
                  backgroundColor: '#fff',
                  formatter(category) {
                    let nameFormatted = '';
                    let format = '';
                    // originName是节点的原始名称
                    const { originName: name, stationsCount } = category.data;
                    if (name.length <= 10) {
                      nameFormatted = name;
                    }
                    const splitor = ' ';
                    if (name.includes(splitor)) {
                      const sp = name.split(splitor);
                      let index = 1;
                      let start = sp[0];
                      while ((start + sp[index]).length < 10 && index < sp.length) {
                        start += ` ${sp[index]}`;
                        index += 1;
                      }
                      const end = sp.slice(index).join(splitor);
                      nameFormatted = `${start}\n${end}`;
                    }
                    nameFormatted = name.match(/.{1,10}/g).join('\n');
                    format = `{a|${nameFormatted}} `;
                    if (stationsCount) {
                      format += `{b|${stationsCount}}`
                    }
                    return format;
                  },
                  rich: {
                    a: {
                      color: '#000',
                      backgroundColor: '#fff'
                    },
                    b: {
                      width: 20,
                      height: 16,
                      color: '#fff',
                      fontSize: 10,
                      align: 'center',
                      borderRadius: 3,
                      backgroundColor: '#999'
                    }
                  }
                }
              },
              force: {
                repulsion: 2000,
                edgeLength: 200,
                layoutAnimation: false
              },
              data: data.nodes,
              links: data.lines,
              lineStyle: { width: 2 }
            }
          ]
        };
        this.chart.setOption(option);
      }
    },
    created () {
    },
    mounted () {
      this.initChart();
      const objStr = JSON.stringify({
        "status": "SUCCESS",
        "luaTopologyInfo": {
          "topology information": [
            {
              "AL MAC": "90:80:70:60:50:04",
              "Map version": "01",
              "Device role": "01",
              "Distance from controller": "0",
              "BH Interface(AP)": [
                {
                  "MAC address": "92:80:70:40:50:05",
                  "interface name": "NA"
                }
              ],
              "BH Interface(APCLI)": [],
              "backhaul link metrics": [
                {
                  "neighbor_al": "ec:f7:2b:10:0a:15",
                  "metrics": [
                    {
                      "local_if_mac": "92:80:70:40:50:05",
                      "neighbor_if_mac": "ea:f7:2b:00:0a:17",
                      "tx packet Errors": "0",
                      "transmittedPackets": "2168",
                      "macThroughputCap": "780",
                      "linkAvailability": "50",
                      "phyRate": "0",
                      "rx packet Errors": "0",
                      "Packets Received": "1250",
                      "RSSI": "-42"
                    }
                  ]
                }
              ],
              "Number of radios": "2",
              "Radio Info": [
                {
                  "channel": "64",
                  "identifier": "00:00:00:00:02:00",
                  "BW": "NA",
                  "wireless mode": "4",
                  "Tx Spatial streams": "1",
                  "Rx Spatial streams": "1",
                  "BSSINFO": [
                    {
                      "BSSID": "92:80:70:40:50:05",
                      "SSID": "FHTKBH605000",
                      "Security": "0020",
                      "Encryption": "0008",
                      "Pass-phrase": "12345678",
                      "Hidden": "1",
                      "connected sta info": []
                    },
                    {
                      "BSSID": "90:80:70:60:50:05",
                      "SSID": "FHTEK-AP1-xiaolin",
                      "Security": "0020",
                      "Encryption": "0008",
                      "Pass-phrase": "12345678",
                      "Hidden": "0"
                    }
                  ]
                },
                {
                  "channel": "1",
                  "identifier": "00:00:00:00:01:00",
                  "BW": "NA",
                  "wireless mode": "2",
                  "Tx Spatial streams": "1",
                  "Rx Spatial streams": "1",
                  "BSSINFO": [
                    {
                      "BSSID": "92:80:70:40:50:04",
                      "SSID": "FHTKBH605000",
                      "Security": "0020",
                      "Encryption": "0008",
                      "Pass-phrase": "12345678",
                      "Hidden": "1"
                    },
                    {
                      "BSSID": "90:80:70:60:50:04",
                      "SSID": "FHTEK-AP1-xiaolin",
                      "Security": "0020",
                      "Encryption": "0008",
                      "Pass-phrase": "12345678",
                      "Hidden": "0"
                    }
                  ]
                }
              ],
              "BH Info": [],
              "Other Clients Info": []
            },
            {
              "AL MAC": "ec:f7:2b:10:0a:15",
              "Map version": "01",
              "Device role": "02",
              "Distance from controller": "1",
              "Upstream 1905 device": "90:80:70:60:50:04",
              "BH Interface(AP)": [],
              "BH Interface(APCLI)": [
                {
                  "MAC address": "ea:f7:2b:00:0a:17",
                  "interface name": "N/A"
                }
              ],
              "backhaul link metrics": [
                {
                  "neighbor_al": "90:80:70:60:50:04",
                  "metrics": [
                    {
                      "local_if_mac": "ea:f7:2b:00:0a:17",
                      "neighbor_if_mac": "92:80:70:40:50:05",
                      "tx packet Errors": "0",
                      "transmittedPackets": "2920",
                      "macThroughputCap": "780",
                      "linkAvailability": "50",
                      "phyRate": "0",
                      "rx packet Errors": "0",
                      "Packets Received": "1228",
                      "RSSI": "-38"
                    }
                  ]
                }
              ],
              "Number of radios": "2",
              "Radio Info": [
                {
                  "channel": "64",
                  "identifier": "00:00:00:00:02:00",
                  "BW": "NA",
                  "wireless mode": "4",
                  "Tx Spatial streams": "1",
                  "Rx Spatial streams": "1",
                  "BSSINFO": [
                    {
                      "BSSID": "ec:f7:2b:10:0a:17",
                      "SSID": "FHTEK-AP1-xiaolin"
                    },
                    {
                      "BSSID": "ee:f7:2b:40:0a:17",
                      "SSID": "FHTKBH605000"
                    }
                  ]
                },
                {
                  "channel": "1",
                  "identifier": "00:00:00:00:01:00",
                  "BW": "NA",
                  "wireless mode": "2",
                  "Tx Spatial streams": "1",
                  "Rx Spatial streams": "1",
                  "BSSINFO": [
                    {
                      "BSSID": "ec:f7:2b:10:0a:16",
                      "SSID": "FHTEK-AP1-xiaolin"
                    },
                    {
                      "BSSID": "ee:f7:2b:40:0a:16",
                      "SSID": "FHTKBH605000"
                    }
                  ]
                }
              ],
              "BH Info": [
                {
                  "neighbor almac addr": "90:80:70:60:50:04",
                  "connected iface addr": "ea:f7:2b:00:0a:17",
                  "Backhaul Medium Type": "5G",
                  "RSSI": "-38"
                }
              ],
              "Other Clients Info": [
                {
                  "1905 Intf address": "ec:f7:2b:10:0a:15",
                  "Client Address": "a4:ae:12:33:fb:bf",
                  "Medium": "Ethernet"
                }
              ]
            }
          ]
        },
        "luaTopologyInfoLen": "1261"
      });
      const obj = JSON.parse(objStr);
      if (obj.status == "SUCCESS") {
        const routers = obj['luaTopologyInfo']['topology information'];
        this.drawTopo(routers);
      }
    }
  };
});
