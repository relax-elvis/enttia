<?php
session_cache_limiter('nocache');
header('Expires: ' . gmdate('r', 0));

header('Content-type: application/json');

// Enter your email address below.
$to = 'j.garcia@enttia.com';

$subject = "Formulario recibido desde landing EnTTia";

if($to) {


	$fields = array(
		0 => array(
			'text' => 'Nombre',
			'val' => $_POST['name']
		),
		1 => array(
			'text' => 'Teléfono',
			'val' => $_POST['subject']
		),

		2 => array(
			'text' => 'Email',
			'val' => $_POST['email']
		),
		3 => array(
			'text' => 'Mensaje',
			'val' => $_POST['message']
		)

	);
	$message = "";

	foreach($fields as $field) {
		$message .= $field['text'].": " . htmlspecialchars($field['val'], ENT_QUOTES) . "<br>\n";
	}

	$name = 'Enttia';
	$email = 'j.garcia@enttia.com';

	$headers = '';
	$headers .= 'From: ' . $name . ' <' . $email . '>' . "\r\n";
	$headers .= "Reply-To: " .  $email . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
	$headers .= "Bcc: toni@avidalia.com, alexander@avidalia.com, marketing@avidalia.com, efernandez@avidalia.com";

	if (@mail($to, $subject, $message, $headers)){
		$arrResult = array ('response'=>'success');
	} else{
		$arrResult = array ('response'=>'error');
	}

	echo json_encode($arrResult);

} else {

	$arrResult = array ('response'=>'error');
	echo json_encode($arrResult);

}
?>
