<?php

$servername = 'localhost';

$email='root';

$password = '';

$db = 'to-do-list';

$conn=new mysqli($servername,$email,$password,$db);

if (!$conn) {
    die("Connection failed: " . $conn->connect_error);
	}

/*
$conn=new mysqli($servername,$email,$password,$db);
if (!$conn)
echo "die";
else{
echo "Connected successfully";
}*/
?>