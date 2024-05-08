<?php

if(isset($_POST['login-submit'])){
	
	require 'Main/Connectmain.php';
	
	$email = $_POST['email'];
	$password=$_POST['password'];
	
	if(empty($email) || empty($password)){
		//header("Location:../ToDoIndex.php?error=emptyfields")
		exit();
	}

		else{
			
			$sql="SELECT * FROM to-do-list WHERE email=?";
			$stmt= mysqli_stmt_init($conn);
			if(!mysqli_stmt_prepare($stmt, $sql)){
				//header("Location:../ToDoIndex.php?error=error_doesnotexist");
				exit();
			}
			
			
		else{
			
			mysqli_stmt_bind_param($stmt, "s", $email);
			mysqli_stmt_execute($stmt);
			$results = mysqli_stmt_get_result($stmt);
			
			if($row = mysqli_fetch_assoc($results)){
				$passwordcheck = password_verify($password, $row['password']);

				if($passwordcheck == false){
					//header("Location:../ToDoIndex.php?error=wrongpwd");
					exit();
				}
				
				else if ($passwordcheck == true) {
					session_start();
					$_SESSION['email'] = $row['email'];
					
					//header("Location:../respond.php?login=success");
					exit();
				}	
			
					else {
				//header("Location:../index.php?error=usernotfound");
				exit();
					
					
					}
					
					
			}
					
					
			
		}

			mysqli_stmt_close($stmt);
			mysqli_close($conn);
		}




?>