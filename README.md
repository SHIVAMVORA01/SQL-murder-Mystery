<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>SQL Murder Mystery</title>
	<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet">
	<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
	<style>
		body {
			font-family: 'Montserrat', sans-serif;
			font-size: 16px;
			line-height: 1.6;
			background-color: #f6f8fa;
		}
		h1, h2, h3, h4, h5, h6 {
			margin-top: 40px;
			margin-bottom: 20px;
			font-weight: 700;
			line-height: 1.2;
		}
		h1 {
			font-size: 36px;
		}
		h2 {
			font-size: 30px;
		}
		h3 {
			font-size: 24px;
		}
		h4 {
			font-size: 20px;
		}
		h5 {
			font-size: 18px;
		}
		h6 {
			font-size: 16px;
		}
		p {
			margin-bottom: 20px;
			color: #444;
		}
		a {
			color: #007bff;
			text-decoration: none;
		}
		a:hover {
			color: #0056b3;
			text-decoration: underline;
		}
		.container {
			max-width: 960px;
			margin: 0 auto;
			padding: 40px;
			background-color: #fff;
			border-radius: 4px;
			box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
		}
		.btn-primary {
			background-color: #007bff;
			border-color: #007bff;
		}
		.btn-primary:hover {
			background-color: #0056b3;
			border-color: #0056b3;
		}
		.btn-hint {
			color: #007bff;
			background-color: transparent;
			border: none;
			font-size: 14px;
			text-decoration: underline;
			cursor: pointer;
		}
		.btn-hint:hover {
			color: #0056b3;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>SQL Murder Mystery</h1>
		<p>SQL Murder Mystery is a fun and challenging game that tests your knowledge of SQL syntax and your ability to solve complex puzzles. In this game, you will be playing the role of a detective who is investigating a murder case. You will need to use your SQL skills to analyze the crime scene and gather evidence to solve the mystery.</p>
    	<h2>Getting Started</h2>
	<p>To play the game, you will need to have some knowledge of SQL syntax. The game is played in the browser and requires an internet connection. This game is inspired from <a href="https://mystery.knightlab.com/">https://mystery.knightlab.com/</a>.</p>

	<h2>How to Play</h2>
	<p>The game consists of several levels, each of which presents a different challenge. In each level, you will be given a crime scene and a set of clues that you need to analyze using SQL queries. You will need to write SQL queries to extract the relevant data from the database and use your analytical skills to connect the dots and solve the mystery. You can enter your SQL queries in the text area provided on the screen and click the "Execute" button to check your answers. If your query is correct, you will earn points. If it is incorrect, you will lose points. You can also use the "Hint" button to get a hint if you are stuck. The game ends when you have completed all the levels or when your score reaches zero. If you complete all the levels, you will be congratulated with a special message.</p>
  	<h2>Technologies Used</h2>
	<p>The game is built using ReactJS and Python Flask. The database used for the game is SQLite. The game also uses Bootstrap for styling.</p>

	<h2>Installation</h2>
	<ol>
		<li>Clone the repository.</li>
		<li>Install the required dependencies using npm install.</li>
		<li>Start the backend server by running python app.py.</li>
		<li>Start the frontend server by running npm start.</li>
		<li>Open the game in your browser at http://localhost:3000.</li>
	</ol>

	<h2>Credits</h2>
	<p>This game was developed by Dhrumil Thakore and Shivam Vora for educational purposes only.</p>

	<h2>Contributions</h2>
	<p>Contributions to the game are welcome. If you would like to contribute, please fork the repository and submit a pull request.</p>

	<button class="btn btn-primary">Play the game</button>
</div>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
</body>
</html>

