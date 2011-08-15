# What is jquery-seadragon.js

Its a jquery plugin which wraps the Seadragon API and adds Touch Events to make zooming work on fondle slabs. You can find out what Seadragon is over at http://expression.microsoft.com/en-us/gg430297.

But the best way to learn is to checkout the demos.

*Demo* http://mrswitch.github.com/jquery-seadragon/



# How to use Seadragon - It you want you can just download the code

1. Upload your massive image to your server, like the one i have at http://mrswitch.github.com/jquery-seadragon/bigimage.jpg

2. Go to http://zoom.it/ and enter the path of this image.

3. Download and save the source of this git repo.

4. Replace in the index.html file the reference to your image

5. Run in your web server. Your done!



# Example

	<html>
	<head>
		<title>Seadragon Zoom with Touch</title>
		
		<!-- iOS -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/> 
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
		
		
		<!-- REQUIRED FILES -->
		<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.1.js"></script>
		<script src="http://seadragon.com/ajax/0.8/seadragon-min.js"></script>
		<script src="jquery-seadragon.js"></script>
	
	</head>
	
	<body>
		<h1>jQuery-Seadragon Plugin</h1>
		<div id="container"></div>
	<script>
			$("#container").seadragon("http://mrswitch.github.com/jquery-seadragon/bigimage.jpg");
	</script>
	</body>
	</html>


# Contribute

1. MIT license, so anyone can use it, modify it, and add it to their own application.

2. "source" folder contains the Visual Studiio Solution files if you fancy modifying the code



## To Do

?? 