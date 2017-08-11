# Module: MMM-NokiaHealth
The `MMM-NokiaHealth` module is for MagicMirror. It is a simple way to a graph of your wifi scale from Nokia to your [MagicMirror](https://github.com/MichMich/MagicMirror).  Please note that this is a rough alpha version

## Use case examples

Step up on your scale, get a reading, an withing a few seconds the graph shows up on your mirror.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
			module: 'MMM-NokiaHealth',
			position: 'middle_center',	// This can be any of the regions.
			config: {
				// See 'Configuration options' for more information.				
				userid: ["youruserid"],  // only works with one right now
				width: "350px", // Optional. Default: 100%
				height: "300px" //Optional. Default: 100px 
			},
	}
]
````

## Configuration options

The following properties can be configured:


<table width="100%">
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
		<tr>
			<td><code>userid</code></td>
			<td>the URL(s) in the iFrame<br>
				<br><b>Example:</b><code>["123456"]</code>
				<br><b>Default value:</b> <code>["0"]</code>
				<br>Please note that currently it only works with one userid
			</td>
		</tr>		
		<tr>
			<td><code>width</code></td>
			<td>the width of the iFrame<br>
				<br><b>Example:</b><code>"100%"</code>
				<br><b>Example:</b><code>"200px"</code>
				<br><b>Default value:</b> <code>"100%"</code>
			</td>
		</tr>
		<tr>
			<td><code>height</code></td>
			<td>the width of the iFrame<br>
				<br><b>Example:</b><code>"100%"</code>
				<br><b>Example:</b><code>"300px"</code>
				<br><b>Default value:</b> <code>"100px"</code>
			</td>
		</tr>
</table>


## Authorization setup

For this to work you first has to grant access for the module to get your data, currently it works though a proxy webserver here:
http://apps.ecomerc.com/nokiahealth/login.php

Once you are logged in, you can see your userid in the address bar. (sorry for the lack of nice ui, but hey ALPHA)

If you want to show the graph on your mirror, you have to execute the following url:
http://apps.ecomerc.com/nokiahealth/user.php?userid=[youruserid]&a=set

This will set a flag on the server which the module will check. We are doing it this way because I really do not want to open ports in my firewall for a simple flag check.

Use this for IFTTT.com when a new measurement shows up.

## Sorry

For the lack of documentation and totally alpha stage.