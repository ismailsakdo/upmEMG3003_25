function fetchData() {
  // Replace with your API URL
  var url = "https://marine-api.open-meteo.com/v1/marine?latitude=1.3681&longitude=104.0889&hourly=wave_height,wave_direction,wave_period&timezone=Asia%2FSingapore&past_days=7";

  // Fetch data from the API
  var response = UrlFetchApp.fetch(url);
  var data = JSON.parse(response.getContentText());

  // Get the sheet and range to write to
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var nextRow = lastRow + 1;

  // Iterate through the hourly data and write to the sheet
  for (var i = 0; i < data.hourly.time.length; i++) {
    sheet.getRange(nextRow, 1).setValue(data.hourly.time[i]);
    sheet.getRange(nextRow, 2).setValue(data.hourly.wave_height[i]);
    sheet.getRange(nextRow, 3).setValue(data.hourly.wave_direction[i]);
    sheet.getRange(nextRow, 4).setValue(data.hourly.wave_period[i]);
    nextRow++;
  }
}
