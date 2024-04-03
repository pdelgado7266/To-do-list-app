
</header><main>
	<div class="wrapper-main">
		<section class="section-default">
	<h1>Signup</h1>
	<?php
		if(isset($_GET['error'])){
				if($_GET['error']=="emptyfields"){
				echo '<p class="usererror">Fill in all the fields!</p>';	
				}
		else if ($_GET['error'] == "indiviualmail"){
			echo '<p class="usererror">Fill in all the fields!</p>';
			}
		}
		
	?>

<link href="style/style.css" rel="stylesheet" type="text/css">

<form class="form-sign" action="Main/SignUpMain.inc.php" method="POST">

<input type ="text" name="email" placeholder= "email">
<input type ="text" name="password" placeholder= "password">
<input type ="text" name="passwordRepeat" placeholder= "Repeat password">
<input type= "submit" name="signup-submit" value="Signup">
</form>
<p>click login button after you submit signup information</p>
<button type="button" onclick="window.location.href='http://localhost/ToDoList/ToDoLogin.php'" name="login-submit">Login</button>
</section>
</main>