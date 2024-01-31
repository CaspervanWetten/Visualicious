import { setEndDate, endDate, setStartDate, startDate} from "./index.js";
import {eventEmitter} from "./event-emitter.js";

const timeArray = [
  "January 2012",
  "February 2012",
  "March 2012",
  "April 2012",
  "May 2012",
  "June 2012",
  "July 2012",
  "August 2012",
  "September 2012",
  "October 2012",
  "November 2012",
  "December 2012",
  "January 2013",
  "February 2013",
  "March 2013",
  "April 2013",
  "May 2013",
  "June 2013",
  "July 2013",
  "August 2013",
  "September 2013",
  "October 2013",
  "November 2013",
  "December 2013",
  "January 2014",
  "February 2014",
  "March 2014",
  "April 2014",
  "May 2014",
  "June 2014",
  "July 2014",
  "August 2014",
  "September 2014",
  "October 2014",
  "November 2014",
  "December 2014",
  "January 2015",
  "February 2015",
  "March 2015",
  "April 2015",
  "May 2015",
  "June 2015",
  "July 2015",
  "August 2015",
  "September 2015",
  "October 2015",
  "November 2015",
  "December 2015",
  "January 2016",
  "February 2016",
  "March 2016",
  "April 2016",
  "May 2016",
  "June 2016",
  "July 2016",
  "August 2016",
  "September 2016",
  "October 2016",
  "November 2016",
  "December 2016",
  "January 2017",
  "February 2017",
  "March 2017",
  "April 2017",
  "May 2017",
  "June 2017",
  "July 2017",
  "August 2017",
  "September 2017",
  "October 2017",
  "November 2017",
  "December 2017",
  "January 2018",
  "February 2018",
  "March 2018",
  "April 2018",
  "May 2018",
  "June 2018",
  "July 2018",
  "August 2018",
  "September 2018",
  "October 2018",
  "November 2018",
  "December 2018",
  "January 2019",
  "February 2019",
  "March 2019",
  "April 2019",
  "May 2019",
  "June 2019",
  "July 2019",
  "August 2019",
  "September 2019",
  "October 2019",
  "November 2019",
  "December 2019",
  "January 2020",
  "February 2020",
  "March 2020",
  "April 2020",
  "May 2020",
  "June 2020",
  "July 2020",
  "August 2020",
  "September 2020",
  "October 2020",
  "November 2020",
  "December 2020",
  "January 2021",
  "February 2021",
  "March 2021",
  "April 2021",
  "May 2021",
  "June 2021",
  "July 2021",
  "August 2021",
  "September 2021",
  "October 2021",
  "November 2021",
  "December 2021",
  "January 2022",
  "February 2022",
  "March 2022",
  "April 2022",
  "May 2022",
  "June 2022",
  "July 2022",
  "August 2022",
  "September 2022",
  "October 2022",
  "November 2022",
  "December 2022",
  "January 2023",
  "February 2023",
  "March 2023",
  "April 2023",
  "May 2023",
  "June 2023",
  "July 2023",
  "August 2023",
  "September 2023",
  "October 2023",
  "November 2023",
  "December 2023",
];
const timeDict = {
  "January 2012": "2012MM01",
  "February 2012": "2012MM02",
  "March 2012": "2012MM03",
  "April 2012": "2012MM04",
  "May 2012": "2012MM05",
  "June 2012": "2012MM06",
  "July 2012": "2012MM07",
  "August 2012": "2012MM08",
  "September 2012": "2012MM09",
  "October 2012": "2012MM10",
  "November 2012": "2012MM11",
  "December 2012": "2012MM12",
  "January 2013": "2013MM01",
  "February 2013": "2013MM02",
  "March 2013": "2013MM03",
  "April 2013": "2013MM04",
  "May 2013": "2013MM05",
  "June 2013": "2013MM06",
  "July 2013": "2013MM07",
  "August 2013": "2013MM08",
  "September 2013": "2013MM09",
  "October 2013": "2013MM10",
  "November 2013": "2013MM11",
  "December 2013": "2013MM12",
  "January 2014": "2014MM01",
  "February 2014": "2014MM02",
  "March 2014": "2014MM03",
  "April 2014": "2014MM04",
  "May 2014": "2014MM05",
  "June 2014": "2014MM06",
  "July 2014": "2014MM07",
  "August 2014": "2014MM08",
  "September 2014": "2014MM09",
  "October 2014": "2014MM10",
  "November 2014": "2014MM11",
  "December 2014": "2014MM12",
  "January 2015": "2015MM01",
  "February 2015": "2015MM02",
  "March 2015": "2015MM03",
  "April 2015": "2015MM04",
  "May 2015": "2015MM05",
  "June 2015": "2015MM06",
  "July 2015": "2015MM07",
  "August 2015": "2015MM08",
  "September 2015": "2015MM09",
  "October 2015": "2015MM10",
  "November 2015": "2015MM11",
  "December 2015": "2015MM12",
  "January 2016": "2016MM01",
  "February 2016": "2016MM02",
  "March 2016": "2016MM03",
  "April 2016": "2016MM04",
  "May 2016": "2016MM05",
  "June 2016": "2016MM06",
  "July 2016": "2016MM07",
  "August 2016": "2016MM08",
  "September 2016": "2016MM09",
  "October 2016": "2016MM10",
  "November 2016": "2016MM11",
  "December 2016": "2016MM12",
  "January 2017": "2017MM01",
  "February 2017": "2017MM02",
  "March 2017": "2017MM03",
  "April 2017": "2017MM04",
  "May 2017": "2017MM05",
  "June 2017": "2017MM06",
  "July 2017": "2017MM07",
  "August 2017": "2017MM08",
  "September 2017": "2017MM09",
  "October 2017": "2017MM10",
  "November 2017": "2017MM11",
  "December 2017": "2017MM12",
  "January 2018": "2018MM01",
  "February 2018": "2018MM02",
  "March 2018": "2018MM03",
  "April 2018": "2018MM04",
  "May 2018": "2018MM05",
  "June 2018": "2018MM06",
  "July 2018": "2018MM07",
  "August 2018": "2018MM08",
  "September 2018": "2018MM09",
  "October 2018": "2018MM10",
  "November 2018": "2018MM11",
  "December 2018": "2018MM12",
  "January 2019": "2019MM01",
  "February 2019": "2019MM02",
  "March 2019": "2019MM03",
  "April 2019": "2019MM04",
  "May 2019": "2019MM05",
  "June 2019": "2019MM06",
  "July 2019": "2019MM07",
  "August 2019": "2019MM08",
  "September 2019": "2019MM09",
  "October 2019": "2019MM10",
  "November 2019": "2019MM11",
  "December 2019": "2019MM12",
  "January 2020": "2020MM01",
  "February 2020": "2020MM02",
  "March 2020": "2020MM03",
  "April 2020": "2020MM04",
  "May 2020": "2020MM05",
  "June 2020": "2020MM06",
  "July 2020": "2020MM07",
  "August 2020": "2020MM08",
  "September 2020": "2020MM09",
  "October 2020": "2020MM10",
  "November 2020": "2020MM11",
  "December 2020": "2020MM12",
  "January 2021": "2021MM01",
  "February 2021": "2021MM02",
  "March 2021": "2021MM03",
  "April 2021": "2021MM04",
  "May 2021": "2021MM05",
  "June 2021": "2021MM06",
  "July 2021": "2021MM07",
  "August 2021": "2021MM08",
  "September 2021": "2021MM09",
  "October 2021": "2021MM10",
  "November 2021": "2021MM11",
  "December 2021": "2021MM12",
  "January 2022": "2022MM01",
  "February 2022": "2022MM02",
  "March 2022": "2022MM03",
  "April 2022": "2022MM04",
  "May 2022": "2022MM05",
  "June 2022": "2022MM06",
  "July 2022": "2022MM07",
  "August 2022": "2022MM08",
  "September 2022": "2022MM09",
  "October 2022": "2022MM10",
  "November 2022": "2022MM11",
  "December 2022": "2022MM12",
  "January 2023": "2023MM01",
  "February 2023": "2023MM02",
  "March 2023": "2023MM03",
  "April 2023": "2023MM04",
  "May 2023": "2023MM05",
  "June 2023": "2023MM06",
  "July 2023": "2023MM07",
  "August 2023": "2023MM08",
  "September 2023": "2023MM09",
  "October 2023": "2023MM10",
  "November 2023": "2023MM11",
  "December 2023": "2023MM12",
}

const selectedStart = d3.select("#selectedStart");
const selectedEnd = d3.select("#selectedEnd");
const from = timeArray[0];
const to = timeArray.slice(-1)[0];

$("#slider").ionRangeSlider({
  type: "double",
  values: timeArray,
  onFinish: updateSelectedRange,
  onChange: updateSelectedRange,
  from: from,
  to: to,
  grid: false,
  hide_from_to: true,
});

function updateSelectedRange(data) {
  setStartDate(timeDict[data.from_value], `${data.from_value}`);
  setEndDate(timeDict[data.to_value], `${data.to_value}`);
  selectedStart.text(`${data.from_value}`);
  selectedEnd.text(`${data.to_value}`);
}

// Manually change the initial values
$('.irs-from').text("January 2012");
$('.irs-to').text("December 2023");


eventEmitter.on('update', () => {
  // Update the slider to the now set endDate and startDate @Casper
});
