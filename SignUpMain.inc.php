<?php
if (isset($_POST['signup-submit']))
{
	
	require 'Connectmain.php';
	
	$email = $_POST['email'];
	$password = $_POST['password'];
	$passwordRepeat =$_POST['passwordRepeat'];
	
	if(empty($email) || empty($password) || empty($passwordRepeat)){
		header("Location: ../ToDoSignUp.php?error=emptyfields&mail".$email);
		exit();
	}
		
	else{
		$stmt = mysqli_prepare ($conn, "INSERT INTO users(email, password) VALUES(?,?)");
			if(!$stmt){
				header("Location:../ToDoSignUp.php?error=sqlerror");
				exit();
		}
		else{
			$hashedPwd = password_hash($password, PASSWORD_DEFAULT);
		
			mysqli_stmt_bind_param($stmt, "ss", $email,$hashedPwd);
			mysqli_stmt_execute($stmt);
			mysqli_stmt_store_result($stmt);
			mysqli_stmt_close($stmt);
			header("Location: ../ToDoSignUp.php?signup=success");
			exit();
		}
		
	}
		
	
	mysqli_close($conn);
	
}
else{
	header("Location: ../ToDoSignUp.php");
	exit();
}
	

	
	
	
?>
