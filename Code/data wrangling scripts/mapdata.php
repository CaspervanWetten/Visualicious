<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ini_set('memory_limit', '400M');

// Retrieve parameters from the URL
$startDate = $_GET['start'];
$endDate = $_GET['end'];
$crime = json_decode($_GET['crime']);


// Define the timeDict array
$timeDict = array(
    "January 2012" => "2012MM01",
    "February 2012" => "2012MM02",
    "March 2012" => "2012MM03",
    "April 2012" => "2012MM04",
    "May 2012" => "2012MM05",
    "June 2012" => "2012MM06",
    "July 2012" => "2012MM07",
    "August 2012" => "2012MM08",
    "September 2012" => "2012MM09",
    "October 2012" => "2012MM10",
    "November 2012" => "2012MM11",
    "December 2012" => "2012MM12",
    "January 2013" => "2013MM01",
    "February 2013" => "2013MM02",
    "March 2013" => "2013MM03",
    "April 2013" => "2013MM04",
    "May 2013" => "2013MM05",
    "June 2013" => "2013MM06",
    "July 2013" => "2013MM07",
    "August 2013" => "2013MM08",
    "September 2013" => "2013MM09",
    "October 2013" => "2013MM10",
    "November 2013" => "2013MM11",
    "December 2013" => "2013MM12",
    "January 2014" => "2014MM01",
    "February 2014" => "2014MM02",
    "March 2014" => "2014MM03",
    "April 2014" => "2014MM04",
    "May 2014" => "2014MM05",
    "June 2014" => "2014MM06",
    "July 2014" => "2014MM07",
    "August 2014" => "2014MM08",
    "September 2014" => "2014MM09",
    "October 2014" => "2014MM10",
    "November 2014" => "2014MM11",
    "December 2014" => "2014MM12",
    "January 2015" => "2015MM01",
    "February 2015" => "2015MM02",
    "March 2015" => "2015MM03",
    "April 2015" => "2015MM04",
    "May 2015" => "2015MM05",
    "June 2015" => "2015MM06",
    "July 2015" => "2015MM07",
    "August 2015" => "2015MM08",
    "September 2015" => "2015MM09",
    "October 2015" => "2015MM10",
    "November 2015" => "2015MM11",
    "December 2015" => "2015MM12",
    "January 2016" => "2016MM01",
    "February 2016" => "2016MM02",
    "March 2016" => "2016MM03",
    "April 2016" => "2016MM04",
    "May 2016" => "2016MM05",
    "June 2016" => "2016MM06",
    "July 2016" => "2016MM07",
    "August 2016" => "2016MM08",
    "September 2016" => "2016MM09",
    "October 2016" => "2016MM10",
    "November 2016" => "2016MM11",
    "December 2016" => "2016MM12",
    "January 2017" => "2017MM01",
    "February 2017" => "2017MM02",
    "March 2017" => "2017MM03",
    "April 2017" => "2017MM04",
    "May 2017" => "2017MM05",
    "June 2017" => "2017MM06",
    "July 2017" => "2017MM07",
    "August 2017" => "2017MM08",
    "September 2017" => "2017MM09",
    "October 2017" => "2017MM10",
    "November 2017" => "2017MM11",
    "December 2017" => "2017MM12",
    "January 2018" => "2018MM01",
    "February 2018" => "2018MM02",
    "March 2018" => "2018MM03",
    "April 2018" => "2018MM04",
    "May 2018" => "2018MM05",
    "June 2018" => "2018MM06",
    "July 2018" => "2018MM07",
    "August 2018" => "2018MM08",
    "September 2018" => "2018MM09",
    "October 2018" => "2018MM10",
    "November 2018" => "2018MM11",
    "December 2018" => "2018MM12",
    "January 2019" => "2019MM01",
    "February 2019" => "2019MM02",
    "March 2019" => "2019MM03",
    "April 2019" => "2019MM04",
    "May 2019" => "2019MM05",
    "June 2019" => "2019MM06",
    "July 2019" => "2019MM07",
    "August 2019" => "2019MM08",
    "September 2019" => "2019MM09",
    "October 2019" => "2019MM10",
    "November 2019" => "2019MM11",
    "December 2019" => "2019MM12",
    "January 2020" => "2020MM01",
    "February 2020" => "2020MM02",
    "March 2020" => "2020MM03",
    "April 2020" => "2020MM04",
    "May 2020" => "2020MM05",
    "June 2020" => "2020MM06",
    "July 2020" => "2020MM07",
    "August 2020" => "2020MM08",
    "September 2020" => "2020MM09",
    "October 2020" => "2020MM10",
    "November 2020" => "2020MM11",
    "December 2020" => "2020MM12",
    "January 2021" => "2021MM01",
    "February 2021" => "2021MM02",
    "March 2021" => "2021MM03",
    "April 2021" => "2021MM04",
    "May 2021" => "2021MM05",
    "June 2021" => "2021MM06",
    "July 2021" => "2021MM07",
    "August 2021" => "2021MM08",
    "September 2021" => "2021MM09",
    "October 2021" => "2021MM10",
    "November 2021" => "2021MM11",
    "December 2021" => "2021MM12",
    "January 2022" => "2022MM01",
    "February 2022" => "2022MM02",
    "March 2022" => "2022MM03",
    "April 2022" => "2022MM04",
    "May 2022" => "2022MM05",
    "June 2022" => "2022MM06",
    "July 2022" => "2022MM07",
    "August 2022" => "2022MM08",
    "September 2022" => "2022MM09",
    "October 2022" => "2022MM10",
    "November 2022" => "2022MM11",
    "December 2022" => "2022MM12",
    "January 2023" => "2023MM01",
    "February 2023" => "2023MM02",
    "March 2023" => "2023MM03",
    "April 2023" => "2023MM04",
    "May 2023" => "2023MM05",
    "June 2023" => "2023MM06",
    "July 2023" => "2023MM07",
    "August 2023" => "2023MM08",
    "September 2023" => "2023MM09",
    "October 2023" => "2023MM10",
    "November 2023" => "2023MM11",
    "December 2023" => "2023MM12"
);

