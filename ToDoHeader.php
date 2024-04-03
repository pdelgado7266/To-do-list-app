<?php
session_start();
?>
<!Doctype html>
<html>
<nav>

	<ul>
		
		<li><a href="http://localhost/ToDoList/ToDoLogin.php">Login</a></li>
		<li><a href="http://localhost/ToDoList/ToDoSignUp.php">Signup</a></li>
		
	</ul>
	<?php
	if(isset($_SESSION['username'])){
		echo '<form action="includes/logout.inc.php" method="post">
		<button type="submit" name="logout-submit">Logout</button>
		</form>';
		}
		else{
		echo '<form action="login.php" method="post">
		<button type="submit" name="login-sumit">Login</button>
		</form>';
		}
	
		
	?>	
		
		
</nav>


 </html>