

// DATASETS

// Global variable with 1198 pizza deliveries
console.log(deliveryData);
const num_del = deliveryData.length;
console.log("Aantal deliveries:")
console.log(num_del)

let total = 0
let avg_del = 0
let total_sales = 0
let number_feedback = 0
let number_feedback_low = 0
let number_feedback_med = 0
let number_feedback_high = 0
for (let i = 0; i < num_del; i++) {
    total += deliveryData[i].count
    avg_del += deliveryData[i].delivery_time
    total_sales += deliveryData[i].price
}
number_feedback += feedbackData.length
for (let i= 0; i < feedbackData.length; i++){
    let quality = feedbackData[i].quality
    if (quality === "high") {
        number_feedback_high += 1
    }
    if (quality === "medium") {
        number_feedback_med += 1
    }
    if (quality === "low") {
        number_feedback_low += 1
    }
}

console.log("Average delivery time")
console.log(avg_del/num_del)
console.log("Total pizzas delivered")
console.log(total)
// Global variable with 200 customer feedbacks
console.log(feedbackData.length);
console.log("Aantal high feedback")
console.log(number_feedback_high)
console.log("Aantal med feedback")
console.log(number_feedback_med)
console.log("Aantal low feedback")
console.log(number_feedback_low)
// FILTER DATA, THEN DISPLAY SUMMARY OF DATA & BAR CHART

createVisualization();

function createVisualization() {

	/* ************************************************************
	 *
	 * ADD YOUR CODE HERE
	 * (accordingly to the instructions in the HW2 assignment)
	 * 
	 * 1) Filter data
	 * 2) Display key figures
	 * 3) Display bar chart
	 * 4) React to user input and start with (1)
	 *
	 * ************************************************************/
    renderBarChart(deliveryData)
}
