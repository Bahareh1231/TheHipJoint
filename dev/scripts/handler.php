<?php 

    $name = $_Post['name'];
    $email = $_Post['email'];
    $phoneNumber = $_Post['phone'];
    $message = $_Post['message'];
    $dayOfWeek = $_Post['dayOfWeek'];
    $timeOfDay = $_Post['timeOfDay'];

    $email_from = "bahareh.adham@gmail.com";

    $email_subject = "New appointment submission";
    
    $email_body = "Patient: $name.\n".
                    "Email: $email.\n".
                    "Message: $message.\n".
                    "Time of Day: $timeOfDay.\n";

    $to = "bahareh.adham@gmail.com";

    $headers = "From: $email_from \r\n";

    $headers .= "Reply-To $email \r\n";

    mail($to,$email_subject,$email_body,$headers);

    header("Location: ../index.html");

    
        

?>