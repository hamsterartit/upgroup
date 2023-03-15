const data = [
  {
    name: 'GiraFFe TDK-8.180',
    loadCapacity: '8',
    craneHeight: '60',
    liftHeight: '49-53',
    year: '2013-2020',
    img: 'img/img10.jpg',
    craneType: 'towerCranes',
  },
  {
    name: 'GiraFFe TDK-10.215',
    loadCapacity: '10',
    craneHeight: '65',
    liftHeight: '62,9-74,9',
    year: '2013-2022',
    img: 'img/img11.jpg',
    craneType: 'buCranes',
  },
  {
    name: 'GiraFFe TDK-10.180',
    loadCapacity: '10',
    craneHeight: '60',
    liftHeight: '53',
    year: '2013-2022',
    img: 'img/img12.jpg',
    craneType: 'portalCranes',
  },
  {
    name: 'Liebherr 132|Liebherr 112',
    loadCapacity: '8',
    craneHeight: '53',
    liftHeight: '47',
    year: '2006-2012',
    img: 'img/img13.jpg',
    craneType: 'overheadCranes',
  },
  {
    name: 'Liebherr 200 EC-B 10 Litronic',
    loadCapacity: '10',
    craneHeight: '60',
    liftHeight: '57',
    year: '2008-2012',
    img: 'img/img14.jpg',
    craneType: 'gantryCranes',
  },
  {
    name: 'Liebherr 280 EC-H 12 FR. Tronic',
    loadCapacity: '12',
    craneHeight: '75',
    liftHeight: '57',
    year: '2008-2012',
    img: 'img/img15.jpg',
    craneType: 'derrickCranes',
  },
];

window.filtersController = function () {
  return {
    craneType: '',
    loadCapacity: '',
    craneHeight: '',
    liftHeight: '',
    items: data,

    clickOnFilter() {
      this.items = data;

      let loadCapacityArr = this.loadCapacity.split('-');
      loadCapacityArr = JSON.parse(JSON.stringify(loadCapacityArr));

      let craneHeightArr = this.craneHeight.split('-');
      craneHeightArr = JSON.parse(JSON.stringify(craneHeightArr));

      let liftHeightArr = this.liftHeight.split('-');
      liftHeightArr = JSON.parse(JSON.stringify(liftHeightArr));

      this.items = JSON.parse(
        JSON.stringify(
          this.items
            .filter((item) => {
               if (!this.craneType) {
                console.log('hjghj');
                return true;
              }
              return item.craneType.includes(this.craneType);
            })
            .filter((item) => {
              if (loadCapacityArr[0] === '') {
                return true;
              } else if (loadCapacityArr.length > 1) {
                return +item.loadCapacity >= +loadCapacityArr[0] && +item.loadCapacity <= +loadCapacityArr[1];
              } else {
                return item.loadCapacity === loadCapacityArr[0];
              }
            })
            .filter((item) => {
              if (craneHeightArr[0] === '') {
                return true;
              } else if (craneHeightArr.length > 1) {
                return +item.craneHeight >= +craneHeightArr[0] && +item.craneHeight <= +craneHeightArr[1];
              } else {
                return item.craneHeight === craneHeightArr[0];
              }
            })
            .filter((item) => {
              if (liftHeightArr[0] === '') {
                return true;
              } else {

                if (item['liftHeight'].includes('-')) {
                  let itemArr = item['liftHeight'].split('-');
                  itemArr = JSON.parse(JSON.stringify(itemArr));

                  return +liftHeightArr[0] >= +itemArr[0] && +liftHeightArr[0] <= +itemArr[1];
                } else {
                  if (liftHeightArr[0] === '') {
                    return true;
                  } else if (liftHeightArr.length > 1) {
                    return +item.liftHeight >= +liftHeightArr[0] && +item.liftHeight <= +liftHeightArr[1];
                  } else {
                    return item.liftHeight === liftHeightArr[0];
                  }
                }
              }
            }),
        ),
      );

      return this.items;
    },

    clickOnReset() {
      this.items = data;
      this.craneType = '';
      this.loadCapacity = '';
      this.craneHeight = '';
      this.liftHeight = '';
      return this.items;
    },
  };
};
