// import {setLoading, setData} from "./index.js";
// import {eventEmitter} from "./event-emitter.js";
//
// let globalTSVData = null;
//
// const timeDict = {
//     "January 2012": "2012MM01",
//     "February 2012": "2012MM02",
//     "March 2012": "2012MM03",
//     "April 2012": "2012MM04",
//     "May 2012": "2012MM05",
//     "June 2012": "2012MM06",
//     "July 2012": "2012MM07",
//     "August 2012": "2012MM08",
//     "September 2012": "2012MM09",
//     "October 2012": "2012MM10",
//     "November 2012": "2012MM11",
//     "December 2012": "2012MM12",
//     "January 2013": "2013MM01",
//     "February 2013": "2013MM02",
//     "March 2013": "2013MM03",
//     "April 2013": "2013MM04",
//     "May 2013": "2013MM05",
//     "June 2013": "2013MM06",
//     "July 2013": "2013MM07",
//     "August 2013": "2013MM08",
//     "September 2013": "2013MM09",
//     "October 2013": "2013MM10",
//     "November 2013": "2013MM11",
//     "December 2013": "2013MM12",
//     "January 2014": "2014MM01",
//     "February 2014": "2014MM02",
//     "March 2014": "2014MM03",
//     "April 2014": "2014MM04",
//     "May 2014": "2014MM05",
//     "June 2014": "2014MM06",
//     "July 2014": "2014MM07",
//     "August 2014": "2014MM08",
//     "September 2014": "2014MM09",
//     "October 2014": "2014MM10",
//     "November 2014": "2014MM11",
//     "December 2014": "2014MM12",
//     "January 2015": "2015MM01",
//     "February 2015": "2015MM02",
//     "March 2015": "2015MM03",
//     "April 2015": "2015MM04",
//     "May 2015": "2015MM05",
//     "June 2015": "2015MM06",
//     "July 2015": "2015MM07",
//     "August 2015": "2015MM08",
//     "September 2015": "2015MM09",
//     "October 2015": "2015MM10",
//     "November 2015": "2015MM11",
//     "December 2015": "2015MM12",
//     "January 2016": "2016MM01",
//     "February 2016": "2016MM02",
//     "March 2016": "2016MM03",
//     "April 2016": "2016MM04",
//     "May 2016": "2016MM05",
//     "June 2016": "2016MM06",
//     "July 2016": "2016MM07",
//     "August 2016": "2016MM08",
//     "September 2016": "2016MM09",
//     "October 2016": "2016MM10",
//     "November 2016": "2016MM11",
//     "December 2016": "2016MM12",
//     "January 2017": "2017MM01",
//     "February 2017": "2017MM02",
//     "March 2017": "2017MM03",
//     "April 2017": "2017MM04",
//     "May 2017": "2017MM05",
//     "June 2017": "2017MM06",
//     "July 2017": "2017MM07",
//     "August 2017": "2017MM08",
//     "September 2017": "2017MM09",
//     "October 2017": "2017MM10",
//     "November 2017": "2017MM11",
//     "December 2017": "2017MM12",
//     "January 2018": "2018MM01",
//     "February 2018": "2018MM02",
//     "March 2018": "2018MM03",
//     "April 2018": "2018MM04",
//     "May 2018": "2018MM05",
//     "June 2018": "2018MM06",
//     "July 2018": "2018MM07",
//     "August 2018": "2018MM08",
//     "September 2018": "2018MM09",
//     "October 2018": "2018MM10",
//     "November 2018": "2018MM11",
//     "December 2018": "2018MM12",
//     "January 2019": "2019MM01",
//     "February 2019": "2019MM02",
//     "March 2019": "2019MM03",
//     "April 2019": "2019MM04",
//     "May 2019": "2019MM05",
//     "June 2019": "2019MM06",
//     "July 2019": "2019MM07",
//     "August 2019": "2019MM08",
//     "September 2019": "2019MM09",
//     "October 2019": "2019MM10",
//     "November 2019": "2019MM11",
//     "December 2019": "2019MM12",
//     "January 2020": "2020MM01",
//     "February 2020": "2020MM02",
//     "March 2020": "2020MM03",
//     "April 2020": "2020MM04",
//     "May 2020": "2020MM05",
//     "June 2020": "2020MM06",
//     "July 2020": "2020MM07",
//     "August 2020": "2020MM08",
//     "September 2020": "2020MM09",
//     "October 2020": "2020MM10",
//     "November 2020": "2020MM11",
//     "December 2020": "2020MM12",
//     "January 2021": "2021MM01",
//     "February 2021": "2021MM02",
//     "March 2021": "2021MM03",
//     "April 2021": "2021MM04",
//     "May 2021": "2021MM05",
//     "June 2021": "2021MM06",
//     "July 2021": "2021MM07",
//     "August 2021": "2021MM08",
//     "September 2021": "2021MM09",
//     "October 2021": "2021MM10",
//     "November 2021": "2021MM11",
//     "December 2021": "2021MM12",
//     "January 2022": "2022MM01",
//     "February 2022": "2022MM02",
//     "March 2022": "2022MM03",
//     "April 2022": "2022MM04",
//     "May 2022": "2022MM05",
//     "June 2022": "2022MM06",
//     "July 2022": "2022MM07",
//     "August 2022": "2022MM08",
//     "September 2022": "2022MM09",
//     "October 2022": "2022MM10",
//     "November 2022": "2022MM11",
//     "December 2022": "2022MM12",
//     "January 2023": "2023MM01",
//     "February 2023": "2023MM02",
//     "March 2023": "2023MM03",
//     "April 2023": "2023MM04",
//     "May 2023": "2023MM05",
//     "June 2023": "2023MM06",
//     "July 2023": "2023MM07",
//     "August 2023": "2023MM08",
//     "September 2023": "2023MM09",
//     "October 2023": "2023MM10",
//     "November 2023": "2023MM11",
//     "December 2023": "2023MM12",
// }
//
// function fetchTSVDataOnLoad(url) {
//     setLoading(true);
//     let receivedLength = 0; // received that many bytes at the moment
//     let chunks = []; // array of received binary chunks (comprises the body)
//     fetch(url)
//         .then(response => {
//             const reader = response.body.getReader();
//             const contentLength = +response.headers.get('Content-Length');
//
//             // Read the data
//             let stream = new ReadableStream({
//                 start(controller) {
//                     function push() {
//                         reader.read().then(({ done, value }) => {
//                             if (done) {
//                                 controller.close();
//                                 return;
//                             }
//
//                             receivedLength += value.length;
//                             chunks.push(value);
//                             console.log(`Received ${receivedLength} of ${contentLength}`);
//
//                             // Push the chunk to the stream for processing
//                             controller.enqueue(value);
//
//                             // Call the push function again to read the next chunk
//                             push();
//                         }).catch(error => {
//                             console.error('Stream reading error:', error);
//                             setLoading(false);
//                         });
//                     }
//
//                     push();
//                 }
//             });
//
//             // Return the new stream
//             return new Response(stream).text();
//         })
//         .then(tsvData => {
//
//             console.log(Object.keys(tsvData).length);
//             console.log("Dataset loaded");
//
//             // setData(data);
//             setLoading(false);
//
//             //eventEmitter.emit('firstLoad');
//
//             // Set the initial data which is NL00, 0.0.0, 2012MM01, 2023MM12
//             // @bjornkoemans Klopt het dat dit begint bij 2018-2020?
//             // filterTSVData("2012MM01", "2023MM12", 'NL00', ['0.0.0']);
//
//         })
//         .catch(error => {
//             console.error('Error fetching TSV:', error);
//             setLoading(false);
//         });
// }
//
//
// function createDictionaryFromTSV(tsvData, dateCodeList, regionCode, crimeCodeList) {
//     // Split the TSV data into lines
//     const lines = tsvData.split('\n');
//
//     // Extract headers
//     const headers = lines[0].split('\t');
//
//     // Find the index of the required columns
//     const periodenIndex = headers.indexOf('Perioden');
//     const wijkenEnBuurtenIndex = headers.indexOf('WijkenEnBuurten');
//     const soortMisdrijfIndex = headers.indexOf('SoortMisdrijf');
//
//     // Initialize the dictionary
//     const dictionary = {};
//
//     // Process each line
//     lines.slice(1).forEach(line => {
//         const columns = line.split('\t');
//
//         // Apply filters
//         if (dateCodeList.includes(columns[periodenIndex]) &&
//             columns[wijkenEnBuurtenIndex] === regionCode &&
//             crimeCodeList.includes(columns[soortMisdrijfIndex])) {
//
//             // Add to the dictionary
//             dictionary[columns[0]] = {
//                 SoortMisdrijf: columns[soortMisdrijfIndex],
//                 WijkenEnBuurten: columns[wijkenEnBuurtenIndex],
//                 Perioden: columns[periodenIndex],
//                 GeregistreerdeMisdrijven: columns[4]
//             };
//         }
//     });
//
//     return dictionary;
// }
//
//
// export async function filterTSVData(startDate, endDate, regionCode, crimeCodeList, wait) {
//     if (!globalTSVData) {
//         console.error('TSV data not loaded yet');
//         return;
//     }
//
//     setLoading(true);
//
//     // Defer the processing to allow the UI update
//     setTimeout(() => {
//         const data = createDictionaryFromTSV(globalTSVData, getDateCodeList(startDate, endDate), regionCode, crimeCodeList);
//         console.log(data);
//         setData(data);
//         setLoading(false);
//     }, wait);
// }
//
//
// export function getDateCodeList(startDate, endDate) {
//     const dateCodeList = [];
//     let addToList = false;
//
//     for (const key in timeDict) {
//         if (timeDict[key] === startDate) {
//             addToList = true;
//         }
//         if (addToList) {
//             dateCodeList.push(timeDict[key]);
//         }
//         if (timeDict[key] === endDate) {
//             break;
//         }
//     }
//
//     return dateCodeList;
// }
//
//
// window.onload = () => {
//     const url = 'http://visualicious.bjornkoemans.nl/crimes_theft.tsv'; // Replace with the actual URL
//     fetchTSVDataOnLoad(url);
// };
//
//
//
