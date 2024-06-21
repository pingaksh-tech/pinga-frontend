<template>
  <div>
    <div class="vx-col w-full lg:w-1/2 mb-base flex gap-5">
      <vx-card title="Sales Data">
        <template slot="actions">
          <feather-icon icon="HelpCircleIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
        </template>

        <!-- CHART -->
        <template slot="no-body">
          <div class="mt-10">
            <vue-apex-charts type="radialBar" height="240" :options="this.goalOverviewRadialBar.chartOptions" :series="goalOverview.series" />
          </div>
        </template>

        <!-- DATA -->
        <div class="flex justify-between text-center mt-6" slot="no-body-bottom">
          <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0 border-l-0">
            <p class="mt-4">Completed</p>
            <p class="mb-4 text-3xl font-semibold">786,617</p>
          </div>
          <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0">
            <p class="mt-4">In Progress</p>
            <p class="mb-4 text-3xl font-semibold">13,561</p>
          </div>
        </div>
      </vx-card>

      <vx-card title="Inventory Data">
        <div v-for="(browser, index) in browserStatistics" :key="browser.id" :class="{ 'mt-4': index }">
          <div class="flex justify-between">
            <div class="flex flex-col">
              <span class="mb-1">{{ browser.name }}</span>
              <h4>{{ browser.ratio }}%</h4>
            </div>
            <div class="flex flex-col text-right">
              <span class="flex -mr-1">
                <span class="mr-1">{{ browser.comparedResult }}</span>
                <feather-icon
                  :icon="browser.comparedResult < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'"
                  :svgClasses="[browser.comparedResult < 0 ? 'text-danger' : 'text-success', 'stroke-current h-4 w-4 mb-1 mr-1']"
                ></feather-icon>
              </span>
              <!-- <span class="text-grey">{{ browser.time | time(true) }}</span> -->
            </div>
          </div>
          <vs-progress :percent="browser.ratio"></vs-progress>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  components: {
    VueApexCharts
  },
  data() {
    return {
      goalOverviewRadialBar: {
        // series: [83],
        chartOptions: {
          plotOptions: {
            radialBar: {
              size: 110,
              startAngle: -150,
              endAngle: 150,
              hollow: {
                size: '77%'
              },
              track: {
                background: '#bfc5cc',
                strokeWidth: '50%'
              },
              dataLabels: {
                name: {
                  show: false
                },
                value: {
                  offsetY: 18,
                  color: '#99a2ac',
                  fontSize: '4rem'
                }
              }
            }
          },
          colors: ['#00db89'],
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'horizontal',
              shadeIntensity: 0.5,
              gradientToColors: ['#00b5b5'],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100]
            }
          },
          stroke: {
            lineCap: 'round'
          },
          chart: {
            sparkline: {
              enabled: true
            },
            dropShadow: {
              enabled: true,
              blur: 3,
              left: 1,
              top: 1,
              opacity: 0.1
            }
          }
        }
      },
      goalOverview: {
        analyticsData: {
          completed: 786617,
          inProgress: 13561
        },
        series: [83]
      },
      browserStatistics: [
        {
          id: 1,
          name: 'RIVKA RING',
          ratio: 73,
          time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
          comparedResult: '800'
        },
        {
          id: 3,
          name: 'CUSHION BAND FOR HIM',
          ratio: 8,
          time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
          comparedResult: '-200'
        },
        {
          id: 2,
          name: 'RUBY SOLITAIRE EARRING',
          ratio: 19,
          time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
          comparedResult: '100'
        },
        {
          id: 4,
          name: 'LORRAINE PENDANT',
          ratio: 27,
          time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
          comparedResult: '-450'
        }
      ]
    }
  }
}
</script>
