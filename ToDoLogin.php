<!Doctype html>

<html>
<body>

<?php



		if(isset($_GET['error'])){
				if($_GET['error']=="emptyfields"){
				echo '<p class="usererror">Fill in all the fields!</p>';	
				}
		else if ($_GET['error'] == "individualmail"){
			echo '<p class="usererror">Fill in all the fields!</p>';
			}
		}
		

	?>
<p>Please enter your email and password</p>
<form class="form-sign" action="Connnectmain.php" method="POST">
<p>email: <input name= "email"/></p>
<p>password: <input name="password"/></p>

<button type="submit" name="login-submit">Login</button>

</form>
</body>
</html>