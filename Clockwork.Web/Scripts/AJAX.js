function SeeAllQueries() {
    var results, htmlbox, xhttp, i;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            results = this.responseText;
            results = JSON.parse(results);
            htmlbox = '<table class="display" id="Table_ID"> <thead> <tr> <th>Query ID</th><th>Time</th> <th>Cient Ip</th> <th>UTC Time</th> <th>Time Zone</th> </tr> </thead> <tbody>';
            for (i = 0; i < results.length; i++) {
                results[i].time = results[i].time.replace("T", " ");
                results[i].time = results[i].time.substring(0, 19);
                results[i].utcTime = results[i].utcTime.replace("T", " ");
                results[i].utcTime = results[i].utcTime.substring(0, 19);
                results[i].timezone = results[i].timezone.replace("_", " ");

                htmlbox += "<tr>" +
                    "<td>" + results[i].currentTimeQueryId + "</td>" +
                    "<td>" + results[i].time + "</td>" +
                    "<td>" + results[i].clientIp + "</td>" +
                    "<td>" + results[i].utcTime + "</td>" +
                    "<td>" + results[i].timezone + "</td>"
                "</tr>";
            };
            htmlbox += "</tbody> </table>";
            document.getElementById('seeallqueriestable').style.visibility = 'visible';
            document.getElementById('htmlbox').innerHTML = htmlbox;
            $("#Table_ID").DataTable();
        }
    }
    xhttp.open("Get", "http://127.0.0.1:5000/api/timequeries", true);
    xhttp.setRequestHeader("content-type", "application/json");
    xhttp.send();
}
function UserAction() {
    var IANAtimezone, params, xhttp, responseObj, adjustedTime;
    IANAtimezone = document.getElementById('dropdown').value; //find user selected timezone value
    params = IANAtimezone.replace("/", ","); //timezone is passed in url as id, remove any '/'
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            adjustedTime = new Date().toLocaleString("en-US", { timeZone: IANAtimezone }); // converts time and date format to the local standard (IANA timezones)
            selectedTimezone = new Date(adjustedTime);
            responseObj = JSON.parse(this.responseText);
            adjustedTime = adjustedTime.replace("T", " "); //cutting 'T' out of string to improve readability
            adjustedTime = adjustedTime.substring(0, 22); //cutting out milliseconds
            responseObj.utcTime = responseObj.utcTime.replace("T", " ");
            responseObj.utcTime = responseObj.utcTime.substring(0, 19);
            responseObj.timezone = responseObj.timezone.replace("_", " ");
            document.getElementById("currentTimeQueryId").innerHTML = "Current Time Query ID: " + responseObj.currentTimeQueryId;
            document.getElementById("time").innerHTML = "Time: " + adjustedTime;
            document.getElementById("clientIp").innerHTML = "Client IP: " + responseObj.clientIp;
            document.getElementById("utcTime").innerHTML = "UTC Time: " + responseObj.utcTime;
            document.getElementById("timezone").innerHTML = "Time Zone: " + responseObj.timezone;
            SeeAllQueries();
        }
    };
    xhttp.open("GET", "http://127.0.0.1:5000/api/currenttime/" + params, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}