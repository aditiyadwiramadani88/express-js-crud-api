<p>  npm install </p>
<p>Install mysql</p>
<p>Create Database nodeapi</p>
<p>node migrate.js </p>

<h1>Register</h1>
<p>	POST METHOD: localhost:3000/register</p>
<code>
	{"username": youusername "password": yourpassword}
</code>
<h1>Token</h1>
<p>	POST METHOD: localhost:3000/token</p>
<code>
	{"username": youusername "password": yourpassword}
</code>
<h1>Auth</h1>
<p>header= {"token": yourtoken}</p>


<h1>Crud</h1>
<table border="1">
	<tr>
		<th>Method</th>
		<th>Url</th>
		<th colspan="2"> Action </th>
	</tr>
	<tr>
		<td>POST AND GET</td>
		<td>localhost:3000/</td>
		<td>CREATE READ</td>
		<td>post Method {"name_product": "name_product", "price":"price"}</td>
	</tr>
	<tr>
		<td>PUT  GET AND DELETE</td>
		<td>localhost:3000/id</td>
		<td>EDIT DELETE DETAIL</td>
		<td>put Method  {"name_product": "name_product", "price":"price"}</td>
	</tr>
</table>