// Function to generate date codes between start and end dates
function getDateCodes($startDate, $endDate) {
    global $timeDict;
    $dateCodeList = [];
    $addToList = false;

    foreach ($timeDict as $key => $value) {
        if ($value === $startDate) {
            $addToList = true;
        }
        if ($addToList) {
            $dateCodeList[] = $value;
        }
        if ($value === $endDate) {
            break;
        }
    }

    return $dateCodeList;
}

// Get the date codes between start and end dates
$dates = getDateCodes($startDate, $endDate);

// Load and parse the TSV data (you'll need to replace 'data.tsv' with your actual file path)
$data = file_get_contents('crimes_theft.tsv');
$rows = explode("\n", $data);

// Initialize an array to store filtered rows and include the first row (column headers)
$filteredData = [$rows[0]];

// Process and filter the data based on parameters
foreach ($rows as $index => $row) {
    // Skip the first row (column headers)
    if ($index === 0) {
        continue;
    }

    $fields = explode("\t", $row);

    // Check if row contains at least 3 elements
    if (count($fields) >= 3) {
        // Check if $fields[1] contains any of the dates in the list and if $fields[1] is in the list of crimes
        $dateMatches = false;
        $crimeMatches = false;

        foreach ($dates as $date) {
            if (strpos($fields[3], $date) !== false) {
                $dateMatches = true;
                break;
            }
        }

        foreach ($crime as $crimeValue) {
            if (strpos($fields[1], $crimeValue) !== false) {
                $crimeMatches = true;
                break;
            }
        }

        // If any date in the list matches and the crime matches, include the row
        if ($dateMatches && $crimeMatches) {
            $filteredData[] = $row;
        }
    }
}


// Initialize an array to store the aggregated data
$aggregatedData = [];

// Initialize an associative array to keep track of the sums for each 'WijkenEnBuurten' and 'SoortMisdrijf' combination
$sums = [];

// Process and aggregate the data based on 'WijkenEnBuurten' and 'SoortMisdrijf'
foreach ($filteredData as $index => $row) {
    // Skip the first row (column headers)
    if ($index === 0) {
        continue;
    }

    $fields = explode("\t", $row);
    $wijk = $fields[2];
    $misdrijven = (float)$fields[4]; // Convert to float for summing
    $soortMisdrijf = $fields[1];
    $soortMisdrijfRaw = $fields[6];
    $wijkRaw = $fields[5];

    // Check if the combination of 'WijkenEnBuurten' and 'SoortMisdrijf' exists in the sums array
    $key = $wijk . '>' . $soortMisdrijf . '>' . $wijkRaw . '>' . $soortMisdrijfRaw;
    if (isset($sums[$key])) {
        // Add the 'GeregistreerdeMisdrijven' to the existing sum
        $sums[$key] += $misdrijven;
    } else {
        // Initialize the sum if it doesn't exist
        $sums[$key] = $misdrijven;
    }
}

// Construct the aggregated data
$aggregatedData[] = "WijkenEnBuurten\tSoortMisdrijf\tGeregistreerdeMisdrijven\tWijkenEnBuurtenRaw\tSoortMisdrijfRaw"; // Add the column headers

foreach ($sums as $key => $sum) {
    list($wijk, $soortMisdrijf, $wijkRaw, $soortMisdrijfRaw) = explode('>', $key);

    // Create a new row with the aggregated values
    $aggregatedRow = [
        $wijk, 
        $soortMisdrijf,
        $sum,
        $wijkRaw, // You can add the WijkenEnBuurtenRaw value here
        $soortMisdrijfRaw, // You can add the SoortMisdrijfRaw value here
    ];

    // Add the aggregated row to the result
    $aggregatedData[] = implode("\t", $aggregatedRow);
}

// Set HTTP headers for TSV response
header('Content-Type: text/tab-separated-values');
header('Content-Disposition: attachment; filename="aggregated_data.tsv"');

// Output the aggregated TSV data
echo implode("\n", $aggregatedData);
?>

