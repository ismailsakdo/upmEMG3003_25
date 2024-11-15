//Fetch the data and disregard the previous old data captured already  

function fetchData() {
  // Replace with your API URL
  var url = "https://marine-api.open-meteo.com/v1/marine?latitude=1.3681&longitude=104.0889&hourly=wave_height,wave_direction,wave_period&timezone=Asia%2FSingapore&past_days=7";

  // Fetch data from the API
  var response = UrlFetchApp.fetch(url);
  var data = JSON.parse(response.getContentText());

  // Get the sheet and identify the last recorded date
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var lastDate = lastRow > 1 ? new Date(sheet.getRange(lastRow, 1).getValue()) : null; // Retrieve last date in sheet

  var nextRow = lastRow + 1;
  var uniqueDataCount = 0;

  // Iterate through the hourly data and write to the sheet if it's new
  for (var i = 0; i < data.hourly.time.length; i++) {
    var currentDate = new Date(data.hourly.time[i]);

    // Only add if the data is newer than the last recorded date
    if (!lastDate || currentDate > lastDate) {
      sheet.getRange(nextRow, 1).setValue(data.hourly.time[i]);
      sheet.getRange(nextRow, 2).setValue(data.hourly.wave_height[i]);
      sheet.getRange(nextRow, 3).setValue(data.hourly.wave_direction[i]);
      sheet.getRange(nextRow, 4).setValue(data.hourly.wave_period[i]);
      
      nextRow++;
      uniqueDataCount++;
    }
  }
  
  // Log the number of new rows added
  Logger.log("New data rows added: " + uniqueDataCount);
}
