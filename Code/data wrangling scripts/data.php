<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
ini_set('memory_limit', '400M');

// Retrieve parameters from the URL
$area = $_GET['area'];
$dates = json_decode($_GET['date']); // Deserialize the JSON array
$crime = $_GET['crime'];

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

    // Check if row contains at least 3 elements and if $fields[2] is not null or empty
    if (
        count($fields) >= 3 &&
        isset($fields[2]) && $fields[2] !== null && !empty($fields[2]) &&
        strpos($fields[2], $area) !== false &&
        strpos($fields[1], $crime) !== false
    ) {
        // Check if $fields[1] contains any of the dates in the list
        $dateMatches = false;
        foreach ($dates as $date) {
            if (strpos($fields[3], $date) !== false) {
                $dateMatches = true;
                break;
            }
        }
        // If any date in the list matches, include the row
        if ($dateMatches) {
            $filteredData[] = $row;
        }
    }
}

// Set HTTP headers for TSV response
header('Content-Type: text/tab-separated-values');
header('Content-Disposition: attachment; filename="filtered_data.tsv"');

// Output the filtered TSV data
echo "Hier is de data:";
echo implode("\n", $filteredData);
?>
