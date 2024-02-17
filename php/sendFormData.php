<?php
session_start();
include_once "config.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
// Include the Google API client library
require __DIR__ . '/vendor/autoload.php';

$fullname = mysqli_real_escape_string($conn, $_POST['cname']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$phoneNumber = mysqli_real_escape_string($conn, $_POST['phone']);
$sessionDate = mysqli_real_escape_string($conn, $_POST['date']);
$sessionTime = mysqli_real_escape_string($conn, $_POST['time']);
$lengthHrs = mysqli_real_escape_string($conn, $_POST['length']);
$studio = isset($_POST['studio']) ? mysqli_real_escape_string($conn, $_POST['studio']) : ""; 
$groupSize = mysqli_real_escape_string($conn, $_POST['size']);
$engineers = isset($_POST['engineer']) ? implode(", ", $_POST['engineer']) : ""; 
$promocode = mysqli_real_escape_string($conn, $_POST['promocode']);

// Function to insert events into Google Calendar
function setEvents($service, $calendarId, $selectedDateTimee) {
    // Convert selectedDateTime to DateTime object
    $selectedDateTimeObj = new DateTime($selectedDateTimee);
    
    // Calculate the end date and time by adding one hour to the start time
    $endDateObj = clone $selectedDateTimeObj;
    $endDateObj->modify('+1 hour');
    
    // Format start and end date/time strings
    $startDateTimee = $selectedDateTimeObj->format(DateTime::RFC3339);
    $endDateTime = $endDateObj->format(DateTime::RFC3339);
    
    // Create the event object
    $event = new Google_Service_Calendar_Event(array(
        'summary' => 'Booking',
        'description' => 'New Booking Added to Calendar',
        'start' => array(
            'dateTime' => $startDateTimee,
            'timeZone' => 'America/Los_Angeles',
        ),
        'end' => array(
            'dateTime' => $endDateTime,
            'timeZone' => 'America/Los_Angeles',
        ),
    ));
    
    // Insert the event into the calendar
    $event = $service->events->insert($calendarId, $event);
    return $event->htmlLink;
}

if(!empty($fullname) && !empty($email) && !empty($phoneNumber) && !empty($sessionDate) && !empty($sessionTime) && !empty($lengthHrs) && !empty($studio) && !empty($groupSize) && !empty($engineers)) {
    if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $selectedDateTime = $sessionDate . ' ' . $sessionTime;
        $currentDateTime = date('Y-m-d H:i:s');
        $currentTimestamp = strtotime($currentDateTime);
        $selectedTimestamp = strtotime($selectedDateTime);

        if($selectedTimestamp >= $currentTimestamp) {
            // Query the database to check for existing bookings
            $sql = "SELECT * FROM bookingdata WHERE session_date = '$sessionDate' AND session_time = '$sessionTime'";
            $result = mysqli_query($conn, $sql);
            
            if (mysqli_num_rows($result) > 0) {
                echo "Sorry, this appointment slot is already taken. Please choose another date or time.";
            } else {
                $ran_id = rand(time(), 100000000);
                $sqlInsert = "INSERT INTO bookingdata (unique_id, fullname, email, ph_number, session_date, session_time, length_hrs, studio, group_size, engineers) VALUES ('$ran_id', '$fullname', '$email', '$phoneNumber', '$sessionDate', '$sessionTime', '$lengthHrs', '$studio', '$groupSize', '$engineers')";
                if (mysqli_query($conn, $sqlInsert)) {
                    $client = new \Google_Client();
                    $client->setApplicationName('Google Sheets with Primo');
                    $client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
                    $client->setAccessType('offline');
                    $client->setAuthConfig(__DIR__ . '/credentials.json');
                    
                    $service = new Google_Service_Sheets($client);
                    $spreadsheetId = "17m3553T5Aw7Q1MSWzWPTDWDvCyDsmbcuRWb63wu1aRM";
                    
                    $range = "data"; // Sheet name
                    
                    $values = [
                        [$fullname, $email, $phoneNumber, $sessionDate, $sessionTime, $lengthHrs, $studio, $groupSize, $engineers],
                    ];
                    $body = new Google_Service_Sheets_ValueRange([
                        'values' => $values
                    ]);
                    $params = [
                        'valueInputOption' => 'RAW'
                    ];
                    
                    $result = $service->spreadsheets_values->append(
                        $spreadsheetId,
                        $range,
                        $body,
                        $params
                    );
                    
                    if($result->updates->updatedRows == 1){
                      $client = new Google_Client();
                      $client->setApplicationName('testoo');
                      $client->setScopes(array(Google_Service_Calendar::CALENDAR));
                      $client->setAuthConfig(__DIR__ . '/events_credentials.json');
                      $client->setAccessType('offline');
                      $service = new Google_Service_Calendar($client);
                      $calendarId = 'ishkomannewsnetwork@gmail.com'; 
                      $selectedDateTimee = $sessionDate . ' ' . $sessionTime;
                      try {
                        $eventLink = setEvents($service, $calendarId, $selectedDateTimee);
                        require 'PHPMailer/src/Exception.php';
                        require 'PHPMailer/src/PHPMailer.php';
                        require 'PHPMailer/src/SMTP.php';

                        $mail = new PHPMailer(true);

                        try{
                            $mail->isSMTP();
                            $mail->Host = 'smtp.gmail.com';
                            $mail->SMTPAuth = true;
                            $mail->Username = 'kaliltv89@gmail.com';
                            $mail->Password = 'nmcf volf rlip jajr';
                            $mail->SMTPSecure= "tls";
                            $mail->Port = '587';
                    
                            $mail->setFrom('kaliltv89@gmail.com');
                            $mail->addAddress('muzaffaraly13@gmail.com');
                    
                            $mail->isHTML(true);
                            $mail->Subject = 'You Have a New Booking from' . $fullname;
                            $mail->Body = "Name: $fullname <br> Email: $email <br> Phone Number: $phoneNumber <br> Session Date:  $sessionDate <br> Session Time: $sessionTime <br> Length (Hrs): $lengthHrs <br> Studio Room:  $studio <br> Group Size: $groupSize <br> Engineer: $engineers";

                            $mail->send();
                    
                           echo "done";
                           exit();
                        }catch (Exception $e){
                            echo "Error inserting event: " . $e->getMessage();
                        }
                      } catch (Exception $e) {
                          echo "Error inserting event: " . $e->getMessage();
                      }
                    } else {
                        echo "Fail";
                    }
                } else {
                    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
                }
            }
        } else {
            echo "Invalid date and time selected! Please select a future date and time.";
        }
    } else {
        echo "$email is not a valid email!";
    }
} else {
    echo "All fields are required!";
}
?>
